
import './App.css'
import {useEffect, useState } from "react"
import { supabase } from "./client.ts"
import { Routes, Route, Link } from 'react-router-dom' 
import ShowCreators  from './components/pages/ShowCreators.tsx'
import AddCreator  from './components/pages/AddCreator.tsx'
import EditCreator  from './components/pages/EditCreator.tsx'
import ViewCreator  from './components/pages/ViewCreator.tsx'


function App() {

  type Instrument = {
  id: number,
      name: string,
      url: string,
      description: string,
      imageUrl: string
  // Add other fields like: brand, price, category, etc.
};

  const [instruments, setInstruments] = useState<Instrument[]>([]);

    useEffect(() => {
      getInstruments();
    }, []);

    async function getInstruments() {
      const { data } = await supabase.from("instruments").select();
      setInstruments(data || []);

    }
  return (
    <div>
      <ul>
      {instruments.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li>
      )
      )}
    </ul>
    
    <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/add" element={<AddCreator />} />
          <Route path="/view/:id" element={<ViewCreator />} />
          <Route path="/edit/:id" element={<EditCreator />} />
        </Routes>
      </div>
  </div>
 
  );
}

export default App
