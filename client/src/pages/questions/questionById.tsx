import { LoadingPage } from "@/components/loading_page/loading_page";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionById, voteQuestion, addAnswer } from "../api/questions.api";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { dateToText } from "@/utils/date.format";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { useStore } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const formSchema = z.object({
  answer: z.string().min(20, {
    message: "Answer must be at least 20 characters long.",
  }),
});

const QuestionById = () => {
  const { id } = useParams<{ id: string }>();
  const [answer, setAnswer] = React.useState("");
  const navigate = useNavigate();
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id ?? "0"),
  });
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

  const { user, token } = useStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["vote"],
    mutationFn: (voteType: "upvote" | "downvote") =>
      voteQuestion(
        data?.id ?? "0",
        voteType,
        user?.sub ?? "",
        token?.access_token ?? "",
      ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess() {
      refetch();
    },
  });

  const answerMutation = useMutation({
    mutationKey: ["answer"],
    mutationFn: (answer: string) =>
      addAnswer(
        data?.id ?? "0",
        user?.sub ?? "",
        answer,
        token?.access_token ?? "",
      ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess() {
      refetch();
      window.location.reload();
    },
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error occurred while fetching question.</div>;
  const upvote = data?.upvote.length ?? 0;
  const downvote = data?.downvote.length ?? 0;
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(form.getValues());
      answerMutation.mutate(values.answer);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }
  return (
    <div className="pb-10">
      <Navbar showBurger={false} />
      <div className="md:56 flex h-20 w-full items-center justify-end px-4 py-8">
        <Button
          className=""
          onClick={() => {
            navigate("/dashboard/ask");
          }}
        >
          Ask Question
        </Button>
      </div>
      <div className="px-4 md:px-56">
        <h1 className="text-3xl">{data?.title}</h1>
        <div className="flex w-full items-center justify-start">
          <p className="mt-3 text-xs">
            Asked{" "}
            <span className="font-bold">
              {dateToText(data?.createdAt ?? "")}
            </span>
          </p>
          <p className="ml-2 mt-3 text-xs">
            Modified{" "}
            <span className="font-bold">
              {dateToText(data?.updatedAt ?? "")}
            </span>
          </p>
        </div>
        <Separator className="mt-4" />
        <div className="prose flex">
          <div className="w-12 pt-4">
            {!isFetching && !isPending ? (
              <div className="flex flex-col items-center space-y-2">
                <ChevronUpCircle
                  className="cursor-pointer"
                  onClick={() => {
                    mutate("upvote");
                  }}
                  size={30}
                  {...(data?.upvote.find((u) => u === user?.sub)
                    ? {
                        className: "rounded-full bg-bgblack cursor-pointer",
                        color: "white",
                      }
                    : null)}
                />
                <span className="text-lg">{upvote - downvote}</span>
                <ChevronDownCircle
                  className="cursor-pointer"
                  onClick={() => {
                    mutate("downvote");
                  }}
                  size={30}
                  {...(data?.downvote.find((u) => u === user?.sub)
                    ? {
                        className: "rounded-full bg-bgblack cursor-pointer",
                        color: "white",
                      }
                    : null)}
                />
              </div>
            ) : (
              <Skeleton className="h-24 w-12 bg-gray-300" />
            )}
          </div>
          <div className="">
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="ml-4 mt-4 overflow-auto text-sm"
              children={data?.content}
            />
          </div>
        </div>
        <h1 className="ml-4 mt-5 text-2xl font-bold text-blue-700">
          Answer By AI
        </h1>
        <div className="">
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="ml-4 mt-4 overflow-auto text-sm"
            children={data?.aiAnswer}
          />
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 px-4 md:block
            "
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
        </div>
      </div>
    </div>
  );
};

export default QuestionById;
