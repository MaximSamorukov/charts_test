export type State = {
   uv: boolean,
   pv: boolean,
   uv_z_score: boolean,
   pv_z_score: boolean
 }
export type Action =
  | { type: 'ON'; key: keyof State }
  | { type: 'OFF'; key: keyof State };

export type DataType = {
  uv: number,
  pv: number,
  uv_z: number,
  pv_z: number,
  pv_plus_std: number,
  uv_plus_std: number,
  pv_minus_std: number,
  uv_minus_std: number,
  uv_mean: number,
  pv_mean: number,
  name: string,
}