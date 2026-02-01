
import './App.css'
import {useEffect, useState } from "react"
import { supabase } from "./client.ts"
import { Routes, Route, Link } from 'react-router-dom' 
import ShowCreators  from './components/pages/ShowCreators.tsx'
import AddCreator  from './components/pages/AddCreator.tsx'
import EditCreator  from './components/pages/EditCreator.tsx'
import ViewCreator  from './components/pages/ViewCreator.tsx'


function App() {
  return (
    <div>
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
