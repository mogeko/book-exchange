"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

import { encode } from "@/lib/base64";
import { cn } from "@/lib/utils";
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

const schema = object({
  email: string().email({
    message: "Please enter a valid email address",
  }),
});

export const UserSignupForm: React.FC<
  {
    searchParams: URLSearchParams;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, searchParams, ...props }) => {
  const router = useRouter();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (values: zInfer<typeof schema>) => {
      searchParams.set("state", encode(JSON.stringify(values), true));
      router.push("/login/signup/password?" + searchParams.toString());
    },
    [router, searchParams]
  );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
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
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
