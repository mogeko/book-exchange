import useQuery, { type Opts } from "@/lib/hooks/useQuery";

function useUsers(param: ParamProps = {}, opts?: Opts<UsersType>) {
  return useQuery<UsersType>("/api/users", param, opts);
}

export function useUser(uid?: string, opts?: Opts<UserType>) {
  return useQuery<UserType>(uid ? `/api/users/${uid}` : null, {}, opts);
}

interface ParamProps {
  limit?: number;
  page?: number;
}

export type UsersType = {
  uid: `${number}`;
  avatar: string;
  username: string;
  fullname: string;
  description: string;
  email: string;
}[];

export type UserType = {
  city: string;
  birthdate: string;
} & UsersType[0];

export default useUsers;
