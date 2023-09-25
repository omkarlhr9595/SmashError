import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query {
    getAllUsers {
      id
      username
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <h1>loading</h1>;
  if (error) return <h1>loading</h1>;
  if (data)
    return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <>
          <div className="h-screen">
            <ModeToggle />
            <h1>{data.getAllUsers[0]["id"]}</h1>
          </div>
        </>
      </ThemeProvider>
    );
}

export default App;
