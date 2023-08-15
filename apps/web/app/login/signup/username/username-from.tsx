"use client";

import { useCallback, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setUsername } from "@/app/login/signup/username/username-actions";

const schema = object({
  username: string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(32, {
      message: "Name must be at most 32 characters",
    }),
});

export const UserUsernameFrom: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("from") ?? "/";
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    ({ username }: zInfer<typeof schema>) => {
      startTransition(async () => {
        const { error } = await setUsername(username);

        if (!error) {
          push(redirect);
        } else {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error,
          });
        }
      });
    },
    [startTransition, redirect, toast, push]
  );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={!form.formState.isValid} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={redirect}
        >
          Set it up later
        </Link>
      </div>
    </div>
  );
};
