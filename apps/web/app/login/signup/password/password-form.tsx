"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

import { decode } from "@/lib/base64";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/app/login/signup/password/password-actions";

const schema = object({
  email: string().email({
    message: "Please enter a valid email address",
  }),
  password: string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const UserPasswordForm: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const state = decode(searchParams.get("state") ?? "e30=");
  const { push } = useRouter();
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: JSON.parse(state),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    ({ email, password }: zInfer<typeof schema>) => {
      startTransition(async () => {
        const { error } = await register(email, password);

        if (!error) {
          push("/login/signup/username?" + searchParams.toString());
        } else {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error,
          });
        }
      });
    },
    [push, searchParams, startTransition, toast]
  );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
