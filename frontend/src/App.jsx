import './App.css'
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import CartContextProvider from './context/CartContextProvider.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="
      bg-[#FCFCE3] 
      bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:40px_40px]
      h-[100vh]
    ">
      <Router>
        <Routes>
          <Route path="/" element={<CartContextProvider><HomePage /></CartContextProvider>} />    {/* 預設首頁 */}
          <Route path="/login" element={<LoginPage />} /> {/* 當路由是 /login，顯示 LoginPage */}
          <Route path="/register" element={<SignUpPage />} /> {/* 當路由是 /login，顯示 LoginPage */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
