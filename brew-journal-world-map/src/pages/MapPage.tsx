import { useMemo, useState } from 'react'
import WorldMap from '../components/map/WorldMap'
import CountryDrawer from '../components/map/CountryDrawer'
import { useStore } from '../store/store'

export default function MapPage() {
  const beans = useStore(s => s.beans)
  const [country, setCountry] = useState<string|null>(null)

  const stats = useMemo(() => {
    const tried = beans.filter(b=>b.tried)
    const byCountry: Record<string, {count:number, sum:number, n:number}> = {}
    for (const b of tried) {
      byCountry[b.originCountry] = byCountry[b.originCountry] || { count:0, sum:0, n:0 }
      byCountry[b.originCountry].count++
      if (b.cuppingScore) { byCountry[b.originCountry].sum += b.cuppingScore; byCountry[b.originCountry].n++ }
    }
    const entries = Object.entries(byCountry)
    const totalCountries = entries.length
    const topOrigin = entries.sort((a,b)=>b[1].count-a[1].count)[0]?.[0] ?? '—'
    const highestAvg = entries
      .map(([k,v]) => [k, v.n ? Math.round(v.sum/v.n) : 0] as const)
      .sort((a,b)=>b[1]-a[1])[0]
    return { totalCountries, topOrigin, highestAvg }
  }, [beans])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">World Map</h1>
      <div className="flex gap-2 text-sm">
        <span className="badge">Countries Tried: {stats.totalCountries}</span>
        <span className="badge">Top Origin: {stats.topOrigin}</span>
        <span className="badge">Highest Avg Rating: {stats.highestAvg ? stats.highestAvg[0] + ' ('+stats.highestAvg[1]+')' : '—'}</span>
      </div>
      <div className="card">
        <WorldMap onSelect={(iso3)=>setCountry(iso3)} />
      </div>
      <CountryDrawer iso3={country} onClose={()=>setCountry(null)} />
    </div>
  )
}
