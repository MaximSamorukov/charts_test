import { Action, State } from "./types";

export const initialState = {
   uv: true,
   pv: true,
   uv_z_score: false,
   pv_z_score: false
 };
 
export const reducer = (state: State, action: Action) => {
   switch (action.type) {
     case 'ON':
       return {
         ...state,
         [action.key]: true,
       };
     case 'OFF':
       return {
         ...state,
         [action.key]: false,
       };
     default:
       return state;
   }
 }