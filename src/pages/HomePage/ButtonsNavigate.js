import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function ButtonsNavigate() {
  const navigate = useNavigate()

  return (
    <ButtonsContainer>
      <button onClick={() => navigate("/nova-transacao/entrada")}>
        <AiOutlinePlusCircle />
        <p>
          Nova <br /> entrada
        </p>
      </button>
      <button onClick={() => navigate("/nova-transacao/saida")}>
        <AiOutlineMinusCircle />
        <p>
          Nova <br />
          saída
        </p>
      </button>
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
