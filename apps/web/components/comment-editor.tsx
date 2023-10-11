"use client";

import { useCallback, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, type infer as zInfer } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useComment, useLoginedUser } from "@/components/comment-context";
import { Link } from "@/components/link";

const schema = object({
  content: string({ required_error: "Please write down any comments." })
    .min(1)
    .max(1000),
});

export const CommentEditor: React.FC<{
  action: (context: string, uid: number) => Promise<any>;
  uid: number;
}> = ({ action, uid }) => {
  const { addComment } = useComment();
  const user = useLoginedUser();
  const [_, startTransition] = useTransition();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const onSubmit = useCallback(
    ({ content }: zInfer<typeof schema>) => {
      addComment({ content });
      startTransition(async () => {
        if (user) {
          const { error } = await action(content, uid);

          if (error) {
            toast({
              variant: "destructive",
              title: "Oooooops! Something went wrong.",
              description: error,
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: "Please sign in or sign up first.",
          });
        }
      });
    },
    [startTransition, addComment, user, toast, action]
  );

  if (!user) {
    return (
      <div className="m-3 flex flex-row items-center justify-center p-3">
        <Link href="/login">Sign in</Link>
        <span className="mx-2"> or </span>
        <Link href="/login/signup">Sgin up</Link>
        <span className="ml-2"> to add your comment.</span>
      </div>
    );
  }

  return (
    <div className="m-3 flex flex-row items-start justify-start p-2">
      <div className="mr-2">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form
          className="flex flex-1 flex-col items-start justify-start gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="self-stretch">
                <Textarea
                  placeholder="Any comments..."
                  className="resize-none"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
