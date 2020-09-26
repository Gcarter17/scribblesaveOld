import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import MyEditor from "./RichEditor"
import ChildrenForm from "./ChildrenForm"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import RichTextEditor from 'react-rte'

const ContactForm = () => {

  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;
  // end of hooks INIT
  useEffect(() => {
    if (current !== null) {
      setContact(current);
      // setEditorValue(current.content)
      setEditorValue(RichTextEditor.createValueFromString(current.content, 'markdown'))
      // setEditorValue(RichTextEditor.createValueFromString(content, 'markdown'))

    } else {
      setContact({
        title: "",
        link: "",
        content: "",
        checked: false,
        favorite: false
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    title: "",
    link: "",
    content: "",
    checked: false,
    favorite: false,
  });

  const { title, link, content, checked, favorite, experience } = contact;

  const onChange = (e) => { // normal input onChange
    if (e.target.type !== "checkbox") {
      setContact({ ...contact, [e.target.name]: e.target.value }); // takes the contact object (value as is) and adds target value to target name

    } else if (e.target.type) {
      setContact({ ...contact, [e.target.name]: e.target.checked })

    }
  };

  const onValueChange = (e) => {  // code editor onChange
    setContact({ ...contact, content: e });
  }

  const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(content, 'html'));

  const handleChange = value => { // react rte onChange
    setEditorValue(value);
    setContact({ ...contact, content: value.toString('markdown') })
  };

  const checkedChange = (e) => {
    setContact({ ...contact, checked: e.target.checked })
    // console.log(!checked)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(contact)
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
    setEditorValue(RichTextEditor.createEmptyValue())
  };





  // let arr = []
  // const pushIt = () => {
  //   matches.props.children.forEach((element, index) => {
  //     // arr.push({
  //     //   title: element.props.children,
  //     //   link: element.props.HREF,
  //     //   content: index,
  //     //   favorite: false
  //     // })
  //     addContact({
  //       title: element.props.children,
  //       link: element.props.HREF,
  //       content: index,
  //       favorite: false
  //     })
  //   })
  // }



  return (
    <>
      {/* <span onClick={pushIt}>hello</span> */}
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">
          {current ? "Edit Scribble" : "Add Scribble"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          value={link}
          onChange={onChange}
        />
        {/* <OnOffBtn isChecked={check} /> */}
        <div class="onOffButton">
          <input checked={checked} onChange={checkedChange} type="checkbox" class="checkbox" />
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
        {/* <textarea
          type="text"
          placeholder="Content"
          name="content"
          value={content}
          onChange={onChange}
        /> */}
        <RichTextEditor
          value={editorValue}
          onChange={handleChange}
          required
          type="string"
          variant="filled"
          // style={{ minHeight: 410 }}
          className={checked && 'contact-rte'}
        />
        <Editor
          value={content}
          onValueChange={onValueChange}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border: '1px solid #ccc'
          }}
          className={!checked && 'contact-rte'}
        />
        <label
          htmlFor={`id-of-input`}
          className={`${favorite ? "fas gold" : "far grey"} fa-star custom-checkbox`}
        >
          <input
            hidden
            id={`id-of-input`}
            type="checkbox"
            name="favorite"
            onClick={onChange}
            checked={favorite}
          />
          <input
            hidden
            type="checkbox"
            name="favorite"
            // onClick={onChange}
            checked={!favorite}
          />
        </label>
        {!current && <input
          style={{ display: 'block', margin: '0 auto' }}
          type="submit"
          value={"Add Scribble"}
          className="btn btn-primary"
        />}

        {current && (
          <div className='children-inline'>
            <input
              type="submit"
              value={current ? "Update Scribble" : "Add Scribble"}
              className="btn btn-primary"
            />
            <button className="btn btn-light" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}


      </form>
      {current && <ChildrenForm contact={contact} />}
    </>
  );
};

export default ContactForm;
