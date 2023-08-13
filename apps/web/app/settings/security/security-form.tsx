"use client";

import { useCallback, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { update } from "@/app/settings/security/security-action";

const schema = object({
  currentPassword: string({
    required_error: "You must provide a password to update your account.",
  }).min(8, {
    message: "You have entered an invalid password.",
  }),
  newPassword: string().min(8, {
    message: "Your new password must be at least 8 characters long.",
  }),
  confirmNewPassword: string({
    required_error: "You must confirm your new password.",
  }),
})
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Your new password cannot be the same as your current password.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const SecurityForm: React.FC<{ uid: number }> = ({ uid }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = useCallback(
    (data: SecurityFormValues) => {
      startTransition(async () => {
        const { error } = await update(uid, data);

        if (!error) {
          toast({ description: "✅ Your password has been updated" });
        } else {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error,
          });
        }
      });
    },
    [startTransition, toast, uid]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-1">
          <FormDescription>
            Make sure it&apos;s at least 8 characters including a number and a
            lowercase letter.
          </FormDescription>
          <Button type="submit">Update Password</Button>
        </div>
      </form>
    </Form>
  );
};

export type SecurityFormValues = zInfer<typeof schema>;
