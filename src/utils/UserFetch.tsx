import { useGetMeQuery } from "@/store/features/auth/auth.api";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/slice/authSlice";

import { useEffect } from "react";

const UserFetch = () => {
  const { data: user } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();
  console.log("UserFetch Rendered", user);

  useEffect(() => {
    if (user) {
      dispatch(setUser({ user: user?.data, token: user?.token ?? null }));
    }
  }, [user, dispatch]);

  return null;
};

export default UserFetch;
