import { useStore } from '../../store/store'
import { nameFromISO3 } from '../../utils/isoCountry'
import { Link } from 'react-router-dom'
export default function CountryDrawer({ iso3, onClose }:{ iso3:string|null, onClose:()=>void }){
  const beans=useStore(s=>s.beans); const addBean=useStore(s=>s.addBean)
  if(!iso3) return null; const list=beans.filter(b=>b.originCountry===iso3&&b.tried)
  return (<div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-neutral-950 border-l border-neutral-800 p-4 overflow-y-auto z-20">
    <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{nameFromISO3(iso3)} — Tried Beans</h3><button className="btn" onClick={onClose}>Close</button></div>
    <div className="mt-3 space-y-2">{list.length===0&&<p className="text-sm text-neutral-400">No tried beans yet.</p>}{list.map(b=>(<div className="card" key={b.id}><div className="font-medium">{b.name}</div><div className="text-sm text-neutral-400">{b.roaster??'—'} · {b.process??'—'}</div><div className="mt-2"><Link className="btn" to={'/beans/'+b.id} onClick={onClose}>View Bean</Link></div></div>))}</div>
    <div className="mt-4"><button className="btn" onClick={()=>{ const bean=addBean({name:'New Bean',roaster:'',originCountry:iso3,originRegion:'',farm:'',variety:[],process:'',altitudeM:undefined,roastLevel:undefined,roastDate:undefined,purchaseDate:undefined,priceJPY:undefined,tastingNotes:[],cuppingScore:undefined,labelPhoto:undefined,tried:true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()} as any); onClose(); location.hash='#/beans/'+bean.id }}>Add Bean (prefilled)</button></div>
  </div>) }