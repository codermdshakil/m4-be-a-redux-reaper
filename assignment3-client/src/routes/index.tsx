
import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBookModal from "@/pages/BorrowBookModal";
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
        Component: BorrowBookModal,
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