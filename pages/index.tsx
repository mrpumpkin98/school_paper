import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Title>2024 학교종이 프론트엔드 채용 과제</Title>
      <TasksContainer>
        <TaskItem>과제1</TaskItem>
        <TaskItem>과제2</TaskItem>
        <TaskItem>과제3</TaskItem>
      </TasksContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskItem = styled.h2`
  font-size: 1.5rem;
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;
