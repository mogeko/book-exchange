"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import { number, object, string, type infer as zInfer } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useComment, useLoginedUser } from "@/components/comment-context";
import { Link } from "@/components/link";
import { RatingStars } from "@/components/rating-stars";
import { setComment } from "@/app/(core)/book/[bid]/comment-actions";

const schema = object({
  content: string({
    required_error: "Please write down your thoughts about this book.",
  })
    .min(1)
    .max(1000),
  rate: number({
    required_error: "Please rating this book.",
  })
    .min(0)
    .max(10),
});

export const CommentEditor: React.FC<{ bid: number }> = ({ bid }) => {
  const { addComment } = useComment();
  const user = useLoginedUser();
  const [_, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const ratingLevels = useMemo(() => {
    return [
      ...["Perfect", "Great", "Very good", "Good", "Fine", "Average"],
      ...["Bad", "Very bad", "Horrible", "Appalling"],
    ];
  }, []);

  const onSubmit = useCallback(
    (data: zInfer<typeof schema>) => {
      addComment(data), setOpen(false);
      startTransition(async () => {
        if (user) {
          const { error } = await setComment(data, { uid: user.id, bid });

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
    [startTransition, addComment, user, bid, toast]
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-background hover:bg-accent hover:text-accent-foreground group m-3 flex h-full shrink-0 items-center justify-between gap-2 rounded-full border border-dashed p-3">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div className="group-hover:border-accent-foreground group-hover:text-accent-foreground border-input text-muted-foreground inline-flex h-9 flex-1 items-center justify-start rounded-full border px-3 text-sm">
            <LuPencil className="mr-2 h-4 w-4" />
            <span>Write a comment...</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Write down your thoughts about this book here.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value ? field.value.toString() : void 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a rating about this book" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ratingLevels.map((level, i) => (
                        <SelectItem
                          key={`rating-select-${i}`}
                          value={(10 - i).toString()}
                        >
                          <div className="inline-flex items-center justify-between">
                            <RatingStars rating={10 - i} />
                            <span className="ml-2">
                              {10 - i} - {level}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    placeholder="Any comments..."
                    className="resize-none"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
