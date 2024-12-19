'use client'

import { useEffect, useState } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { useSession } from 'next-auth/react'

export interface Contact {
  id: number
  name: string
  email: string
  city: string
  phone: string
//   status: string
  is_favorite: boolean
}

export default function ContactsPage() {
  const session = useSession();
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const token = session?.data?.data.token

  const addContact = async  (name: string, email: string,city: string,phone: string) => {
    const data = {
        name,
        phone,
        city
    }
    const url = "http://localhost:8888/api/contacts";
    
    const res = await fetch(url,{
        method : "POST",
        headers : { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    const json = await res.json();

    if(json.status == 201){
        const newContact: Contact = {
            id: json.contato.id,
            name,
            email,
            city,
            phone,
            is_favorite: false,
          }
          setContacts([...contacts, newContact])
    }
  }

  const toggleFavorite = async (id: number) => {
    const url = "http://localhost:8888/api/favorites";
    const data = {
        contact_id : id
    }
    const res = await fetch(url,{
        method : "POST",
        headers : { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    const json = await res.json();

    if(json.status == 201){
        setContacts(
            contacts.map((contact) =>
              contact.id === id ? { ...contact, is_favorite: !contact.is_favorite } : contact
            )
          )
    }
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!showFavoritesOnly || contact.is_favorite)
  )

  const removeContact = async (id: number) => {

    const url = `http://localhost:8888/api/contacts/${id}`

    const res = await fetch(url,{
        method : "DELETE",
        headers : { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const json = await res.json();
 
    setContacts(contacts.filter((contact) => contact.id !== id))
  }
  const fetchContacts = async () => {
    const url = "http://localhost:8888/api/contacts";
 
    const res = await fetch(url,{
        method : "GET",
        headers : { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const json = await res.json();

    if(json){
        setContacts(json)
    }
  }

  useEffect(()=>{
    fetchContacts()
  },[])

  return (
    <div className="sm:w-[40rem] w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Seja Bem-Vindo, {session?.data?.data.name}!</h1>
      <h2 className="text-xl font-bold mb-6">Consulte sua agenda</h2>
      <div className="flex flex-col w-full gap-4">
      <Drawer>
        <DrawerTrigger asChild>
            <Button variant = "outline">
                Adicione um novo contato
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <div className='sm:w-1/2 w-full mx-auto gap-4'>
                    <ContactForm onAddContact={addContact} />
                    <DrawerClose className='w-full flex mt-4 flex-col'>
                        <Button variant = "outline" className='w-full'>Cancel</Button>
                    </DrawerClose>
                </div>
            </DrawerHeader>
        </DrawerContent>
        </Drawer>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lista de contatos</h2>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="favorite-filter"
              checked={showFavoritesOnly}
              onCheckedChange={setShowFavoritesOnly}
            />
            <Label htmlFor="favorite-filter">Mostrar somente os favoritos</Label>
          </div>
          <ContactList
            contacts={filteredContacts}
            onToggleFavorite={toggleFavorite}
            onRemoveContact={removeContact}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
    </div>
  )
}

