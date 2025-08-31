import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Beans from './pages/Beans'
import BeanDetail from './pages/BeanDetail'
import Brews from './pages/Brews'
import MapPage from './pages/MapPage'
import Settings from './pages/Settings'
import { useEffect, useRef } from 'react'

function TopNav() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="font-semibold tracking-wide">Brew Journal + World Map</div>
        <nav className="flex items-center gap-3 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'badge' : 'opacity-70 hover:opacity-100'}>Home</NavLink>
          <NavLink to="/beans" className={({isActive}) => isActive ? 'badge' : 'opacity-70 hover:opacity-100'}>Beans</NavLink>
          <NavLink to="/brews" className={({isActive}) => isActive ? 'badge' : 'opacity-70 hover:opacity-100'}>Brews</NavLink>
          <NavLink to="/map" className={({isActive}) => isActive ? 'badge' : 'opacity-70 hover:opacity-100'}>Map</NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? 'badge' : 'opacity-70 hover:opacity-100'}>Settings</NavLink>
        </nav>
        <div className="flex-1" />
        <input ref={inputRef} placeholder="Search (⌘/Ctrl+K)" className="input max-w-xs"
          onKeyDown={(e) => { if (e.key === 'Enter') navigate('/beans?search='+encodeURIComponent((e.target as HTMLInputElement).value)) }} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beans" element={<Beans />} />
          <Route path="/beans/:id" element={<BeanDetail />} />
          <Route path="/brews" element={<Brews />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}
