import { getAnswersByQuestionId } from "@/pages/api/questions.api";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface AnswersProps {
  questionId: string;
}
export const Answers: React.FC<AnswersProps> = ({ questionId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => getAnswersByQuestionId(questionId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((answer: Answer) => (
        <div className="prose">
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="ml-4 mt-4 overflow-auto text-sm"
            children={answer.content}
          />
        </div>
      ))}
    </div>
  );
};
