import useQuery, { type Opts } from "@/lib/hooks/useQuery";

export function useUser(uid?: string, opts?: Opts<UserType>) {
  return useQuery<UserType>(uid ? `/api/users/${uid}` : null, {}, opts);
}

export type UsersType = {
  id: `${number}`;
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
