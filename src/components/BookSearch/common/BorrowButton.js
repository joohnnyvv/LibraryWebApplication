import { Button } from "react-bootstrap";

import { RiBookMarkFill, RiHealthBookFill } from "react-icons/ri";
import styles from "../../styles/bookItem.module.css";
import UserBookManager from "../../../common/UserBookManager";
import { useState } from "react";
import BorrowBookModal from "../BorrowBookModal";

export default function BorrowButton({ rowStyles, book, isLibrarian }) {
  const userBookManager = new UserBookManager();

  const [isBookBorrowed, setIsBookBorrowed] = useState(
    userBookManager.isBorrowed(book.isbn13)
  );
  const [isBookReserved, setIsBookReserved] = useState(
    userBookManager.isReserved(book.isbn13)
  );

  const [showBorrowModal, setShowBorrowModal] = useState(false);

  const handleBorrowClick = (e) => {
    e.stopPropagation();
    setShowBorrowModal(true);
  };
  const handleReturnClick = (e) => {
    e.stopPropagation();
  };
  const handleReserveClick = (e) => {
    e.stopPropagation();
    userBookManager.reserviseBook(book.isbn13);
    setIsBookReserved(true);
  };
  const handleCancelClick = (e) => {
    e.stopPropagation();
    userBookManager.cancelReservation(book.isbn13);
    setIsBookReserved(false);
  };

  const onHide = (e) => {
    e.stopPropagation();
    setShowBorrowModal(false);
  };

  return (
    <>
      <div className={rowStyles}>
        <Button
          onClick={
            isBookReserved
              ? (e) => handleCancelClick(e)
              : (e) => handleReserveClick(e)
          }
          variant="primary"
          className={`${styles.borrowButton} button-radius`}
        >
          <div className={styles.buttonTextWrapper}>
            {isBookReserved ? "Cancel Reservation" : "Reserve"}{" "}
          </div>
          <RiBookMarkFill className={styles.buttonIcon} />
        </Button>
        {isLibrarian && (
          <Button
            onClick={
              isBookBorrowed
                ? (e) => handleReturnClick(e)
                : (e) => handleBorrowClick(e)
            }
            variant="success"
            className={`${styles.borrowButton} button-radius`}
          >
            {isBookBorrowed ? "Return" : "Borrow"}{" "}
            <RiHealthBookFill className={styles.buttonIcon} />
          </Button>
        )}
      </div>
      <BorrowBookModal show={showBorrowModal} onHide={onHide} book={book} />
    </>
  );
}
