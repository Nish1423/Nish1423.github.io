import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BrewSchema, type Brew } from '../../types'

type Props = {
  defaultValues?: Partial<Brew>
  onSubmit: (b: Omit<Brew,'id'>) => void
}

export default function BrewForm({ defaultValues, onSubmit }: Props) {
  const schema = BrewSchema.omit({ id: true })
  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().slice(0,10),
      method: 'V60',
      doseG: 15,
      waterG: 240,
      steps: ['Bloom 30s','Pour to 240g'],
      ...defaultValues
    }
  })
  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v))} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-sm">Date</label><input className="input" type="date" {...register('date')} /></div>
        <div><label className="text-sm">Method</label>
          <select className="input" {...register('method')}>
            <option>V60</option><option>AeroPress</option><option>FrenchPress</option><option>Siphon</option><option>Espresso</option><option>Batch</option><option>IcedFrenchPress</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div><label className="text-sm">Dose (g)</label><input className="input" type="number" step="1" {...register('doseG', { valueAsNumber: true })} /></div>
        <div><label className="text-sm">Water (g)</label><input className="input" type="number" step="1" {...register('waterG', { valueAsNumber: true })} /></div>
        <div><label className="text-sm">Ratio</label><input className="input" placeholder="1:16 or notes" {...register('ratio')} /></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-sm">Temp (°C)</label><input className="input" type="number" step="1" {...register('tempC', { valueAsNumber: true })} /></div>
        <div><label className="text-sm">Time (sec)</label><input className="input" type="number" step="1" {...register('timeSec', { valueAsNumber: true })} /></div>
      </div>
      <div><label className="text-sm">Steps (comma-separated)</label><input className="input" {...register('steps', { setValueAs: v => (typeof v === 'string' ? v.split(',').map((x:string)=>x.trim()).filter(Boolean) : v) })} /></div>
      <div><label className="text-sm">Notes</label><textarea className="input" rows={3} {...register('notes')} /></div>
      <button className="btn" type="submit">Save Brew</button>
    </form>
  )
}
