import { RecoilState, atom } from "recoil";

interface UserForm {
  name: string;
  password: string;
}

export const userFormState: RecoilState<UserForm[]> = atom({
  key: "userFormState",
  default: [] as UserForm[],
});

export const localDataState = atom({
  key: "localDataState",
  default: [],
});
