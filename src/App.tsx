import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DailyTracker from "./pages/DailyTracker";
import WeeklySummary from "./pages/WeeklySummary";
import Auth from "./pages/Auth";

import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <DailyTracker />,
          },
          {
            path: "/summary",
            element: <WeeklySummary />,
          },
        ],
      },
    ],
  },
]);

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
