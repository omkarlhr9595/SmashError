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
import Markdown from "react-markdown";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import z from "zod";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import { Tag, TagInput } from "@/components/ui/tag-input";

const formSchema = z.object({
  title: z.string().min(15, {
    message: "Title must be at least 15 characters long.",
  }),
  body: z.string().min(20, {
    message: "Body must be at least 20 characters long.",
  }),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    )
    .min(1, {
      message: "At least one tag is required.",
    }),
});

const AskPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [body, setBody] = React.useState<string>("");
  const [tags, setTags] = React.useState<Tag[]>([]);
  React.useEffect(() => {
    if (form.watch().body) setBody(form.watch().body);
    else setBody("");
  }, [form.watch().body]);

  return (
    <div className="mb-20">
      <div className="flex h-20 w-full px-4 py-8">
        <h1 className="text-2xl font-medium">Ask Question</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 px-4 md:block"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Card>
                  <CardContent className="mt-5">
                    <FormLabel>Title</FormLabel>
                    <FormDescription>
                      Be specific and imagine you're asking a question to
                      another person.
                    </FormDescription>
                    <FormControl className="mt-2">
                      <Input
                        placeholder="e.g. is React concepts are required to learn Nex.js?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <Card>
                  <CardContent className="mt-5">
                    <FormLabel>What are the details of your problem?</FormLabel>
                    <FormDescription>
                      Include all the information someone would need to answer
                      your question.
                    </FormDescription>
                    <FormControl className="mt-2">
                      <Textarea
                        placeholder="use markdown to format your question."
                        {...field}
                        rows={10}
                      />
                    </FormControl>

                    {body.length == 0 ? (
                      <Textarea
                        className="mt-2 resize-none"
                        placeholder="markdown output"
                        readOnly
                      />
                    ) : (
                      <div className="prose mt-2 w-full max-w-full rounded-md border px-3 py-3">
                        <Markdown
                          remarkPlugins={[remarkGfm]}
                          className="overflow-auto text-sm"
                          children={body}
                        />
                      </div>
                    )}

                    <FormMessage className="mt-2" />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <Card>
                  <CardContent className="mt-5">
                    <FormLabel className="text-left">Topics</FormLabel>
                    <FormDescription>
                      These are the topics that you're interested in.
                    </FormDescription>
                    <FormControl>
                      <TagInput
                        {...field}
                        placeholder="Enter a topic"
                        tags={tags}
                        className="sm:min-w-[450px]"
                        setTags={(newTags) => {
                          setTags(newTags);
                          form.setValue("tags", newTags as [Tag, ...Tag[]]);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AskPage;
