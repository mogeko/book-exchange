import useQuery from "@/lib/hooks/useQuery";

export function useUser(uid?: string) {
  return useQuery<UserType>(uid ? `/api/users/${uid}` : void 0);
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
