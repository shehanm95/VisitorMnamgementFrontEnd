import './App.css'
import { LoginForm } from './components/authentication/LoginForm'
import { RegisterForm } from './components/authentication/RegisterForm'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/content/Home'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="login/" element={<LoginForm />} />
          <Route path="register/" element={<RegisterForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
