import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
function App() {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <Button variant="outline" onClick={() => {
          toast("Event has been created.");
        }}>
          Show Toast
        </Button>
      </div>
      <Toaster />
    </>
  );
}

export default App;
