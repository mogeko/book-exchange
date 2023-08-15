"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (values: zInfer<typeof schema>) => {
      const base64 = encode(JSON.stringify(values), true);
      const params = new URLSearchParams(searchParams.toString());

      params.set("state", base64);
      router.push("/login/signup/password?" + params.toString());
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
