import { Star, Trash2 } from 'lucide-react'
import { Button } from './ui/button'

interface ContactItemProps {
  contact: any
  onToggleFavorite: (id: number) => void
  onRemoveContact: (id: number) => void
}

export default function ContactItem({ contact, onToggleFavorite,onRemoveContact }: ContactItemProps) {
  return (
    <li className="flex items-center justify-between bg-card border p-4 rounded-lg shadow">
      <div>
        <div className="flex gap-4 items-center justify-center">
        <h3 className="font-semibold">{contact.name}</h3>
        <span className='inline-flex h-5 items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-teal-100 bg-teal-100 text-teal-700 hover:border-teal-100 hover:bg-teal-100 focus:border-teal-100 focus:bg-teal-100 focus-visible:border-teal-100 focus-visible:bg-teal-100 mr-1 cursor-default'>{contact.status}</span>
        </div>
        <p className="text-sm text-gray-600">{contact.city}</p>
      </div>
      <div className='flex items-center justify-center gap-2'>
      <button
        onClick={() => onToggleFavorite(contact.id)}
        className={`p-2 rounded-full ${
          contact.is_favorite ? 'text-yellow-500' : 'text-gray-400'
        }`}
      >
        <Star className={contact.is_favorite ? 'fill-current' : ''} />
      </button>
      <Button
          variant="destructive"
          size="icon"
          onClick={() => onRemoveContact(contact.id)}
          aria-label="Remove contact"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}

