import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../HOC/AppContextHOC";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    toggleModal = () => {
         this.setState(prevState => ({
        showModal: !prevState.showModal
       }));
    }

  render() {
    const { showModal, toggleModal } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
      
      <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalBody>
      <LoginForm updateSessionId={this.props.updateSessionId} />
      </ModalBody>
    </Modal>
    </div>
    );
  }
}

export default AppContextHOC(Login);

