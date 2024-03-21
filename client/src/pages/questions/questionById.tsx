import { LoadingPage } from "@/components/loading_page/loading_page";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionById, voteQuestion } from "../api/questions.api";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { dateToText } from "@/utils/date.format";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionById = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch, isFetched, isFetching } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id ?? "0"),
  });

  const { user, token } = useStore();
  const { mutate, isPending, isSuccess } = useMutation({
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

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error occurred while fetching question.</div>;
  const upvote = data?.upvote.length ?? 0;
  const downvote = data?.downvote.length ?? 0;

  return (
    <div>
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
        <h1 className="mt-5 text-2xl font-bold text-blue-700">Answer By AI</h1>
        <Markdown
          remarkPlugins={[remarkGfm]}
          className=""
          children={data?.aiAnswer}
        />
      </div>
    </div>
  );
};

export default QuestionById;
