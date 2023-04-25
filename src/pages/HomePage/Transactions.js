import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import apiTransaction from "../../services/transaction.api.js"
import { UserContext } from "../../contexts/UserContext.js"
import ItemTransaction from "./ItemTransaction.js"

export default function Transactions() {
  const [list, setList] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const { user } = useContext(UserContext)

  function calculateTotal(list) {
    let total = 0
    list.forEach((t) => {
      if (t.type === "entrada") {
        total += Number(t.value)
      } else {
        total -= Number(t.value)
      }
    })
    setTotalValue(total.toFixed(2))
  }

  useEffect(() => {
    apiTransaction
      .getTransaction(user.token)
      .then((res) => {
        const listGet = res.data
        setList(listGet)
        calculateTotal(listGet)
      })
      .catch((err) => {
        alert("Erro ao buscar transações")
      })
  }, [])
  return (
    <TransactionsContainer>
      <StyledUl>
        {list.map((t) => (
          <ItemTransaction
            key={t._id}
            date={t.time}
            description={t.description}
            value={t.value}
            type={t.type}
          />
        ))}
      </StyledUl>

      <article>
        <strong>Saldo</strong>
        <Value color={totalValue}>{totalValue}</Value>
      </article>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color >= 0 ? "green" : "red")};
`
const StyledUl = styled.ul`
  max-height: 90%;
  overflow-y: auto;
`
