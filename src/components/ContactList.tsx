import ContactItem from './ContactItem'
import { Input } from '@/components/ui/input'
import { Contact } from './ContactPage'

interface ContactListProps {
    contacts: Contact[]
    onToggleFavorite: (id: number) => void
    onRemoveContact: (id: number) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function ContactList({ contacts, onToggleFavorite, onRemoveContact, searchQuery, setSearchQuery }: ContactListProps) {
    return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Procurar contatos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      {contacts.length === 0 ? (
        <p className="text-gray-500">Nenhum contado cadastrado ainda</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <ContactItem
            key={contact.id}
            contact={contact}
            onToggleFavorite={onToggleFavorite}
            onRemoveContact={onRemoveContact}
          />
          ))}
        </ul>
      )}
    </div>
  )
}

