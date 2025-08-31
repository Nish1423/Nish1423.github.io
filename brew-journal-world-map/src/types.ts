import { z } from 'zod'

export const BeanSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  roaster: z.string().optional(),
  originCountry: z.string().length(3), // ISO-3166 alpha-3
  originRegion: z.string().optional(),
  farm: z.string().optional(),
  variety: z.array(z.string()).default([]),
  process: z.string().optional(),
  altitudeM: z.number().int().nonnegative().optional(),
  roastLevel: z.enum(['light','medium','dark']).optional(),
  roastDate: z.string().optional(),
  purchaseDate: z.string().optional(),
  priceJPY: z.number().nonnegative().optional(),
  tastingNotes: z.array(z.string()).default([]),
  cuppingScore: z.number().min(0).max(100).optional(),
  labelPhoto: z.string().optional(),
  tried: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Bean = z.infer<typeof BeanSchema>

export const BrewSchema = z.object({
  id: z.string(),
  beanId: z.string(),
  date: z.string(),
  method: z.string(),
  doseG: z.number(),
  waterG: z.number(),
  ratio: z.string().optional(),
  tempC: z.number().optional(),
  grindNote: z.string().optional(),
  timeSec: z.number().optional(),
  steps: z.array(z.string()).default([]),
  tds: z.number().optional(),
  extractionYield: z.number().optional(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  attachments: z.array(z.string()).optional(),
})

export type Brew = z.infer<typeof BrewSchema>
