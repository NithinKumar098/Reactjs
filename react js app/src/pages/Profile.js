import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "../components/modal/Modal";
import Button from "../components/button/Button";
import SettingsIcon from "../svg/settings";
import { users } from "../staticData/usersData";

function Profile(props) {
  const [showModal, setShowModal] = useState(false);

  const userData = users[0];
  const history = useHistory();

  const profileHandler = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const profileEditHandler = () => {
    history.push({
      pathname: '/profile/settings',
      search: `?name=${userData.name}`,
      state: { userInfo: userData }
    })
  }

  return (
    <Fragment>
      <div style={{ "textAlign": "center", "padding": "0 3rem" }}>
        <h1>Take a look at your profile...!</h1>
        <hr />
      </div>
      <div className="cards">
        <div className="card" style={{ "position": "relative" }}>
          <img
            src={userData.profilePic}
            alt=""
          />
          <div
            style={{ "position": "absolute", "top": "10px", "right": "12px" }}
            onClick={profileEditHandler}
          >
            <SettingsIcon />
          </div>
          <h3 style={{ "marginBottom": "1px" }}>{userData.name}</h3>
          <small>{userData.email}</small>

          <div style={{ "margin": "0 20%" }}>
            <Button
              buttonText="View More"
              onClick={profileHandler}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal closeModal={handleCloseModal}>
          <div>
            <img
              width="70"
              height="70"
              src={userData.profilePic}
              alt=""
            />
            <h3
              style={{ "marginBottom": "1px" }}
            >
              {userData.name}
            </h3>
            <p style={{ "marginTop": "1px", "fontSize": "14px" }}>
              {userData.email}
            </p>
            <p>DOB: {userData.dob}</p>
            <p>Hi! I am Nithin.I am very happy to be a part of CTS Family.</p>

            <div style={{ "margin": "0 40%" }}>
              <Button
                buttonText="Edit"
                onClick={profileEditHandler}
              />
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  )
}

export default Profile;