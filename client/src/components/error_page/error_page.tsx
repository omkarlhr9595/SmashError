interface ErrorPageProps {
  message: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-bgwhite">
      <h1 className="text-4xl font-bold text-red-500">{message}</h1>
    </div>
  );
};
