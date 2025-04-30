import React from 'react'
import s from './app.module.scss';
import { DataType } from './types';

type TableProps = {
   data: DataType[]
}

export const Table: React.FC<TableProps> = ({ data }) => (
   <div className={s.table}>
      <table className={s.chartTable}>
         <thead>
            <tr>
               <th>Name</th>
               <th>UV</th>
               <th>Z-score UV</th>
               <th>UV + 1std</th>
               <th>UV - 1std</th>
               <th>PV</th>
               <th>Z-score PV</th>
               <th>PV + 1std</th>
               <th>PV - 1std</th>
            </tr>
         </thead>
         <tbody>
            {data.map(({name, uv, pv, pv_z, uv_z, uv_plus_std, uv_minus_std, pv_plus_std, pv_minus_std}) => (
               <tr key={name}>
               <td>{name}</td>
               <td>{uv}</td>
               <td>{(uv_z.toFixed(2))}</td>
               <td>{(uv_plus_std.toFixed(2))}</td>
               <td>{(uv_minus_std.toFixed(2))}</td>
               <td>{pv}</td>
               <td>{pv_z.toFixed(2)}</td>
               <td>{(pv_plus_std.toFixed(2))}</td>
               <td>{(pv_minus_std.toFixed(2))}</td>
               </tr>
            ))}
         </tbody>
      </table>
   </div>
)
