// Causal reference engine. No screenshot prices or dates used by the model.
// Input score is computed from prior OI statistics and available estimated CVD.
'use strict';
const defaults = {start:0, windowMinutes:60, entryBand:200, threshold:1.2,
  floor:1, gap:250, crossGap:50, entry:'weighted', maxLevels:500, tick:0.1};
// Normalize binary multiplication noise before distance / boundary comparisons.
const roundTick=(p,tick)=>Number((Math.round(p/tick+1e-8)*tick).toFixed(8));
function run(rows, settings={}, snapshotTimes=[]){
 const p={...defaults,...settings},levels=[],snapshots=[];
 let group=null,previousCloseTime=null,skipped=0,groups=0,discarded=0;
 const times=new Set(snapshotTimes);
 function emit(r){
  if(!group)return;
  const g=group;group=null;groups++;
  if(g.peakScore<p.threshold)return;
  const entry=p.entry==='peak'?g.peakEntry:g.weighted/g.oi;
  for(const side of ['long','short'])for(const leverage of [100,50,25]){
   const price=roundTick(entry*(1+(side==='long'?-1:1)/leverage),p.tick);
   if(price<=0||(side==='long'?price>=r.close:price<=r.close)||Math.abs(price/r.close-1)*100>15)continue;
   if(levels.some(e=>e.status==='active'&&e.side===side&&Math.abs(e.price-price)<(e.leverage===leverage?p.gap:p.crossGap)))continue;
   if(levels.length>=p.maxLevels){skipped++;continue;}
   levels.push({id:levels.length+1,side,leverage,price,creationMs:r.closeMs,status:'active',score:g.peakScore,oiM:g.oi,groupStartMs:g.start,groupBars:g.bars});
  }
 }
 for(const r of rows){
  if(!r.confirmed)continue;
  for(const e of levels)if(e.status==='active'&&r.closeMs>e.creationMs&&(e.side==='long'?r.low<=e.price:r.high>=e.price)){
   e.status='ended';e.endMs=r.closeMs;e.visualEndMs=Math.max(e.creationMs,r.timeMs);
  }
  const valid=r.valid&&Number.isFinite(r.score)&&Number.isFinite(r.oiM)&&Number.isFinite(r.entry)&&r.entry>0;
  if(!valid||r.timeMs<p.start){if(group)discarded++;group=null;}
  else {
   let emitted=false;
   const positive=r.oiM>0&&r.oiM>=p.floor;
   const gapInData=previousCloseTime!==null&&r.timeMs!==previousCloseTime;
   if(group&&(gapInData||!positive||r.timeMs>=group.start+p.windowMinutes*60000||Math.abs(r.entry-group.weighted/group.oi)>p.entryBand)){
    if(gapInData){group=null;discarded++;}else {emit(r);emitted=true;}
   }
   if(positive){
    if(!group)group={start:r.timeMs,weighted:0,oi:0,bars:0,peakScore:r.score,peakEntry:r.entry};
    group.weighted+=r.entry*r.oiM;group.oi+=r.oiM;group.bars++;
    if(r.score>group.peakScore){group.peakScore=r.score;group.peakEntry=r.entry;}
    if(!emitted&&r.closeMs>=group.start+p.windowMinutes*60000)emit(r);
   }
  }
  previousCloseTime=r.closeMs;
  if(times.has(r.closeMs))snapshots.push({ms:r.closeMs,levels:levels.map(e=>({...e}))});
 }
 // Pending groups are intentionally not flushed at the end of a dataset.
 return {params:p,levels,snapshots,skipped,groups,discarded,pending:group?{...group}:null};
}
module.exports={defaults,run,roundTick};
