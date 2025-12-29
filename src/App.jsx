import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "sonner" // ← CAMBIA QUESTA RIGA

function App() {
  return (
    <>
      <Pages />
      <Toaster 
        position="top-right"
        richColors
        theme="dark"
      />
    </>
  )
}

export default App
