"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const UserSignupForm: React.FC<
  {
    title: string;
    description: string;
  } & React.ComponentPropsWithoutRef<typeof Card>
> = ({ title, description, ...props }) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{/* TODO: Add form to create a new user */}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
