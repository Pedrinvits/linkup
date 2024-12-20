import { Check, Copy, Star, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { useClipboard } from '@/hooks/use-clipboard'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

interface ContactItemProps {
  contact: any
  onToggleFavorite: (id: number) => void
  onRemoveContact: (id: number) => void
}

export default function ContactItem({ contact, onToggleFavorite,onRemoveContact }: ContactItemProps) {
  const status = contact?.user_info?.status;
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
  
    return phone;
  };
  const { onCopy, hasCopied } = useClipboard()
    const handleCopy = () => {
    onCopy(formatPhoneNumber(contact.phone))
  }

  // console.log("CONTATO", contact);
  
  return(
    <li className="flex items-center justify-between bg-card border p-4 rounded-lg shadow">
      <div>
        <div className="flex gap-4 items-center justify-center">
        <h3 className="font-semibold">{contact.name}</h3>
        
        { (status || contact.status ) == 'ocupado' ? 
          <span className='inline-flex h-5 items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 text-xs  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-red-100 bg-red-200 text-red-900 hover:border-red-100 hover:bg-red-100 focus:border-red-100 focus:bg-red-100 focus-visible:border-red-100 focus-visible:bg-red-100 mr-1 cursor-default font-bold'>{status || contact.status}</span>
          :
          <span className='inline-flex h-5 items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-teal-100 bg-teal-100 text-teal-700 hover:border-teal-100 hover:bg-teal-100 focus:border-teal-100 focus:bg-teal-100 focus-visible:border-teal-100 focus-visible:bg-teal-100 mr-1 cursor-default'>{status || contact.status}</span>
        }

        </div>
        <p className="text-sm text-gray-600">{formatPhoneNumber(contact.phone)}</p>
      </div>
      <div className='flex items-center justify-center gap-2'>
      <Link 
        href={`https://wa.me/55${contact.phone}`}
        target='_blank'
      >
      <FaWhatsapp />
      </Link>
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
        <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </li>
  )
}

