'use strict';
const assert=require('assert/strict');
const fs=require('fs'),path=require('path');
const {run}=require('./engine.cjs');
const bar=(i,extra={})=>({timeMs:i*900000,closeMs:(i+1)*900000,confirmed:true,valid:true,
 low:995,high:1005,close:1000,entry:1000,oiM:2,score:2,...extra});
const settings={windowMinutes:30,entryBand:20,threshold:1.2,floor:1,gap:0,crossGap:0,tick:0.1};
const input=[bar(0),bar(1,{entry:1002,oiM:6}),bar(2,{oiM:0}),bar(3)];
const a=run(input,settings);
assert.equal(a.levels.length,6);
assert(a.levels.every(e=>e.creationMs===1800000&&e.groupBars===2&&e.oiM===8));
assert(Math.abs(a.levels.find(e=>e.side==='long'&&e.leverage===100).price-991.5)<1e-8);
// Pending records do not become historical signals at the end of input.
assert.equal(run([bar(0)],settings).levels.length,0);
// Neither an open realtime candle nor a future suffix can alter past creations.
assert.deepEqual(run([...input,bar(4,{confirmed:false,entry:1000000})],settings),a);
const series=Array.from({length:60},(_,i)=>bar(i,{entry:1000+i%5,oiM:i%3===0?0:2,score:1+i%4}));
const full=run(series,settings);
for(let n=1;n<=series.length;n++){
 const prefix=run(series.slice(0,n),settings),cutoff=series[n-1].closeMs;
 const causal=full.levels.filter(e=>e.creationMs<=cutoff).map(e=>{
  const x={...e};if(x.endMs>cutoff){x.status='active';delete x.endMs;delete x.visualEndMs;}return x;
 });
 assert.deepEqual(prefix.levels,causal,'Prefix changed at '+n);
}
// Missing OI and timestamp gaps discard the pending group instead of joining it.
assert.equal(run([bar(0),bar(1,{valid:false}),bar(2)],settings).levels.length,0);
assert.equal(run([bar(0),bar(2)],settings).levels.length,0);
// Price-region break emits the old group at the current confirmed close,
// starts a new group, and never emits two groups on the same bar.
const split=run([bar(0),bar(1,{entry:1050,close:1050})],{...settings,windowMinutes:1,entryBand:0});
assert(split.levels.every(e=>e.creationMs>=900000));
for(const ms of new Set(split.levels.map(e=>e.creationMs)))assert(split.levels.filter(e=>e.creationMs===ms).length<=6);
// Capacity stops allocation and preserves ended history; no eviction at cap.
const capped=run(series,{...settings,maxLevels:2});
assert.equal(capped.levels.length,2);assert(capped.skipped>0);
assert.equal(capped.levels[0].creationMs,run(series.slice(0,3),settings).levels[0].creationMs);
const root=path.resolve(__dirname,'../..');
const extract=(s,a,b)=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));
const chart=fs.readFileSync(path.join(root,'cws-liquidation-levels-v1.10-cluster-chart.pine'),'utf8');
const exp=fs.readFileSync(path.join(root,'cws-liquidation-levels-v1.10-cluster-export.pine'),'utf8');
for(const [s,slots,counts] of [[chart,32,64],[exp,21,63]]){
 const scale=(s.match(/^plot\(array.get\(scalePrices,/gm)||[]).length;
 const numeric=(s.match(/^plot\(/gm)||[]).length-scale;
 assert.equal(scale,slots);assert.equal(scale*2+numeric,counts);
 assert(!/line\.delete|label\.delete|line\.set_y[12]|lookahead_on|trackprice\s*=|offset\s*=/.test(s));
 assert(s.includes('max_lines_count = 500, max_labels_count = 500'));
 assert(s.includes('if array.size(levels) >= maxLevels'));
 assert(s.includes('input.float(400.0, "Minimum spacing / side / leverage'));
 assert(s.includes('input.string("OI+CVD"'));
 assert(s.includes('input.int(3, "Uniform line width"'));
 assert(s.includes('input.bool(false, "Show diagnostic panel"'));
 assert(s.includes('input.bool(false, "Show OI size at line midpoint"'));
 assert(s.includes('int visualEndTime = crossed ? time : time_close'));
 assert(s.includes('array.insert(scaleColors, slot, scaleLevel.baseColor)'));
 assert(s.includes('bool scaleAnchor = time == chart.right_visible_bar_time'));
 assert(!extract(s,'if barstate.isconfirmed\n    // Only mutate confirmed bars.','formatNumber(').includes('chart.right_visible'));
 const model=extract(s,'    if clusterModel','    confirmedScore :=');
 assert(model.includes('pendingGroup := na'));
 assert(!model.includes('barstate.islast'));
}
assert.equal(extract(chart,'type OiGroup','string oiSymbol ='),extract(exp,'type OiGroup','string oiSymbol ='));
assert.equal(extract(chart,'emitGroup(OiGroup','formatNumber('),extract(exp,'emitGroup(OiGroup','formatNumber('));
console.log('PASS: causal prefixes, weighted entry, missing data, open bars, no final flush, capacity/history, fixed prices, plot budgets 64/63, chart/export model parity. Not a Pine compile.');
