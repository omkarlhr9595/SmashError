import Navbar from "@/components/navbar/Navbar";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LoadingPage } from "@/components/loading_page/loading_page";
import { useMutation } from "@tanstack/react-query";
import { getUserDetails } from "../auth/api/auth.api";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "@/components/error_page/error_page";
import {
  HomePage,
  QuestionsPage,
  TagsPage,
  RoomsPage,
  MentorsPage,
  UsersPage,
} from "../index";
import { useStore } from "@/store/store";
import { Sidebar } from "@/components/sidebar/Sidebar";

const Dashboard: React.FC = () => {
  const { setToken, setUser } = useStore();
  const { getAccessTokenSilently, user } = useAuth0();
  const getAccessToken = async () => {
    const accessToken = await getAccessTokenSilently();
    if (user) {
      mutate({
        sub: user.sub,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        picture: user.picture,
        access_token: accessToken,
      });
    }
    setToken({ access_token: accessToken });
  };

  const { mutate, error, isPending } = useMutation({
    mutationFn: getUserDetails,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    getAccessToken();
  }, []);

  if (isPending) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-bgwhite">
      <Navbar />
      <div className="flex w-full flex-grow">
        {/* SideNav start */}
        <Sidebar />
        {/* SideNav end */}
        {/* Main Content start */}
        <div className="flex-grow overflow-scroll">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="tags" element={<TagsPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="mentors" element={<MentorsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <LoadingPage />,
});
