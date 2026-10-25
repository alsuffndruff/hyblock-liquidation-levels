// Local contract checks only. Native axis appearance is a TradingView UI concern.
const fs=require('fs'),assert=require('assert/strict');
const chart=fs.readFileSync(process.argv[2]||'cws-liquidation-levels-v1.9-chart.pine','utf8');
const exp=fs.readFileSync(process.argv[3]||'cws-liquidation-levels-v1.9-export.pine','utf8');
const old=fs.readFileSync(process.argv[4]||'cws-liquidation-levels-v1.8-readable.pine','utf8');
function block(s,a,b){const x=s.indexOf(a),y=s.indexOf(b,x+a.length);assert(x>=0&&y>x);return s.slice(x,y);}
const originalAnchor=old.match(/^bool scaleAnchor = .+$/m)[0];
for(const [source,n,counts] of [[chart,32,64],[exp,22,63]]){
 assert.equal(source.match(/^bool scaleAnchor = .+$/m)[0],originalAnchor);
 assert(!/trackprice\s*=|offset\s*=|show_last\s*=/.test(source));
 assert(source.includes('input.string("Normal", "Zahlenschrift"'));
 assert(source.includes('input.bool(false, "Show OI size at line midpoint"'));
 assert(source.includes('input.bool(false, "Show diagnostic panel"'));
 assert(source.includes('text = str.tostring(impulseM, "0.00")'));
 assert(source.includes('array.insert(scaleColors, slot, scaleLevel.baseColor)'));
 assert(source.includes('array.insert(scalePrices, slot, scaleLevel.price)'));
 assert(source.includes('array.insert(scaleLongSides, slot, scaleLevel.longSide)'));
 assert(!/LONG_SCALE_SLOTS|SHORT_SCALE_SLOTS/.test(source));
 const axis=source.slice(source.indexOf('// Native price-scale markers:'));
 assert.equal((axis.match(/^plot\(/gm)||[]).length,n);
 assert.equal((axis.match(/color = array\.get\(scaleColors,/g)||[]).length,n);
 const numeric=(source.match(/^plot\(/gm)||[]).length-n;
 assert.equal(n*2+numeric,counts);assert(counts<=64);
 for(const [a,b] of [
  ['isDuplicate(float price, bool longSide, int leverage) =>','addLevel('],
  ['bool supportedTimeframe =','var int capacitySkipped'],
  ['    bool newImpulse =','    confirmedScore :=']
 ])assert.equal(block(source,a,b),block(old,a,b));
 assert(source.includes('int visualEndTime = crossed ? time : time_close'));
 const legend=block(source,'// Compact neutral legend:','// '+(numeric?'Data Window':'Full numerical CSV'));
 const cells=legend.split('\n').filter(s=>s.includes('table.cell(colorLegend,'));
 assert.equal(cells.length,16);assert(cells.every(s=>s.includes('width = ')));
 for(const row of [1,2,3])for(const col of [0,1,2,3]){
  const cell=cells.find(s=>s.includes(`colorLegend, ${col}, ${row},`));
  assert(cell.includes('width = '+(col===0||col===2?'legendSwatchWidth':'legendValueWidth')));
 }
 assert(cells.find(s=>s.includes('colorLegend, 0, 0,')).includes('width = legendHalfWidth'));
 assert(cells.find(s=>s.includes('colorLegend, 2, 0,')).includes('width = legendHalfWidth'));
}
assert.equal(block(exp,'// Data Window','// Native price-scale markers:'),block(old,'// Data Window','// Real scale labels only:'));
assert(!chart.includes('"TV OI raw (confirmed)"'));
function select(levels,reference,n){
 const prices=Array(n).fill(null),colors=Array(n).fill(null),sides=Array(n).fill(null);
 for(const e of levels){let at=0;while(at<n&&prices[at]!==null&&Math.abs(e.price-reference)>=Math.abs(prices[at]-reference))at++;
  if(at<n){prices.splice(at,0,e.price);colors.splice(at,0,e.color);sides.splice(at,0,e.side);prices.pop();colors.pop();sides.pop();}
  assert.equal(prices.length,n);assert.equal(colors.length,n);assert.equal(sides.length,n);
 }return prices.map((price,i)=>({price,color:colors[i],side:sides[i]})).filter(e=>e.price!==null);
}
const levels=Array.from({length:70},(_,i)=>({price:77000+i*113,color:['#3322aa','#dd7744','#8833cc'][i%3],side:i%2?'long':'short'}));
for(const n of [22,32])for(const reference of [79000,81000]){
 const got=select(levels,reference,n);
 const wanted=levels.map((e,i)=>({...e,i})).sort((a,b)=>Math.abs(a.price-reference)-Math.abs(b.price-reference)||a.i-b.i).slice(0,n).map(({i,...e})=>e);
 assert.deepEqual(got,wanted);assert.equal(select([],reference,n).length,0);
}
for(const half of [8,12,20]){const swatch=half/3,value=half-swatch;assert(Math.abs((swatch+value)-half)<1e-9);assert.equal((swatch+value)*2,half*2);}
console.log('PASS: matching price/color/side arrays including overflow, equal legend halves, smaller default size, unchanged anchor/native behavior and model, 19 exact exports in export version, chart/export budgets 64/63. TradingView UI remains #4.');
