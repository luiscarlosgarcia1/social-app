import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import IdeatorProfile from "./pages/IdeatorProfile"
import BuilderProfile from "./pages/BuilderProfile"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/BuilderProfile" element= {<BuilderProfile/>} />
        <Route path="/IdeatorProfile" element= {<IdeatorProfile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App