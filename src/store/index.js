import { configureStore  } from '@reduxjs/toolkit';

const defaultState = {
    id: 1,
    from: "select",
    to: "select2",
    company: ["Popeda", "S7 Airlines", "Red Wings"],
    price: [],
    currency: 'RUB',
    time: "TicketTime",
    duration: "number",
    date: "string",
    connectionAmount:" number | null",
  }
  
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_ID" :
          return {...state, id: state.id + action.payload}
        case "ADD_FROM" :
          return {...state, from: state.from + action.payload}
        case "ADD_TO" :
          return {...state, to: state.to + action.payload}
        case "ADD_PRICE" :
            return {...state, price: state.price + action.payload}
  
      default:
         return state
  
    }
  }
  


export const store = configureStore({reducer});