import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
function App() {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/*' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
