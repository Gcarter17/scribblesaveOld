import React, { useContext } from "react";
import Modal from "react-modal";
import ContactForm from "../forms/ContactForm"
import ContactContext from "../../context/contact/contactContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: 'scroll',
    maxHeight: '100vh',
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% - 40px)",
    // width: "calc(100% - 80px)",
    // width: '100vw',
    maxWidth: "700px",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const Mode = () => {
  const contactContext = useContext(ContactContext);
  const { current, clearCurrent } = contactContext;
  // end of hooks INIT

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const modalOpen = () => {
    // component level model opening
    setIsOpen(true);
  };

  // let arr = document.getElementsByClassName("btn-dark");
  // for (var i = 0; i < arr.length; i++) {
  //   arr[i].addEventListener("click", function () {
  //     modalOpen();
  //   });
  // }

  if (current) {
    setTimeout(() => {
      modalOpen()
    }, 0);
  }

  const closeModal = () => {
    setIsOpen(false);
    clearCurrent()
  };
  return (
    <>
      <span
        onClick={modalOpen}
        className="fa-stack fixed-activate"
      >
        <i className=" fa fa-circle plus-red  fa-stack-2x"></i>
        <i className=" fa fa-plus fa-stack-1x plus-med fa-inverse"></i>
      </span>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="close-btn" onClick={closeModal}>
          <i className="times-red fas fa-times"></i>
        </span>
        <div className="form-container">
          <ContactForm />
        </div>
      </Modal>
    </>
  );
};

export default Mode;
