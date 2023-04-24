import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import apiAuth from "../services/auth.api.js"

export default function SignUpPage() {
  const [form, setForm] = useState({
    password: "",
    email: "",
    username: "",
    confirmPassword: "",
  })
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.confirmPassword !== form.password) {
      setForm({ ...form, password: "", confirmPassword: "" })
      return alert("Campo senha e confirmar senha precisam ser iguais")
    }
    setDisabled(true)
    const { password, email, username } = form
    const body = { password, email, username }
    apiAuth
      .signUp(body)
      .then((res) => {
        alert("Conta criada com sucesso!")
        navigate("/")
      })
      .catch((err) => {
        setDisabled(false)
        alert(err.response.data)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          required
          onChange={handleForm}
          name="username"
          value={form.username}
        />
        <input
          placeholder="E-mail"
          type="email"
          required
          onChange={handleForm}
          name="email"
          value={form.email}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          onChange={handleForm}
          name="password"
          value={form.password}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          required
          onChange={handleForm}
          name="confirmPassword"
          value={form.confirmPassword}
        />
        <button disabled={disabled} type="submit">
          Cadastrar
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
