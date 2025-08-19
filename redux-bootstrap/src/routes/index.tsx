import App from "@/App";
import NotFound from "@/pages/NotFound";
import Tasks from "@/pages/Tasks";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App/>,
    Component: App,
    children: [
      {
        path: "users",
        Component: Users,
      },
      {
        index: true, // that means this Tasks component will be show on root / 
        // path: "tasks",
        Component: Tasks,
      },
      {
        path: "tasks",
        Component: Tasks,
      },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default router;
