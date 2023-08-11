import { configureStore  } from '@reduxjs/toolkit';
import pobeda from '../images/pobeda.svg';
import s7 from '../images/s7.svg';
import redwings from '../images/redwings.svg';

interface defaultState {
  id: number,
  from: string | null,
  to: string | null,
  company: string[],
  company_url: string[],
  price: number[],
  currency: string,
  time: number,
  duration: number[],
  date: number,
  connectionAmount: any[]
}

const defaultState = {
    id: [0],
    from: "SVO",
    to: "LED",
    company: ["Popeda", "S7 Airlines", "Red Wings"],
    company_url: [
      pobeda,
      s7,
      redwings,
      redwings,
      redwings,
    ],
    price: [18000, 50000, 73829, 99852, 86925],
    currency: 'Р',
    time: "TicketTime",
    duration: [0],
    date: [0],
    connectionAmount: [0, 1, 2, 3, 1],
  }
  
  const reducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case "ADD_ID" :
          return {...state, id: action.payload}
        case "ADD_FROM" :
          return {...state, from: state.from + action.payload}
        case "ADD_TO" :
          return {...state, to: state.to + action.payload}
        case "ADD_PRICE" :
            return {...state, price: action.payload}
        case "ADD_DURATION" :
          return {...state, duration: action.payload}
        case "ADD_DATE" :
          return {...state, date: action.payload}
        case "ADD_CONNECTION_AMOUNT" :
          return {...state, connectionAmount: action.payload}
  
      default:
         return state
  
    }
  }
  


export const store = configureStore({reducer});