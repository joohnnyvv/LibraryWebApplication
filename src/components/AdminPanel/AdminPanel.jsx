import { Button, Container } from "react-bootstrap";
import UserListItem from "./Common/UserListItem";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import styles from "../styles/adminPanel.module.css";
import UserManager from "../../common/UserManager";
import AddEditUserDialog from "./Dialogs/AddEditUserDialog";
import NavBar from "../UiCommon/NavBar";
import NavBarPagesEnum from "../UiCommon/NavBarPagesEnum";

function AdminPanel() {
  const userManager = new UserManager();

  const [modalAddShow, setModalAddShow] = useState(false);
  var [users, setUsers] = useState(userManager.getUsers())
  window.addEventListener('storage', (storageEvent) => {
    setUsers(userManager.getUsers());
  })
  const userItems = users.map((user) => <UserListItem key={user.id.toString()} user={user} styles={styles} />);
  return (
    <>
      <div className="background-color">
        <NavBar showSearchBar={false} currentPage={NavBarPagesEnum.adminPanel} />
        <div className={styles.adminPanelHeader}>
          <h4>Admin Panel</h4>
        </div>
        <br />
        <div className="background-color d-flex flex-wrap justify-content-center">
          {userItems}
        </div>
        <Container style={{ height: 70 }}></Container>
        <Button className={styles.adminPanelFab} onClick={() => setModalAddShow(true)}><IoMdAdd style={{ height: 24, width: 24 }} /></Button>

        <AddEditUserDialog
          show={modalAddShow}
          onHide={() => setModalAddShow(false)}
        />
      </div>
    </>
  )
}

export default AdminPanel;