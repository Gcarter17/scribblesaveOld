import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from "../types";

// case FILTER_CONTACTS:
//       return {
//         ...state,
//         filtered: state.contacts.sort((a, b) => (a.favorite > b.favorite) ? -1 : 1),
//       };
// ------------ filters favorites to be first
// const func = () => {
//   let placeHolder = ["5ecc0f9045ba2e6894a3dc23", "5ecc10c50371012344e8c68e", "5ecc10c50371012344e8c68f"]

// const func = () => {
//   let contactsArr = []
//   contactsArr = contacts.map((item) => {
//     return item._id
//   })

//   let arr = []
//   contacts.forEach((contact) => {
//     contact.experience.forEach(element => {
//       arr.push(element._id)
//     })
//   })
//   // console.log(arr)
//   contactsArr = contactsArr.filter((item) => {
//     return !arr.includes(item)
//   })
//   console.log(contactsArr) //contactsArr is now filtered from what was in the "experience" arrays

// }
// func()

export default (state, action) => {

  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        // contacts: action.payload.sort((a, b) => a.date - b.date), // sorts based on date
        contacts: action.payload,
        // contacts: r.sort((a, b) => a.date - b.date),
        // contacts:action.payload  doesn't offer any sorting except order in which they're organized in DB
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case UPDATE_CONTACT:

      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };


    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.title.match(regex) || contact.content.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

