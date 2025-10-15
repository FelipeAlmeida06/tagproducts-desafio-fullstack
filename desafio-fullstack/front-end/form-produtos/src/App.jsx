import { useState } from 'react'
import './App.css'

import FormularioProdutos from './components/Formulario'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormularioProdutos />
    </>
  )
}

export default App
