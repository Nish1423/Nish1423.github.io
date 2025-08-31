import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleSequential } from 'd3-scale'
import { interpolateOranges } from 'd3-scale-chromatic'
import { useMemo, useState } from 'react'
import { useStore } from '../../store/store'
import { nameFromISO3 } from '../../utils/isoCountry'

// TopoJSON URL provided by react-simple-maps starter
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function WorldMap({ onSelect }:{ onSelect: (iso3: string)=>void }) {
  const beans = useStore(s => s.beans)
  const triedCounts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const b of beans) {
      if (!b.tried) continue
      map[b.originCountry] = (map[b.originCountry] || 0) + 1
    }
    return map
  }, [beans])

  const values = Object.values(triedCounts)
  const max = values.length ? Math.max(...values) : 1
  const color = scaleSequential(interpolateOranges).domain([0, max])

  const [hover, setHover] = useState<{name:string,count:number}|null>(null)

  return (
    <div className="w-full h-[480px]">
      <ComposableMap projectionConfig={{ scale: 150 }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const iso3 = (geo.properties as any).iso_a3 as string
              const count = triedCounts[iso3] || 0
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHover({ name: (geo.properties as any).name, count })}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onSelect(iso3)}
                  style={{
                    default: { fill: count ? color(count) : '#1f2937', outline: 'none' },
                    hover: { fill: '#f59e0b', outline: 'none' },
                    pressed: { fill: '#f59e0b', outline: 'none' }
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      {hover && (
        <div className="absolute mt-2 p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm">
          {hover.name}: {hover.count} bean{hover.count===1?'':'s'} tried
        </div>
      )}
    </div>
  )
}
