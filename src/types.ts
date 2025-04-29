export type State = {
   uv: boolean,
   pv: boolean,
   uv_z_score: boolean,
   pv_z_score: boolean
 }
export type Action =
  | { type: 'ON'; key: keyof State }
  | { type: 'OFF'; key: keyof State };