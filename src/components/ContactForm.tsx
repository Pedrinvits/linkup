import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ContactFormProps {
  onAddContact: (name: string, city: string,email: string,phone: string) => void
}

export default function ContactForm({ onAddContact }: ContactFormProps) {
  const [name, setName] = useState('')
  const [city, setcity] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && city.trim()) {
      onAddContact(name.trim(), city.trim(),email.trim(),phone.trim())
      setName('')
      setcity('')
      setEmail('')
      setPhone('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1>Adicionar contato</h1>
      <div>
        <Input
          id="name"
          type="text"
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          id="city"
          type="text"
          placeholder='cidade'
          value={city}
          onChange={(e) => setcity(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          id="email"
          type="email"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          id="phone"
          type="phone"
          placeholder='celular'
          value={phone}
          maxLength={11}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Confirmar</Button>
    </form>
  )
}

