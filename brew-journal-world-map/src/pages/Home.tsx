import { Link } from 'react-router-dom'
import { useStore } from '../store/store'

export default function Home() {
  const beans = useStore(s => s.beans)
  const brews = useStore(s => s.brews)
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Quick Start</h2>
        <div className="flex gap-2">
          <Link to="/beans" className="btn">Manage Beans</Link>
          <Link to="/brews" className="btn">Log Brews</Link>
          <Link to="/map" className="btn">World Map</Link>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">This Week</h2>
        <p className="text-sm text-neutral-300">Beans tracked: <span className="badge">{beans.length}</span></p>
        <p className="text-sm text-neutral-300">Brews logged: <span className="badge">{brews.length}</span></p>
        <p className="text-sm mt-2">Tip: Open the Map to see countries you've tried.</p>
      </div>
    </div>
  )
}
