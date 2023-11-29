import { useRouter } from "next/router";
import styled from "styled-components";

export default function Main() {
  const router = useRouter();
  const onClickFirstTask = () => {
    router.push(`/assignment/firstTask`);
  };

  const onClickSecondTask = () => {
    router.push(`/assignment/secondTask`);
  };

  const onClickThirdTask = () => {
    router.push(`/assignment/thirdTask`);
  };

  return (
    <Container>
      <Title>2024 학교종이 프론트엔드 채용 과제</Title>
      <TasksContainer>
        <TaskItem onClick={onClickFirstTask}>과제1</TaskItem>
        <TaskItem onClick={onClickSecondTask}>과제2</TaskItem>
        <TaskItem onClick={onClickThirdTask}>과제3</TaskItem>
      </TasksContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  width: 100%;
  padding: 50px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskItem = styled.h2`
  font-size: 1.5rem;
  width: 100%;
  margin: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;
