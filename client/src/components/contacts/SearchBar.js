import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import DragNDrop from "../layout/DragNDrop"
import Card from "../layout/Card"

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <>
      <input
        className='searchbar'
        ref={text}
        type="text"
        placeholder="Search..."
        onChange={onChange}
      />
      {/* <div className="flexbox">

        <DragNDrop id={`board`} className='board'>

        </DragNDrop>


      </div> */}
    </>
  );
};

export default ContactFilter;
