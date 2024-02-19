import Navbar from "@/components/navbar/Navbar";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LoadingPage } from "@/components/loading_page/loading_page";
import { useMutation } from "@tanstack/react-query";
import { getUserDetails } from "../auth/api/auth.api";
import { useEffect } from "react";
import { useTokenStore } from "@/store/token.store";
import { useUserStore } from "@/store/user.store";
import { ErrorPage } from "@/components/error_page/error_page";

const Dashboard: React.FC = () => {
  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();
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
    <div className="h-screen w-full bg-bgwhite">
      <Navbar />
      <div className="h-[1px] w-full bg-gray-300"></div>
    </div>
  );
};
export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <LoadingPage />,
});
