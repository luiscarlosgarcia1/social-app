import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BusinessProfile from "./pages/BusinessProfile"
import StudentProfile from "./pages/StudentProfile"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/BusinessProfile" element= {<BusinessProfile/>} />
        <Route path="/StudentProfile" element= {<StudentProfile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App