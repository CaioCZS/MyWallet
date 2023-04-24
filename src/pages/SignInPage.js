import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import apiAuth from "../services/auth.api.js"

export default function SignInPage() {
  const [form, setForm] = useState({ password: "", email: "" })
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setDisabled(true)
    apiAuth
      .signIn(form)
      .then((res) => {
        console.log(res.data)
        navigate("/home")
      })
      .catch((err) => {
        alert(err.response.data)
        setDisabled(false)
        setForm({ password: "", email: "" })
      })
  }
  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={handleForm}
          value={form.email}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="password"
          onChange={handleForm}
          value={form.password}
          required
        />
        <button disabled={disabled} type="submit">
          Entrar
        </button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
