import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function App() {
 const { toast } = useToast();
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              description: "Your message has been sent.",
            });
          }}
        >
          Show Toast
        </Button>
      </div>
      <Toaster/>
    </>
  );
}

export default App;
