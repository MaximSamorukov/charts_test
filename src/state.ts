import { Action, State } from "./types";

export const initialState = {
   uv: true,
   uv_z_score: false,
   pv: true,
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
      if (action.key === 'pv') {
        return {
          ...state,
          pv: false,
          pv_z_score: false,
        }
      }
      if (action.key === 'uv') {
        return {
          ...state,
          uv: false,
          uv_z_score: false,
        }
      }
       return {
         ...state,
         [action.key]: false,
       };
     default:
       return state;
   }
 }