import React, { useState, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ExperienceForm = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { updateContact
        // ,clearCurrent
        , current, contacts, loading } = contactContext;

    const [formData, setFormData] = useState({
        description: ''
    })
    const { description } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onClick = e => {
        setFormData({ ...formData, description: e._id })
        // console.log(e._id)
    }

    const onSubmitAdd = (e) => {
        e.preventDefault()
        // console.log(formData, 'formdata')
        formData._id = current._id
        updateContact(formData)
        // console.log(formData)

        setFormData({ description: '' })
    };


    const [removeFormData, setRemoveFormData] = useState({
        description: ''
    })

    const onRemoveChange = e => {
        setRemoveFormData({ ...removeFormData, [e.target.name]: e.target.value })
    }

    const onRemoveClick = e => {
        setRemoveFormData({ ...removeFormData, description: e._id })
    }

    const onSubmitRemove = (e) => {
        e.preventDefault()
        let cont = contact
        let thing = contact.experience.filter(item => item._id !== removeFormData.description)
        cont.experience = thing
        // removeFormData._id = current._id
        updateContact(cont)
        setRemoveFormData({ description: '' })
        // console.log(cont, 'cont')
        // console.log(thing, 'thing')
    };

    // console.log(formData)



    let filteredContacts        // opposite of below
    let adjustedContacts        // has the id of the current contact taken out
    let nestedContacts
    if (contacts !== null && contacts.length > 0 && !loading) {

        let arr = []
        contacts.forEach((contact) => {
            contact.experience.forEach(element => {
                arr.push(element)
            })
        })

        // nestedContacts = contacts.filter((item) => contact.experience.find(({ _id }) => item._id === _id));
        // nestedContacts = contacts.filter((item) => !arr.find(({ _id }) => item._id === _id));

        filteredContacts = contacts.filter((item) => !arr.find(({ _id }) => item._id === _id));
        if (current) {
            adjustedContacts = filteredContacts.filter((item) => {
                return !item._id.includes(current._id);
            });
            nestedContacts = contacts.filter((item) => current.experience.find(({ _id }) => item._id === _id));

        }


    }

    // console.log(adjustedContacts, 'adjustedContacts')
    // console.log(nestedContacts, 'nested contacts')

    // console.log(filteredContacts, 'filteredContacts')
    // console.log(adjustedContacts, 'adjustedContacts')
    // console.log(contacts, 'contacts')
    // console.log(contact.experience, 'contact experience')

    return (
        <>
            <form onSubmit={onSubmitAdd}>
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={onChange}
                    readOnly
                />
                <input
                    type="submit"
                    value={"Add"}
                    className="btn btn-primary btn-modal"
                />
                <div className="grid-2 mb-15">
                    {adjustedContacts && adjustedContacts.map((contact, index) =>
                        // {contacts.map((contact, index) =>
                        <div className="experience-form-headers">
                            {contact.link ? (
                                <img src={`https://www.google.com/s2/favicons?domain=${contact.link}`} />
                            ) : <span />}
                            <div style={{ background: 'inherit' }} className="card-title">
                                <h3 onClick={() => onClick(contact)} className="text-med text-left">
                                    <a>{contact.title}</a>
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </form>
            <form onSubmit={onSubmitRemove}>
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={removeFormData.description}
                    onChange={onRemoveChange}
                    readOnly
                />
                <input
                    type="submit"
                    value={"Remove"}
                    className="btn btn-primary btn-modal"
                />
                <div className="grid-3">
                    {nestedContacts && nestedContacts.map((contact, index) =>
                        // {contacts.map((contact, index) =>
                        <div className="card-header">
                            {contact.link ? (
                                <img src={`https://www.google.com/s2/favicons?domain=${contact.link}`} />
                            ) : <span />}
                            <div style={{ background: 'inherit' }} className="card-title">
                                <h3 onClick={() => onRemoveClick(contact)} className="text-med text-left">
                                    <a>{contact.title}</a>
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default ExperienceForm;
