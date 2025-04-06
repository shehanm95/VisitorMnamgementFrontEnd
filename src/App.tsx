import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginForm } from './components/authentication/LoginForm'
import { RegisterForm } from './components/authentication/RegisterForm'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="login/" element={<LoginForm />} />
          <Route path="register/" element={<RegisterForm />} />
        </Routes>
      </div>
    </>
  )
}

export default App
