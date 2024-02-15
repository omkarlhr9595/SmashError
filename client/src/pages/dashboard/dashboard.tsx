import React, { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LoadingPage } from "@/components/loading_page/loading_page";
import { useUserStore } from "@/store/user.store";

const Dashboard: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const { setUser } = useUserStore();

  const getUserMetadata = async () => {
    const domain = "smasherror-dev.us.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();
      console.log(user_metadata);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const setUserDetails = async () => {
    const token = await getAccessTokenSilently();
    if (user) {
      const userDetails = {
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
        sub: user.sub,
        updated_at: user.updated_at,
        authToken: token,
      };
      console.log(user);
      
      setUser(userDetails);
      getUserMetadata();
    }
  };

  useEffect(() => {
    setUserDetails();
    document.title = "Smash Error | Dashboard";
  }, []);
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
