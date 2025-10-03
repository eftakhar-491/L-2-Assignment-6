import { useGetMeQuery } from "@/store/features/auth/auth.api";

import { Navigate } from "react-router";
import Loading from "./Loading";

interface WithAuthProps {
  // Add props if needed in the future
}

interface WithAuthOptions {
  requiredRole?: string;
}

type ComponentType = React.FC;

const withAuth = (
  Component: ComponentType,
  requiredRole?: WithAuthOptions["requiredRole"]
): React.FC<WithAuthProps> => {
  return () => {
    console.log(requiredRole);
    const { data, isLoading } = useGetMeQuery(undefined);
    if (isLoading) {
      return <Loading data={isLoading} />;
    }
    if (!data?.data?.email) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && data?.data?.role !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }

    console.log("user", data);
    return <Component />;
  };
};

export default withAuth;
