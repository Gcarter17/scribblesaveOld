import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScribbleItem from "./ScribbleItem";
import Spinner from "../layout/Spinner";
import ContactContext from "../../context/contact/contactContext";
import DragNDrop from "../layout/DragNDrop"

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a Scribble</h4>;
  }


  let filteredContacts;
  if (contacts !== null && contacts.length > 0 && !loading) {

    let arr = []
    contacts.forEach((contact) => {
      contact.experience.forEach(element => {
        arr.push(element)
      })
    })
    // console.log(arr)

    filteredContacts = contacts.filter((item) => !arr.find(({ _id }) => item._id === _id));
  }

  // console.log(filteredContacts)

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {/* <DragNDrop id='board-20' className='board'> */}
          <div className="grid-3">
            {filtered !== null
              ? filtered.map((contact, index) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ScribbleItem contact={contact} index={index} />
                </CSSTransition>
              ))
              : filteredContacts.map((contact, index) => (
                // : contacts.map((contact, index) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ScribbleItem contact={contact} key={contact.title} index={index} />
                </CSSTransition>
              ))}


          </div>
          {/* </DragNDrop> */}
        </TransitionGroup>
      ) : (
          <Spinner />
        )}

    </Fragment>
  );
};

export default Contacts;
