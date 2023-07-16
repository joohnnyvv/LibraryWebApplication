import { Button, Spinner } from "react-bootstrap";
import { RiBookMarkFill, RiHealthBookFill } from "react-icons/ri";
import styles from "../../styles/bookItem.module.css";
import UserBookManager from "../../../common/UserBookManager";
import { useState } from "react";

export default function BorrowButton({ rowStyles, book, isLibrarian, onBorrowBookClicked }) {
  const userBookManager = new UserBookManager();

  const [isBookReserved, setIsBookReserved] = useState(userBookManager.isReserved(book.isbn13));
  const [isLoading, setIsLoading] = useState(false);

  const isBookBorrowed = userBookManager.isBorrowed(book.isbn13);

  const handleBorrowClick = (e) => {
    e.stopPropagation();
    onBorrowBookClicked();
  };

  const handleReserveClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await userBookManager.reserviseBook(book.isbn13);
      setIsBookReserved(true);
    } catch (error) {
      console.log("Error:", error);
    }
    setIsLoading(false);
  };

  const handleCancelClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await userBookManager.cancelReservation(book.isbn13);
      setIsBookReserved(false);
    } catch (error) {
      console.log("Error:", error);
    }
    setIsLoading(false);
  };

  return (
      <div className={rowStyles}>
        <Button
            onClick={isBookReserved ? handleCancelClick : handleReserveClick}
            variant="primary"
            className={`${styles.borrowButton} button-radius`}
            disabled={isBookBorrowed}
        >
          {isLoading ? (
              <>
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                <span>Loading...</span>
              </>
          ) : (
              <div className={styles.buttonTextWrapper}>
                {isBookReserved ? "Cancel Reservation" : "Reserve"} <RiBookMarkFill className={styles.buttonIcon} />
              </div>
          )}
        </Button>
        {isLibrarian && (
            <Button
                onClick={(e) => handleBorrowClick(e)}
                variant="success"
                className={`${styles.borrowButton} button-radius`}
            >
              Lend <RiHealthBookFill className={styles.buttonIcon} />
            </Button>
        )}
      </div>
  );
}
