import { useQuery } from "@tanstack/react-query";
import useAxios from "../UseAxios/useAxios";
import useAuth from "../UseAuth/useAuth";

const useCurrentUserInfo = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const { data: userInfo=[],isLoading,refetch } = useQuery({
    queryKey: ["userInfo",user],
    queryFn: async () => {
      const response = await axios.get(`/user?email=${user?.email}`);
      return response.data;
    },
  });
  return { userInfo,isLoading,refetch };
};

export default useCurrentUserInfo;
