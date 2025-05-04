import { fetchApi } from "./fetchApi";

export interface IUser {
  userId: number;
  access_token: string;
}

export const login = async (): Promise<IUser> =>
  fetchApi({
    endpoint: "/auth",
    method: "POST",
  });
