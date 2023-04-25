import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import apiTransaction from "../services/transaction.api.js"
import { UserContext } from "../contexts/UserContext.js"

export default function TransactionsPage() {
  const [form, setForm] = useState({ value: "", description: "" })
  const { tipo } = useParams()
  const typeTransaction = tipo === "saida" ? "saída" : "entrada"
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const body = {
      ...form,
      value: Number(form.value).toFixed(2).replace(",", "."),
    }
    apiTransaction
      .postTransaction(body, user.token, tipo)
      .then((res) => {
        alert(`Transação de ${typeTransaction} adicionada com sucesso`)
        navigate("/home")
      })
      .catch((err) => alert(err.response.data))
  }
  return (
    <TransactionsContainer>
      <h1>Nova {typeTransaction}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Valor"
          type="number"
          onChange={handleForm}
          name="value"
          value={form.value}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          onChange={handleForm}
          name="description"
          value={form.description}
          required
        />
        <button type="submit">Salvar {typeTransaction}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
