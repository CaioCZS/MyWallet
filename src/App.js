import { Routes, Route, useNavigate } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useEffect, useState } from "react"
import { UserContext } from "../src/contexts/UserContext.js"
export default function App() {
  const lsUser = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(lsUser ? lsUser : {})
  const navigate = useNavigate()

  useEffect(() => {
    if (!lsUser) {
      navigate("/")
    } else {
      navigate("/home")
    }
  }, [])
  return (
    <PagesContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </UserContext.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
