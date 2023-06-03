import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";
import {useHistory, useLocation} from "react-router-dom";

export default function InfoTooltip(props) {
  const history = useHistory();
  const location = useLocation();

  function redirectPopup() {
    if (props.status) {
        props.onClose()
        if (location.pathname === "/sign-up") {
            history.push("/sign-in")
        }
    }
    props.onClose();
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={props.id}>
        <div className="popup__container">
            <button type="button" className="popup__close" onClick={redirectPopup} />
            <div className="auth__info">
              {props.status ? (
                <>
                  <img src={success} alt="успешная иконка" className="auth__status-icon"/>
                  <p className="auth__status-text">Вы успешно зарегистрировались!</p>
                </>
              ) : (
                <>
                  <img src={error} alt="иконка ошибки" className="auth__status-icon" />
                  <p className="auth__status-text">Что-то пошло не так! Попробуйте ещё раз.</p>
                </>
              )}
            </div>
        </div>
    </div>
  )
}