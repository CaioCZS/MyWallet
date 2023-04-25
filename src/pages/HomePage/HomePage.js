import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import ButtonsNavigate from "./ButtonsNavigate.js"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext.js"
import { useNavigate } from "react-router-dom"
import Transactions from "./Transactions.js"

export default function HomePage() {
  const { user } = useContext(UserContext)
  const naviagate = useNavigate()
  function logout() {
    if (window.confirm("Deseja mesmo sair?")) {
      localStorage.clear()
      naviagate("/")
    }
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={logout} />
      </Header>
      <Transactions />
      <ButtonsNavigate />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
