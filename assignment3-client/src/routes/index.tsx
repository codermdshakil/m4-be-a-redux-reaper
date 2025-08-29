
import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
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
        path: "create-book",
        Component: CreateBook,
      },
      {
        path: "books/:bookId",
        Component: BookDetails,
      },
      {
        path: "edit-book/:bookId",
        Component: EditBook,
      },
      {
        path: "borrow/:bookId",
        Component: BorrowBook,
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