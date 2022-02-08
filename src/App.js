import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";

const gridHeight = 6;
const gridWidth = 5;
const statuses = { empty: 0, incorrect: 1, wrongPosition: 2, correct: 3 };
const solution = "rando";

function App() {
  const [initialValues, setInitialValues] = useState([]);
  const [targetRow, setTargetRow] = useState(0);
  const [gameIsEnded, setGameIsEnded] = useState(false);

  useEffect(() => {
    function fillGridWithInitialValues() {
      let iValues = [];
      //create the empty columns
      for (let i = 0; i < gridHeight; i++) {
        iValues.push([]);
      }

      //fill the rows for each column
      for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
          iValues[i].push({
            value: "x",
            status: statuses.empty,
          });
        }
      }

      setInitialValues(iValues);
    }

    //only initialize on start
    if (initialValues.length === 0) {
      fillGridWithInitialValues();
    }
  });

  const cleanValue = (e, rowIndex, slotIndex) => {
    const valuesCopy = [...initialValues];

    //clear previous slot
    valuesCopy[rowIndex][slotIndex].value = "";
    setInitialValues(valuesCopy);
  };

  const handleChange = (e, rowIndex, slotIndex) => {
    const valuesCopy = [...initialValues];

    //TO DO
    /* //only take first letter input
    valuesCopy[rowIndex][slotIndex].value = e.target.value[1]; */

    valuesCopy[rowIndex][slotIndex].value = e.target.value;

    setInitialValues(valuesCopy);
    console.log("VALUES", valuesCopy);
  };

  const handleSubmit = () => {
    const valuesCopy = [...initialValues];
    const currentTarget = valuesCopy[targetRow];
    for (let i = 0; i < currentTarget.length; i++) {
      if (currentTarget[i].value === solution[i]) {
        currentTarget[i].status = statuses.correct;
      } else if (solution.includes(currentTarget[i].value)) {
        currentTarget[i].status = statuses.wrongPosition;
      } else {
        currentTarget[i].status = statuses.incorrect;
      }
    }
    let solutionIsCorrect = true;
    for (let i = 0; i < currentTarget.length; i++) {
      if (currentTarget[i].status !== statuses.correct) {
        console.log("false");
        solutionIsCorrect = false;
      }
    }

    setGameIsEnded(solutionIsCorrect);
    console.log("IS CORRECT", solutionIsCorrect);
  };

  const renderRow = (row, rowIndex) => {
    return (
      <RowWrapper>
        {row.map((slot, slotIndex) => (
          <SlotWrapper key={slotIndex}>
            <Slot
              value={slot.value}
              onChange={(e) => {
                cleanValue(e, rowIndex, slotIndex);

                handleChange(e, rowIndex, slotIndex);
              }}
            />
          </SlotWrapper>
        ))}
      </RowWrapper>
    );
  };

  const renderRows = () => {
    return initialValues.map((row, rowIndex) => (
      <Fragment key={rowIndex}>{renderRow(row, rowIndex)}</Fragment>
    ));
  };

  return (
    <>
      <Title>Watered-down Wordle Unlimited</Title>
      <GameWrapper>{renderRows()}</GameWrapper>x{" "}
      <SubmitButtonWrapper>
        <SubmitButton correct={gameIsEnded} onClick={handleSubmit}>
          Submit result
        </SubmitButton>
      </SubmitButtonWrapper>
    </>
  );
}

const Title = styled.div`
  font-size: 2rem;
  margin: 4rem auto;
  text-align: center;
  font-weight: 900;
  color: ${(props) => props.theme.colors.grey};
`;

const GameWrapper = styled.div`
  display: flex;
  margin: 3rem auto 1rem auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  color: ${(props) => props.theme.colors.grey};
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const SlotWrapper = styled.div`
  font-weight: 700;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
`;

const Slot = styled.input`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  color: ${(props) => props.theme.colors.grey};
  border: 1px solid ${(props) => props.theme.colors.grey};
  outline: none;
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
`;

const SubmitButton = styled.div`
  border-radius: 2%;
  font-size: 1rem;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.colors.grey};
  width: 4rem;
  text-align: center;
  margin: 1px auto;
  color: ${(props) => (props.correct ? "green" : "red")};
`;

export default App;
