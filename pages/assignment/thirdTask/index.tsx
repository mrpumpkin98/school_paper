import { localDataState, userFormState } from "../../../src/recoils/atoms/Atom";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

interface User {
  name: string;
  password: string;
}

export default function ThirdTask() {
  const setUserFormState = useSetRecoilState(userFormState);
  const userFormData = useRecoilValue(userFormState);
  const setLocalDataState = useSetRecoilState(localDataState);
  const localData = useRecoilValue(localDataState) as User[];
  const [nameErrorMessages, setNameErrorMessages] = useState<string[]>([]);
  const [passwordErrorMessages, setPasswordErrorMessages] = useState<string[]>(
    []
  );

  // Confirm 버튼 비활성화 여부
  const isConfirmButtonDisabled =
    nameErrorMessages.some((errorMessage) => errorMessage !== "") ||
    passwordErrorMessages.some((errorMessage) => errorMessage !== "") ||
    userFormData.some(
      (user, currentIndex) =>
        user.name.trim().length < 3 ||
        user.password.trim().length < 6 ||
        user.name.trim() === "" ||
        user.password.trim() === "" ||
        userFormData.findIndex(
          (otherUser, otherIndex) =>
            currentIndex !== otherIndex && user.name === otherUser.name
        ) !== -1
    );

  const handleInputChange = (e: any, fieldName: string, index: number) => {
    const value = e.target.value;
    const names = userFormData.map((user) => user.name); // 현재 입력된 이름들을 배열로 가져옴
    const isNameDuplicate =
      names.filter((name, i) => i !== index && name === value).length > 0; // 현재 입력된 이름 중에 중복되는 것이 있는지 확인
    const isNameInvalid = fieldName === "name" && value.trim().length < 3; // 이름이 3글자 미만인 경우 에러 메시지 표시
    const isPasswordInvalid = value.trim().length < 6; // 비밀번호가 6글자 미만인 경우 에러 메시지 표시

    setUserFormState((prevUserFormState) => {
      const updatedUserFormState = [...prevUserFormState];
      updatedUserFormState[index] = {
        ...updatedUserFormState[index],
        [fieldName]: value,
      };
      return updatedUserFormState;
    });

    // 이름과 관련된 에러 메시지 업데이트
    if (fieldName === "name") {
      setNameErrorMessages((prevErrorMessages) => {
        const newErrorMessages = [...prevErrorMessages];
        if (isNameDuplicate) {
          newErrorMessages[index] = "이름이 중복됩니다.";
        } else if (isNameInvalid) {
          newErrorMessages[index] = "이름은 3글자 이상이어야 합니다.";
        } else {
          newErrorMessages[index] = ""; // 중복이 아니고 유효한 경우 에러 메시지 초기화
        }
        return newErrorMessages;
      });
    }

    // 비밀번호와 관련된 에러 메시지 업데이트
    if (fieldName === "password") {
      setPasswordErrorMessages((prevErrorMessages) => {
        const newErrorMessages = [...prevErrorMessages];
        if (isPasswordInvalid) {
          newErrorMessages[index] = "비밀번호는 6글자 이상이어야 합니다.";
        } else {
          newErrorMessages[index] = ""; // 유효한 경우 에러 메시지 초기화
        }
        return newErrorMessages;
      });
    }
  };

  // 사용자 추가 함수
  const handleAddUser = () => {
    setUserFormState((prevUserFormState) => [
      ...prevUserFormState,
      {
        name: "",
        password: "",
      },
    ]);
  };

  // 사용자 삭제 함수
  const handleRemoveUser = (index: number) => {
    setUserFormState((prevUserFormState) => {
      const updatedUserFormState = [...prevUserFormState];
      updatedUserFormState.splice(index, 1);
      return updatedUserFormState;
    });
  };

  // Confirm 버튼 클릭 시 호출되는 함수
  const handleConfirm = () => {
    const storedData = localStorage.getItem("userFormData");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    const newData = [...parsedData, ...userFormData];
    localStorage.setItem("userFormData", JSON.stringify(newData));
    setUserFormState([]);
  };

  // Reset 버튼 클릭 시 호출되는 함수
  const handleReset = () => {
    localStorage.removeItem("userFormData");
    setLocalDataState([]);
  };

  // 로컬스토리지 변경 감지 및 업데이트 함수
  useEffect(() => {
    const storedData = localStorage.getItem("userFormData");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setLocalDataState(parsedData);
  }, [userFormData]);

  return (
    <Container>
      <Header>과제3</Header>

      {userFormData.map((user, index) => (
        <Form>
          <UserInfo key={index}>
            <UserBlock>
              <UserTitle>{`User - ${index}`}</UserTitle>
              <CloseButton onClick={() => handleRemoveUser(index)}>
                Close
              </CloseButton>
            </UserBlock>
            <InputBlock>
              <InputLabel>Name</InputLabel>
              <InputField
                type="text"
                value={user.name || ""}
                onChange={(e) => handleInputChange(e, "name", index)}
              />
              <ErrorLabel>{nameErrorMessages[index]}</ErrorLabel>
            </InputBlock>
            <InputBlock>
              <InputLabel>Password</InputLabel>
              <InputField
                type="password"
                value={user.password || ""}
                onChange={(e) => handleInputChange(e, "password", index)}
              />
              <ErrorLabel>{passwordErrorMessages[index]}</ErrorLabel>
            </InputBlock>
          </UserInfo>
        </Form>
      ))}
      <ButtonContainer>
        <ActionButton onClick={handleAddUser}>Add User</ActionButton>
        <ActionButton
          onClick={handleConfirm}
          disabled={isConfirmButtonDisabled}
        >
          Confirm
        </ActionButton>
        <ActionButton onClick={handleReset}>Reset</ActionButton>
      </ButtonContainer>
      <UserListContainer>
        {localData.map((user, index) => (
          <UserInfoWrapper key={index}>
            <UserName>Name: {user.name}</UserName>
            <UserPassword>Password: {user.password}</UserPassword>
          </UserInfoWrapper>
        ))}
      </UserListContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Form = styled.div`
  width: 500px;
  padding: 20px;
  border: 1px solid black;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const UserBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const UserTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background-color: #fff;
  border: 1px solid black;
  padding: 5px 10px;
  cursor: pointer;
`;

const InputBlock = styled.div`
  margin-bottom: 10px;
`;

const InputLabel = styled.p`
  margin: 5px 0;
  font-weight: 500;
`;

const ErrorLabel = styled.p`
  font-size: 12px;
  color: red;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  background-color: #fff;
  border: 1px solid black;
  width: 80px;
  padding: 10px 0px;
  cursor: pointer;
  margin-right: 10px;
`;

const UserListContainer = styled.div`
  margin-top: 20px;
`;

const UserInfoWrapper = styled.div`
  background-color: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserPassword = styled.p`
  color: #555;
`;
