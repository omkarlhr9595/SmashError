import { Button } from "@/components/ui/button";
import React from "react";

const HomePage: React.FC = () => {
  enum Tab {
    HOT = "hot",
    VOTES = "votes",
    VIEWS = "views",
    WEEK = "week",
  }
  const [tab, setTab] = React.useState(Tab.HOT);
  const buttonVariant = (buttonTab: Tab) => {
    return tab === buttonTab ? "default" : "outline";
  };
  type Question = {
    title: string;
    body: string;
    tags: string[];
    votes: number;
    answers: number;
    views: string;
    created: string;
    closed: boolean;
    user: {
      name: string;
      avatar: string;
    };
  };

  const dummyQuestions: Question[] = [
    {
      title: "How to use React?",
      body: "I am new to React and I want to know how to use it.",
      tags: ["react", "javascript"],
      votes: 10,
      answers: 5,
      views: "100",
      created: "2021-10-10",
      closed: false,
      user: {
        name: "John Doe",
        avatar: "https://secure.gravatar.com/avatar/321?s=164&d=identicon",
      },
    },
    {
      title: "How to use Figma?",
      body: "I am new to Figma and I want to know how to use it.",
      tags: ["figma", "design"],
      votes: 53,
      answers: 5,
      views: "1k",
      created: "2021-10-10",
      closed: false,
      user: {
        name: "Ajay Lohar",
        avatar: "https://secure.gravatar.com/avatar/omkar?s=164&d=identicon",
      },
    },
    {
      title: "How to use Tailwind CSS?",
      body: "I am new to Tailwind CSS and I want to know how to use it.",
      tags: ["tailwindcss", "css"],
      votes: 10,
      answers: 5,
      views: "100",
      created: "2021-10-10",
      closed: false,
      user: {
        name: "Naresh Bhatia",
        avatar: "https://secure.gravatar.com/avatar/321321?s=164&d=identicon",
      },
    },
    {
      title: "How to use Flutter?",
      body: "I am new to Flutter and I want to know how to use it.",
      tags: ["flutter", "dart"],
      votes: 131,
      answers: 5,
      views: "10k",
      created: "2021-10-10",
      closed: false,
      user: {
        name: "Sarthak Sharma",
        avatar: "https://secure.gravatar.com/avatar/32132?s=164&d=identicon",
      },
    },
    {
      title: "How to get started with GraphQL?",
      body: "I am new to GraphQL and I want to know how to use it.",
      tags: ["graphql", "javascript"],
      votes: 10,
      answers: 5,
      views: "100",
      created: "2021-10-10",
      closed: false,
      user: {
        name: "John Doe",
        avatar: "https://secure.gravatar.com/avatar/321?s=164&d=identicon",
      },
    },
    {
      title: "How to get started with GraphQL?",
      body: "I am new to GraphQL and I want to know how to use it.",
      tags: ["graphql", "javascript"],
      votes: 10,
      answers: 5,
      views: "100",
      created: "2021-10-10",
      closed: false,
      user: {
        name: "John Doe",
        avatar: "https://secure.gravatar.com/avatar/321?s=164&d=identicon",
      },
    },
  ];

  return (
    <div className="">
      <div className="flex h-20 w-full items-center justify-between px-4 py-8">
        <h1 className="text-2xl font-medium">Top Questions</h1>
        <Button className="">Ask Question</Button>
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
        {dummyQuestions.map((question, index) => {
          return (
            <div
              key={index}
              className="flex w-full items-center justify-between px-4 py-8 md:px-40"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={question.user.avatar}
                    alt="user"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-4">
                    <h1 className="text-lg font-medium">{question.title}</h1>
                    <p className="text-sm text-gray-500">
                      {question.user.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">
                    {question.votes} votes
                  </p>
                  <p className="ml-4 text-sm text-gray-500">
                    {question.answers} answers
                  </p>
                  <p className="ml-4 text-sm text-gray-500">
                    {question.views} views
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
