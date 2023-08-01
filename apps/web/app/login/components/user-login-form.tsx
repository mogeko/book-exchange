"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/app/actions";

const formSchema = object({
  email: string().email({
    message: "Please enter a valid email address",
  }),
  password: string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const UserLoginForm: React.FC<
  {
    title: string;
    description: string;
  } & React.ComponentPropsWithoutRef<typeof Card>
> = ({ title, description, ...props }) => {
  const [_isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: zInfer<typeof formSchema>) => {
    startTransition(async () => {
      const redirect = searchParams.get("from") ?? void 0;
      const { error } = await login(values, redirect);

      toast({
        variant: "destructive",
        title: "Oooooops! Something went wrong.",
        description: error,
      });
    });
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Sign in</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
