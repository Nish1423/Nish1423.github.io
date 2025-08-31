import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { Bean, Brew } from '../types'
import { loadDB, saveDB } from '../utils/storage'

type State = {
  beans: Bean[]
  brews: Brew[]
}

type Actions = {
  addBean: (b: Omit<Bean,'id'|'createdAt'|'updatedAt'>) => Bean
  updateBean: (id: string, patch: Partial<Bean>) => void
  deleteBean: (id: string) => void
  addBrew: (x: Omit<Brew,'id'>) => Brew
  updateBrew: (id: string, patch: Partial<Brew>) => void
  deleteBrew: (id: string) => void
  importJSON: (data: { beans: Bean[], brews: Brew[] }) => void
  exportJSON: () => string
  seedIfEmpty: () => void
}

export const useStore = create<State & Actions>((set, get) => ({
  beans: [],
  brews: [],

  addBean: (b) => {
    const bean: Bean = { ...b, id: nanoid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    set(s => ({ beans: [bean, ...s.beans] }))
    return bean
  },
  updateBean: (id, patch) => set(s => ({ beans: s.beans.map(b => b.id === id ? { ...b, ...patch, updatedAt: new Date().toISOString() } : b) })),
  deleteBean: (id) => set(s => ({ beans: s.beans.filter(b => b.id !== id), brews: s.brews.filter(br => br.beanId !== id) })),

  addBrew: (x) => {
    const brew: Brew = { ...x, id: nanoid() }
    set(s => ({ brews: [brew, ...s.brews] }))
    return brew
  },
  updateBrew: (id, patch) => set(s => ({ brews: s.brews.map(b => b.id === id ? { ...b, ...patch } : b) })),
  deleteBrew: (id) => set(s => ({ brews: s.brews.filter(b => b.id !== id) })),

  importJSON: (data) => set(_ => ({ beans: data.beans ?? [], brews: data.brews ?? [] })),
  exportJSON: () => JSON.stringify({ beans: get().beans, brews: get().brews }, null, 2),

  seedIfEmpty: () => {
    const s = get()
    if (s.beans.length || s.brews.length) return
    // Seed beans (ETH, KEN, COL, BRA, GTM, PAN)
    const now = new Date().toISOString()
    const seeds: Bean[] = [
      { id: nanoid(), name: 'Yirgacheffe Washed', roaster: 'Tokyo Roasters', originCountry:'ETH', originRegion:'Yirgacheffe', farm:'Various', variety:['Heirloom'], process:'Washed', altitudeM:2000, roastLevel:'light', roastDate:now, purchaseDate:now, priceJPY:1800, tastingNotes:['jasmine','citrus'], cuppingScore:88, tried:true, createdAt:now, updatedAt:now },
      { id: nanoid(), name: 'Nyeri AA', roaster: 'Osaka Beans', originCountry:'KEN', originRegion:'Nyeri', farm:'Co-op', variety:['SL28','SL34'], process:'Washed', altitudeM:1900, roastLevel:'light', roastDate:now, purchaseDate:now, priceJPY:2000, tastingNotes:['blackcurrant','grapefruit'], cuppingScore:90, tried:true, createdAt:now, updatedAt:now },
      { id: nanoid(), name: 'Huila Pink Bourbon', roaster: 'Kanto Coffee', originCountry:'COL', originRegion:'Huila', farm:'Smallholders', variety:['Pink Bourbon'], process:'Washed', altitudeM:1800, roastLevel:'light', roastDate:now, purchaseDate:now, priceJPY:2200, tastingNotes:['floral','stone fruit'], cuppingScore:89, tried:true, createdAt:now, updatedAt:now },
      { id: nanoid(), name: 'Cerrado Natural', roaster: 'Blue Bottle', originCountry:'BRA', originRegion:'Cerrado', farm:'Estate', variety:['Catuai'], process:'Natural', altitudeM:1200, roastLevel:'medium', roastDate:now, purchaseDate:now, priceJPY:1500, tastingNotes:['chocolate','nutty'], cuppingScore:84, tried:false, createdAt:now, updatedAt:now },
      { id: nanoid(), name: 'Antigua', roaster: 'Nagoya Coffee', originCountry:'GTM', originRegion:'Antigua', farm:'Several', variety:['Bourbon'], process:'Washed', altitudeM:1700, roastLevel:'medium', roastDate:now, purchaseDate:now, priceJPY:1700, tastingNotes:['cocoa','spice'], cuppingScore:85, tried:false, createdAt:now, updatedAt:now },
      { id: nanoid(), name: 'Boquete Geisha Natural', roaster: 'Specialty JP', originCountry:'PAN', originRegion:'Boquete', farm:'Geisha estates', variety:['Geisha'], process:'Natural', altitudeM:1800, roastLevel:'light', roastDate:now, purchaseDate:now, priceJPY:4500, tastingNotes:['bergamot','tropical'], cuppingScore:92, tried:true, createdAt:now, updatedAt:now },
    ]
    const brews: Brew[] = [
      { id: nanoid(), beanId: seeds[0].id, date: now, method: 'V60', doseG:15, waterG:240, ratio:'1:16', tempC:94, timeSec:150, steps:['Bloom 30s','Pour to 240g by 1:45'], rating:5, notes:'Delicate jasmine.' },
      { id: nanoid(), beanId: seeds[1].id, date: now, method: 'FrenchPress', doseG:18, waterG:270, ratio:'1:15', tempC:94, timeSec:240, steps:['4:00 total','Skim crust'], rating:4, notes:'Blackcurrant pop.' },
      { id: nanoid(), beanId: seeds[2].id, date: now, method: 'Siphon', doseG:20, waterG:300, ratio:'1:15', tempC:92, timeSec:210, steps:['Assemble','Stir & draw down'], rating:5, notes:'Elegant, tea-like.' },
      { id: nanoid(), beanId: seeds[3].id, date: now, method: 'IcedFrenchPress', doseG:18, waterG:180, ratio:'bypass on 120g ice', tempC:95, timeSec:150, steps:['Add 120g ice','Steep 2:30','Press gently'], rating:4, notes:'Chocolate soda.' },
      { id: nanoid(), beanId: seeds[4].id, date: now, method: 'AeroPress', doseG:16, waterG:220, ratio:'1:13.7', tempC:93, timeSec:120, steps:['Inverted 1:20 steep','Press 20s'], rating:4, notes:'Balanced.' },
      { id: nanoid(), beanId: seeds[5].id, date: now, method: 'Espresso', doseG:18, waterG:36, ratio:'1:2', tempC:94, timeSec:30, steps:['18 in, 36 out in 30s'], rating:5, notes:'Perfumed, sweet.' },
      { id: nanoid(), beanId: seeds[5].id, date: now, method: 'V60', doseG:15, waterG:240, ratio:'1:16', tempC:93, timeSec:160, steps:['Standard pour'], rating:5, notes:'Tropical fruit.' },
      { id: nanoid(), beanId: seeds[0].id, date: now, method: 'Batch', doseG:50, waterG:800, ratio:'1:16', tempC:92, timeSec:240, steps:['Batch brewer'], rating:3, notes:'Softer acidity.' },
    ]
    set({ beans: seeds, brews })
  },
}))

// Persistence hook to sync with localStorage via our storage.ts helpers
// (explicit save on window unload)
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    const s = useStore.getState()
    saveDB({ version: 1, beans: s.beans, brews: s.brews })
  })
  // on load, try to restore existing DB
  const existing = loadDB()
  if (existing.beans.length || existing.brews.length) {
    useStore.setState({ beans: existing.beans as any, brews: existing.brews as any })
  } else {
    useStore.getState().seedIfEmpty()
    const s = useStore.getState()
    saveDB({ version: 1, beans: s.beans, brews: s.brews })
  }
}
