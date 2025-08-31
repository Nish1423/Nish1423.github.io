import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeanSchema, type Bean } from '../../types'

type Props = {
  defaultValues?: Partial<Bean>
  onSubmit: (b: Omit<Bean,'id'|'createdAt'|'updatedAt'>) => void
}

export default function BeanForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<any>({
    resolver: zodResolver(BeanSchema.omit({ id: true, createdAt: true, updatedAt: true })),
    defaultValues: {
      name: '',
      originCountry: 'ETH',
      variety: [],
      tastingNotes: [],
      tried: false,
      ...defaultValues
    }
  })
  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v as any))} className="space-y-3">
      <div><label className="text-sm">Name</label><input className="input" {...register('name')} />{errors.name && <p className="text-red-400 text-xs">{String(errors.name.message)}</p>}</div>
      <div><label className="text-sm">Roaster</label><input className="input" {...register('roaster')} /></div>
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-sm">Origin (ISO3 e.g., ETH, KEN)</label><input className="input" {...register('originCountry')} /></div>
        <div><label className="text-sm">Process</label><input className="input" {...register('process')} /></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-sm">Roast Level</label>
          <select className="input" {...register('roastLevel')}>
            <option value="">-</option>
            <option value="light">light</option>
            <option value="medium">medium</option>
            <option value="dark">dark</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" {...register('tried')} className="w-4 h-4" /><span className="text-sm">Tried</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-sm">Roast Date</label><input type="date" className="input" {...register('roastDate')} /></div>
        <div><label className="text-sm">Purchase Date</label><input type="date" className="input" {...register('purchaseDate')} /></div>
      </div>
      <div><label className="text-sm">Tasting Notes (comma-separated)</label><input className="input" {...register('tastingNotes', { setValueAs: v => (typeof v === 'string' ? v.split(',').map((x:string)=>x.trim()).filter(Boolean) : v) })} /></div>
      <button className="btn" type="submit">Save Bean</button>
    </form>
  )
}
