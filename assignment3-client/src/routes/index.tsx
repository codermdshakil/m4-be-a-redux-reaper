
import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import NotFoundPage from "@/pages/NotFoundPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App/>,
    Component: App,
    children: [
      {
        index:true,
        path: "books",
        Component: Books,
      },
      {
        path: "books/:bookId",
        Component: BookDetails,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default router;