// Safe localStorage wrapper with migrations
const STORAGE_KEY = 'bjwm_v1'

export type DB = {
  version: number
  beans: any[]
  brews: any[]
}

const defaultDB: DB = { version: 1, beans: [], brews: [] }

export function loadDB(): DB {
  if (typeof window === 'undefined') return structuredClone(defaultDB)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultDB)
    const parsed = JSON.parse(raw)
    return migrate(parsed)
  } catch (e) {
    console.error('Storage parse error; resetting DB', e)
    return structuredClone(defaultDB)
  }
}

export function saveDB(db: DB) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch (e) {
    console.error('Storage write error', e)
  }
}

export function migrate(db: any): DB {
  // Future migrations can go here. Currently version 1.
  if (!db || typeof db !== 'object') return structuredClone(defaultDB)
  if (!('version' in db)) db.version = 1
  if (!Array.isArray(db.beans)) db.beans = []
  if (!Array.isArray(db.brews)) db.brews = []
  return db as DB
}

export function wipeDB() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
