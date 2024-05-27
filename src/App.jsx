//browserRouter
import { BrowserRouter, Route, Routes } from "react-router-dom"
// components
import { Header,Footer } from "./components";
//pages
import {Home,Contact, Login, Signup, Reset} from './pages';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/reset" element={<Reset/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
    </>
  )
}

export default App
