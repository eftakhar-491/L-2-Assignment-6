import { useAppDispatch } from "@/store/hook";

const getUserInLocal = () => {
  const dispatch = useAppDispatch();
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "auth/login", payload: JSON.parse(user) });
      return;
    }
    return null;
  }
};

export default getUserInLocal;
