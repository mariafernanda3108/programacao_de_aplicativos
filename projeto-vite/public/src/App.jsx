import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mensagem from './components/Bb'
import InfoAluno from './components/InfoAluno'
import InfoCurso from './components/InfoCurso'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>ATIVIDADE</h1>
      <Mensagem />
      <InfoAluno />
      <InfoCurso />

    </>
  )
}

export default App
