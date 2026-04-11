import { createHashRouter, RouterProvider } from "react-router-dom";
import DailyTracker from "./pages/DailyTracker";
import WeeklySummary from "./pages/WeeklySummary";

import Layout from "./components/Layout";

import Calendar from "./pages/Calendar";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DailyTracker />,
      },
      {
        path: "/day/:date",
        element: <DailyTracker />,
      },
      {
        path: "/summary",
        element: <WeeklySummary />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
