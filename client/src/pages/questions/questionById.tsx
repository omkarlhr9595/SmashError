import { LoadingPage } from "@/components/loading_page/loading_page";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionById } from "../api/questions.api";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { dateToText } from "@/utils/date.format";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
const QuestionById = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id ?? "0"),
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error occurred while fetching question.</div>;
  const upvote = data?.upvote ?? 0;
  const downvote = data?.downvote ?? 0;
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
            <div className="flex flex-col items-center space-y-2">
              <ChevronUpCircle size={30} />
              <span className="text-lg">{upvote - downvote}</span>
              <ChevronDownCircle size={30} />
            </div>
          </div>
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="ml-4 overflow-auto text-sm"
            children={data?.content}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionById;
