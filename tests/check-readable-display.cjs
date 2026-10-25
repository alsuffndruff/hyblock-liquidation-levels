// Local regression contracts; not a Pine compiler or a browser/UI test.
const fs=require('fs'),assert=require('assert/strict');
const current=fs.readFileSync(process.argv[2]||'cws-liquidation-levels-v1.8-readable.pine','utf8');
const previous=fs.readFileSync(process.argv[3]||'cws-liquidation-levels-v1.7.2-legend-size.pine','utf8');
function block(text,start,end){const a=text.indexOf(start),b=text.indexOf(end,a+start.length);assert(a>=0&&b>a);return text.slice(a,b);}
for(const [a,b] of [
 ['isDuplicate(float price, bool longSide, int leverage) =>','addLevel('],
 ['bool supportedTimeframe =','var int capacitySkipped'],
 ['    bool newImpulse =','    confirmedScore :='],
 ['// Data Window contains raw signed observations for inspection/export.','// Real scale labels only:']
])assert.equal(block(current,a,b),block(previous,a,b));
assert.equal((current.match(/^plot\(/gm)||[]).length,64);
const axis=current.slice(current.indexOf('// Real scale labels only:'));
assert.equal((axis.match(/^plot\(/gm)||[]).length,45);
assert.equal((axis.match(/color = color\.rgb\(/g)||[]).length,45);
assert(!/show_last\s*=/.test(axis));
assert(!/color = (longBaseColor|shortBaseColor)/.test(axis));
assert(current.includes('time == chart.right_visible_bar_time'));
assert(current.includes('var int scaleActiveLongs = 0'));
assert(current.includes('var int scaleActiveShorts = 0'));
assert(!/chart\.right_visible_bar_time/.test(block(current,'    bool newImpulse =','    confirmedScore :=')));
assert(current.includes('int visualEndTime = crossed ? time : time_close'));
assert(current.includes('line.set_x2(current.ln, math.max(current.birthTime, visualEndTime))'));
assert(!/line\.set_y[12]\(/.test(current));
assert(!/\b(line|label)\.delete\(/.test(current));
assert.equal((current.match(/\blabel\.new\(/g)||[]).length,1);
assert(current.includes('text = str.tostring(impulseM, "0.00")'));
assert(current.includes('size = numberFontSize'));
assert(current.includes('input.bool(false, "Show OI size at line midpoint"'));
assert(current.includes('input.bool(false, "Show diagnostic panel"'));
assert(current.includes('input.string("OI+CVD", "Experimental event model"'));
assert(current.includes('input.int(3, "Uniform line width"'));
assert(current.includes('input.color(color.rgb(0, 216, 196), "Long-Farbe"'));
assert(current.includes('input.color(color.rgb(255, 91, 91), "Short-Farbe"'));
assert(current.includes('input.string("Groß", "Legendenschrift"'));
assert(current.includes('input.string("Groß", "Zahlenschrift"'));
const legend=block(current,'// Compact neutral legend:','// Data Window');
assert(!legend.includes('bgcolor = color.new(scenarioColor'));
assert.equal((legend.match(/"••••"/g)||[]).length,6);

// Snapshot prices are copied at the right-visible candle and remain stable when
// later, invisible candles create new levels or consume the earlier ones.
function snapshot(events,bars,right){
 const levels=[];let frozen=[];const plotted=[];
 for(const bar of bars){
  for(const e of levels)if(e.active&&bar.low<=e.price&&bar.high>=e.price)e.active=false;
  for(const e of events.filter(e=>e.created===bar.time))levels.push({...e,active:true});
  if(bar.time===right)frozen=levels.filter(e=>e.active).map(e=>e.price);
  plotted.push([...frozen]);
 }return plotted;
}
const bars=[{time:1,low:110,high:120},{time:2,low:110,high:120},{time:3,low:90,high:105},{time:4,low:110,high:120}];
const events=[{created:1,price:100},{created:3,price:95}];
const oldView=snapshot(events,bars,2);assert.deepEqual(oldView[1],[100]);assert.deepEqual(oldView[3],[100]);
const newerView=snapshot(events,bars,4);assert.deepEqual(newerView[3],[95]);
assert.deepEqual(snapshot([],bars,2).at(-1),[]);
assert.deepEqual(snapshot(events,bars,1)[0],[100]);
for(const t of [900000,86400000]){
 const birth=t,hitOpen=2*t,hitClose=3*t;
 assert.equal(Math.max(birth,hitOpen),hitOpen);assert.notEqual(hitOpen,hitClose);
 assert.equal(Math.max(birth,birth),birth); // immediate next-bar touch: never negative length
 const endOnExpiry=hitClose;assert.equal(Math.max(birth,endOnExpiry),hitClose);
}
console.log('PASS: unchanged model and 19 numeric exports; 45 fixed-color scale slots/64 counts; scrolling snapshot causality; touch/expiry endpoint boundaries; larger editable typography/colors; numeric-only optional labels. TradingView UI remains issue #4.');
