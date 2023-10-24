"use client";

import { useCallback, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { array, object, string, type infer as zInfer } from "zod";

import { cn } from "@/lib/utils";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const schema = object({
  title: string({ required_error: "Please enter a title." }),
  subtitle: string().optional(),
  description: string().optional(),
  authors: array(object({ value: string() })).optional(),
  translators: array(object({ value: string() })).optional(),
  // cover: string().optional(),
  isbn: string().optional(),
  publisher: string().optional(),
  publisherLocation: string().optional(),
  publishedAt: string().optional(),
  series: string().optional(),
});

export const BookEditor: React.FC<
  {
    initialValues?: Partial<zInfer<typeof schema>>;
  } & React.HTMLAttributes<HTMLElement>
> = ({ initialValues, className, ...props }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<zInfer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const authors = useFieldArray({
    control: form.control,
    name: "authors",
  });
  const translators = useFieldArray({
    control: form.control,
    name: "translators",
  });

  const onSubmit = useCallback((data: zInfer<typeof schema>) => {
    startTransition(async () => {
      console.log(data); // TODO: Implement by calling API
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormGroup title="This Edition">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Book Title" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the title of this specific edition.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="subtitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Usually distinguished by different or smaller type. For
                  example: envisioning the next 50 years
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  A short description of the book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-4">
            <div>
              {authors.fields.map((field, index) => (
                <FormField
                  name={`authors.${index}.value`}
                  control={form.control}
                  key={field.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Authors
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Who wrote this book?
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => authors.append({ value: "" })}
              >
                Add author
              </Button>
            </div>
            <div>
              {translators.fields.map((field, index) => (
                <FormField
                  name={`translators.${index}.value`}
                  control={form.control}
                  key={field.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Translators
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Who translated this book?
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => translators.append({ value: "" })}
              >
                Add translator
              </Button>
            </div>
          </div>
        </FormGroup>
        <FormGroup title="Publishing Info">
          <FormField
            name="publisher"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who is the publisher?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  For example: Oxford University Press; Penguin; W.W. Norton
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="publisherLocation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where was the book published?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  City, Country please. For example: New York, USA; Sydney,
                  Australia
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="publishedAt"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>When was it published?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  You should be able to find this in the first few pages of the
                  book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="series"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Series Name (if applicable)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The name of the publisher's series. For example: The Story of
                  Civilization, Part III
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <Button type="submit">Update Book</Button>
      </form>
    </Form>
  );
};

const FormGroup: React.FC<
  { title: string } & React.HTMLAttributes<HTMLElement>
> = ({ children, title, ...props }) => {
  return (
    <div className="flex flex-col gap-4" {...props}>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <Separator />
      </div>
      {children}
    </div>
  );
};
