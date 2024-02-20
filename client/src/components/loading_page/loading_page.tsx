export const LoadingPage = () => {
  return (
    <div className="bg-grid-white/[0.02] relative flex h-full w-full overflow-hidden  bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center  p-4 pt-20 md:pt-0">
        <h1 className="animate-bounce bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center font-logo text-4xl font-bold text-transparent md:text-7xl">
          SMASH ERROR
        </h1>
      </div>
    </div>
  );
};
