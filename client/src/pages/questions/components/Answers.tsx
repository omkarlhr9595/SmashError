import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnswersByQuestionId, voteAnswer } from "@/pages/api/questions.api";
import { useStore } from "@/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface AnswersProps {
  questionId: string;
}
export const Answers: React.FC<AnswersProps> = ({ questionId }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => getAnswersByQuestionId(questionId),
  });

  const { user, token } = useStore();

  const { mutate } = useMutation({
    mutationKey: ["vote"],
    mutationFn: ({
      voteType,
      answerId,
    }: {
      voteType: "upvote" | "downvote";
      answerId: string;
    }) =>
      voteAnswer(
        answerId ?? "0",
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mx-4 py-3">
      <h1 className="my-3 ml-4 text-xl font-medium">Answers by users</h1>
      <div className="mx-4 space-y-4">
        {data.map((answer: Answer) => (
          <Card className="p-3" key={answer.id}>
            <div className="">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={answer.user.picture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className="">{answer.user.name}</h2>
              </div>
              <div className="prose flex gap-4">
                <div className="w-12 pt-6">
                  {/* {answer.upvote[0].sub} */}
                  {!isLoading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <ChevronUpCircle
                        className="cursor-pointer"
                        onClick={() => {
                          mutate({ voteType: "upvote", answerId: answer.id });
                          refetch();
                        }}
                        size={30}
                        {...(answer?.upvote.find((u) => u === user?.sub)
                          ? {
                              className:
                                "rounded-full bg-bgblack cursor-pointer",
                              color: "white",
                            }
                          : null)}
                      />
                      <span className="text-lg">
                        {answer.upvote.length - answer.downvote.length}
                      </span>
                      <ChevronDownCircle
                        className="cursor-pointer"
                        onClick={() => {
                          mutate({ voteType: "downvote", answerId: answer.id });
                          refetch();
                        }}
                        size={30}
                        {...(answer?.downvote.find((u) => u === user?.sub)
                          ? {
                              className:
                                "rounded-full bg-bgblack cursor-pointer",
                              color: "white",
                            }
                          : null)}
                      />
                    </div>
                  ) : (
                    <Skeleton className="h-24 w-12 bg-gray-300" />
                  )}
                </div>
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  className=" overflow-auto text-sm"
                  children={answer.content}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
