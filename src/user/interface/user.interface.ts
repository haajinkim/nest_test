export enum Gender {
  MALE,
  FEMALE,
}

export interface userCreate {
  userId: string;
  name: string;
  password: string;
  age: number;
  gender: Gender;
}
