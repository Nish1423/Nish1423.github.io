import { wipeDB } from '../utils/storage'
import { useStore } from '../store/store'

export default function Settings() {
  const exportJSON = useStore(s => s.exportJSON)
  const importJSON = useStore(s => s.importJSON)

  function handleExport() {
    const blob = new Blob([exportJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'brew-journal.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result))
        importJSON(data)
        alert('Import complete')
      } catch {
        alert('Invalid JSON')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="card space-y-3">
        <div className="flex gap-2">
          <label className="btn cursor-pointer">Import JSON<input type="file" accept="application/json" className="hidden" onChange={handleImport} /></label>
          <button className="btn" onClick={handleExport}>Export JSON</button>
        </div>
        <button className="btn" onClick={()=>{ if(confirm('Reset all data?')) { wipeDB(); location.reload() } }}>Reset Data</button>
        <p className="text-xs text-neutral-400">Data is stored locally in your browser. Export regularly for backup.</p>
      </div>
    </div>
  )
}
