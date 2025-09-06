import { useState } from 'react'
 
import './App.css'
 import ContactList from '../component/ContactList'
import ContactForm from '../component/ContactForm'
import ContactTables from '../component/ContactTables';
 
function App() {
const [contacts, setContacts] = useState([]);

  return (
    <>
     <div className="p-8 max-w-[1440px] mx-auto grid grid-cols-1 gap-[70px]">
      <div className="col-span-1 space-y-4">
        <h1 className="text-[32px] font-bold mb-10 text-[#00277a]">
          ADD Details
        </h1>
        <ContactForm setContacts={setContacts} contacts={contacts} />
      </div>

      <div className="col-span-3">
        <ContactList setContacts={setContacts} contacts={contacts} />
      </div>
 
    </div>
       
    </>
  )
}

export default App
