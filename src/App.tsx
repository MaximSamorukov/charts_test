import React, { useReducer } from 'react';
import { Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { dataUpdated, gradientOffsetPvMinusSt, gradientOffsetPvPlusSt, gradientOffsetUvMinusSt, gradientOffsetUvPlusSt } from './helpers';
import { State } from './types';
import { initialState, reducer } from './state';

import s from './app.module.scss'

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div className={s.container}>
        <div className={s.chartContainer}>
          <div className={s.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={500}
                height={300}
                data={dataUpdated}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <defs>
                  <linearGradient id="PvPlusStDev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={gradientOffsetPvPlusSt()} stopColor="red" stopOpacity={1}/>
                    <stop offset={gradientOffsetPvPlusSt()} stopColor="transparent" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="PvMinusStDev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={gradientOffsetPvMinusSt()} stopColor="transparent" stopOpacity={1}/>
                    <stop offset={gradientOffsetPvMinusSt()} stopColor="red" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="UvPlusStDev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={gradientOffsetUvPlusSt()} stopColor="red" stopOpacity={1}/>
                    <stop offset={gradientOffsetUvPlusSt()} stopColor="transparent" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="UvMinusStDev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={gradientOffsetUvMinusSt()} stopColor="transparent" stopOpacity={1}/>
                    <stop offset={gradientOffsetUvMinusSt()} stopColor="red" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="url(#PvPlusStDev)" activeDot={{ r: 8 }} />
                <Area type="monotone" baseValue="dataMax" dataKey="pv" stroke="transparent" fill="url(#PvMinusStDev)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="pv_plus_std" stroke="black" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="pv_minus_std" stroke="grey" activeDot={{ r: 8 }} />

                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="url(#UvPlusStDev)" activeDot={{ r: 8 }} />
                <Area type="monotone" baseValue="dataMax" dataKey="uv" stroke="transparent" fill="url(#UvMinusStDev)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv_plus_std" stroke="grey" fill="transparent" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv_minus_std" stroke="green" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className={s.chartMenu}>
          {Object.entries(state).map(([key, value]) => (
            <label key={key} style={{ display: 'block', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                dispatch({ type: value ? 'OFF' : 'ON', key: key as keyof State })
              }
            />
              {key}
            </label>
      ))}
          </div>
        </div>
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
              {dataUpdated.map(({name, uv, pv, pv_z, uv_z, uv_plus_std, uv_minus_std, pv_plus_std, pv_minus_std}) => (
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
      </div>
    );
}

