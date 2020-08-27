import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../../HOC/AppContextHOC";


const LoginModal = ({ showLoginModal, toggleLoginModal, updateSessionId }) => (
    
    <div>
        <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
            <ModalBody>
                <LoginForm updateSessionId={updateSessionId} />
             </ModalBody>
        </Modal>
        </div>
        );
    
    export default AppContextHOC(LoginModal);





