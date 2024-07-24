import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { Networks } from "./pages/Networks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/social",
    element: <Networks />,
  },
]);

export { router };
