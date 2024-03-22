import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { addAnswer } from "@/pages/api/questions.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as z from "zod";
interface PostAnswerProps {
  questionId: string;
  sub: string;
  access_token: string;
}
const formSchema = z.object({
  answer: z.string().min(20, {
    message: "Answer must be at least 20 characters long.",
  }),
});

export const PostAnswer: React.FC<PostAnswerProps> = ({
  questionId,
  sub,
  access_token,
}) => {
  const [answer, setAnswer] = React.useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  React.useEffect(() => {
    const watchedBody = form.watch().answer;
    if (watchedBody !== undefined) {
      setAnswer(watchedBody);
    } else {
      setAnswer("");
    }
  }, [form.watch().answer]);
  const answerMutation = useMutation({
    mutationKey: ["answer"],
    mutationFn: (answer: string) =>
      addAnswer(questionId, sub, answer, access_token),
    onError: (error) => {
      console.log(error);
    },
    onSuccess() {
      window.location.reload();
    },
  });

  function onSubmit(values: Record<string, string>) {
    try {
      console.log(form.getValues());
      answerMutation.mutate(values.answer);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 px-4 md:block"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <Card>
                <CardContent className="mt-5">
                  <FormLabel>Your answer to the question</FormLabel>
                  <FormDescription>
                    Provide an answer to the question.
                  </FormDescription>
                  <FormControl className="mt-2">
                    <Textarea
                      placeholder="use markdown to format your question."
                      {...field}
                      rows={10}
                    />
                  </FormControl>

                  {answer.length == 0 ? (
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
                        children={answer}
                      />
                    </div>
                  )}

                  <FormMessage className="mt-2" />
                </CardContent>
              </Card>
            </FormItem>
          )}
        />
        <Button type="submit">Post your answer</Button>
      </form>
    </Form>
  );
};
