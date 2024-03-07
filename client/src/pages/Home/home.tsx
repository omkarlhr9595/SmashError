import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Filter, getAllQuestions } from "../api/questions.api";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionCardSkeleton } from "@/components/skeleton/questionCard.skeleton";
const HomePage: React.FC = () => {
  const [question, setQuestion] = React.useState<Question[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["questions", Filter.HIGHEST_VOTES],
    queryFn: () => getAllQuestions(Filter.HIGHEST_VOTES),
  });

  enum Tab {
    HOT = "hot",
    VOTES = "votes",
    VIEWS = "views",
    WEEK = "week",
  }
  const [tab, setTab] = React.useState(Tab.HOT);
  const navigate = useNavigate();
  const buttonVariant = (buttonTab: Tab) => {
    return tab === buttonTab ? "default" : "outline";
  };

  useEffect(() => {
    if (data) {
      setQuestion(data);
      console.log(data);
    }
  }, [data]);

  return (
    <div className="">
      <div className="flex h-20 w-full items-center justify-between px-4 py-8">
        <h1 className="text-2xl font-medium">Top Questions</h1>
        <Button
          className=""
          onClick={() => {
            navigate("ask");
          }}
        >
          Ask Question
        </Button>
      </div>
      <div className="flex h-20 w-full items-center justify-end px-4 pb-12 pt-8">
        <div className="flex w-full md:w-1/2">
          <Button
            onClick={() => setTab(Tab.HOT)}
            className="w-full rounded-e-none border-e-0"
            variant={buttonVariant(Tab.HOT)}
          >
            Hot
          </Button>
          <Button
            onClick={() => setTab(Tab.VOTES)}
            className="border-s-1 w-full rounded-e-none rounded-s-none border-e-0"
            variant={buttonVariant(Tab.VOTES)}
          >
            Votes
          </Button>
          <Button
            onClick={() => setTab(Tab.VIEWS)}
            className="border-s-1 w-full rounded-e-none rounded-s-none border-e-0"
            variant={buttonVariant(Tab.VIEWS)}
          >
            Views
          </Button>
          <Button
            onClick={() => setTab(Tab.WEEK)}
            className="border-s-1 w-full rounded-s-none"
            variant={buttonVariant(Tab.WEEK)}
          >
            Week
          </Button>
        </div>
      </div>
      <div className="divide-y border-y">
        {isLoading &&
          Array(6)
            .fill(0)
            .map((_, i) => <QuestionCardSkeleton key={i} />)}

        {question?.map((question: Question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className="p-4 md:px-24">
      <div className="flex">
        <div className="space-y-1">
          <p className="text-xs">{question?.vote} votes</p>
          <p className="text-xs">{question?.answer?.length} answers</p>
          <p className="text-xs">{question?.views} views</p>
        </div>
        <div className="ml-4">
          <Link to={`/question/${question?.id}`}>
            <h1 className="text-lg font-medium text-[#165BA2] hover:font-bold hover:underline">
              {question?.title}
            </h1>
          </Link>
          <div className="mt-1 flex w-full flex-wrap">
            {question?.tags.map((tag) => (
              <div className="m-1 rounded bg-bgblack px-2 py-1" key={tag}>
                <h1 className="text-sm font-light text-white">{tag}</h1>
              </div>
            ))}
            <Link
              to={`/profile/${question?.user?.sub}`}
              className="flex items-center justify-self-end"
            >
              <img
                src={question?.user?.picture}
                alt="user"
                className="m-1 size-6 rounded"
              />
              <h1 className="text-sm font-medium text-[#165BA2] hover:font-bold hover:underline">
                {question?.user?.name}
              </h1>
            </Link>
          </div>
          <p className="mt-2 text-xs">Asked on {question?.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
