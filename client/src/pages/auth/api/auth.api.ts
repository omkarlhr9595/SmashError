import { BASE_URL } from "@/utils/config";
import axios from "axios";

type User = {
  sub: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  email: string | undefined;
  picture: string | undefined;
  access_token: string | undefined;
};

const getUserDetails = async (data: User) => {
  const response = await axios.post(
    `${BASE_URL}/v1/oauth/getUserdetails`,
    {
      sub: data.sub,
      name: data.name,
      nickname: data.nickname,
      email: data.email,
      picture: data.picture,
    },
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    },
  );
  return response.data;
};

export { getUserDetails };
