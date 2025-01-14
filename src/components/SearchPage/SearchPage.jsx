import BookList from "./Common/BookList";
import BookListEmptyView from "./EmptyView/BookListEmptyView"
import BeforeSearchView from "./Common/BeforeSearchView";
import NavBar from "../UiCommon/NavBar";
import { useState } from "react";
import BookManager from "../../common/BooksManager";

export default function SearchPage() {
  const [books, setBooks] = useState([]);
  const [isQueryEntered, setIsQueryEntered] = useState(false);

  const handleSearchSubmit = (query) => {
    const allBooks = (new BookManager()).getBooks();
    if (query.length >= 2) {
      const result = allBooks.filter((item) => {
        return query === ""
          ? item
          : item.title.toString().toLowerCase().includes(query.toLowerCase());
      });
      setBooks(result);
      setIsQueryEntered(true);
    } else {
      setBooks([]);
      setIsQueryEntered(false);
    }
  };

  return (
    <>
      <NavBar
        onSubmit={handleSearchSubmit}
        showSearchBar={true}
        initialExpand={true}
        searchAutoFocus={true}
        currentPage="none"
      />
      {isQueryEntered ? (
        books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <BookListEmptyView />
        )
      ) : (
        <BeforeSearchView />
      )}
    </>
  );
}
