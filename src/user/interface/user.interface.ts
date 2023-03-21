export type Gender = 'Male' | 'Female';
export interface userCreate {
  userId: string;
  name: string;
  password: string;
  age: number;
  gender: Gender;
}
