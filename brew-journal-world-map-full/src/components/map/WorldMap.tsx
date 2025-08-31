import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useMemo, useState } from 'react'
import { useStore } from '../../store/store'
const GEO_URL='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
function colorFor(v:number,max:number){ if(v===0)return '#1f2937'; const t=v/Math.max(1,max); const o=Math.floor(200+55*t); return `rgb(${o},120,40)` }
export default function WorldMap({ onSelect }:{ onSelect:(iso3:string)=>void }){
  const beans=useStore(s=>s.beans)
  const triedCounts=useMemo(()=>{ const m:Record<string,number>={}; for(const b of beans){ if(b.tried) m[b.originCountry]=(m[b.originCountry]||0)+1 } return m },[beans])
  const max=Math.max(1, ...(Object.values(triedCounts).length?[Math.max(...Object.values(triedCounts))]:[1]))
  const [hover,setHover]=useState<{name:string,count:number}|null>(null)
  return (<div className="w-full h-[480px] relative"><ComposableMap projectionConfig={{scale:150}}><Geographies geography={GEO_URL}>{({geographies})=>geographies.map(geo=>{ const iso3=(geo.properties as any).iso_a3 as string; const count=triedCounts[iso3]||0; return (<Geography key={geo.rsmKey} geography={geo} onMouseEnter={()=>setHover({name:(geo.properties as any).name,count})} onMouseLeave={()=>setHover(null)} onClick={()=>onSelect(iso3)} style={{default:{fill:colorFor(count,max),outline:'none'},hover:{fill:'#f59e0b',outline:'none'},pressed:{fill:'#f59e0b',outline:'none'}}} />)})}</Geographies></ComposableMap>{hover&&(<div className="absolute left-2 bottom-2 p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm">{hover.name}: {hover.count} bean{hover.count===1?'':'s'} tried</div>)}</div>) }