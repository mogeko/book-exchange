"use client";

import { useCallback, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

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
import { login } from "@/app/login/(signin)/signin-actions";

const schema = object({
  email: string().email({
    message: "Please enter a valid email address",
  }),
  password: string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const UserSigninForm: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const [_isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("from") ?? "/";
  const { toast } = useToast();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (values: zInfer<typeof schema>) => {
      startTransition(async () => {
        const { error } = await login(values, { redirect });

        toast({
          variant: "destructive",
          title: "Oooooops! Something went wrong.",
          description: error,
        });
      });
    },
    [searchParams, startTransition, toast]
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
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
