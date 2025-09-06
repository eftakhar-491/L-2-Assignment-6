import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import "./App.css";

function App() {
  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;
