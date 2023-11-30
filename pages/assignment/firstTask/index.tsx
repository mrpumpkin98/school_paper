import { useState } from "react";
import styled from "styled-components";

export default function FirstTask() {
  const [inputNumbers, setInputNumbers] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [maxProductNumbers, setMaxProductNumbers] = useState<number[]>([]);

  const findLargestProduct = (arr: number[]): number => {
    if (arr.length < 2) {
      throw new Error("배열의 길이는 최소 2여야 합니다.");
    }

    let largestProduct = arr[0] * arr[1];
    let maxProductNumbers = [arr[0], arr[1]];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const product = arr[i] * arr[j];
        if (product > largestProduct) {
          largestProduct = product;
          maxProductNumbers = [arr[i], arr[j]];
        }
      }
    }

    setMaxProductNumbers(maxProductNumbers);
    return largestProduct;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumbers(event.target.value);
  };

  const handleCalculate = () => {
    const numbersArray = inputNumbers.split(",").map(Number);

    try {
      const largestProduct = findLargestProduct(numbersArray);
      setResult(largestProduct);
    } catch (error: any) {
      setResult(error.message);
    }
  };

  return (
    <Container>
      <Title>과제1</Title>
      <Input
        placeholder="1,2,3,4,5"
        value={inputNumbers}
        onChange={handleInputChange}
      />
      <Button onClick={handleCalculate}>계산하기</Button>
      <h2>결과</h2>
      <Result>
        {result !== null
          ? `가장 큰 곱: ${result}, 가장 큰 조합: ${maxProductNumbers.join(
              ", "
            )}`
          : "결과가 여기에 표시됩니다."}
      </Result>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  padding: 50px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Result = styled.p`
  font-size: 16px;
  margin-top: 20px;
`;
