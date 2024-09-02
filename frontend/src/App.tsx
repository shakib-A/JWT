import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
