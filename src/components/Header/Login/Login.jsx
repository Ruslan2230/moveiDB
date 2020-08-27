import React from "react";
import LoginModal from "./LoginModal";
import AppContextHOC from "../../HOC/AppContextHOC";


const Login = ({toggleLoginModal}) => (
    
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginModal}
        >
          Login
        </button>
        <LoginModal />
      </div>
  );

export default AppContextHOC(Login);

