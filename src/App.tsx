import React, { useMemo, useReducer } from 'react';
import { Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { data, dataUpdated,  pvMean, pvStDeviation, uvMean, uvStDeviation } from './helpers';
import { Table } from './Table';
import { State } from './types';
import { initialState, reducer } from './state';

import s from './app.module.scss'

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dataMaxUv = useMemo(() => Math.max(...data.map((i) => i.uv)), [data]);
  const dataMaxPv = useMemo(() => Math.max(...data.map((i) => i.pv)), [data]);
  const dataMinUv = useMemo(() => Math.min(...data.map((i) => i.uv)), [data]);
  const dataMinPv = useMemo(() => Math.min(...data.map((i) => i.pv)), [data]);

  const dataMax = useMemo(() => Math.max(...data.map((i) => {
    if (state.uv && state.pv) {
      return i.pv >= i.uv ? i.pv : i.uv;
    }
    if (state.uv && !state.pv) {
      return i.uv;
    }
    if (!state.uv && state.pv) {
      return i.pv;
    }
    return i.uv
  })), [data, state.pv, state.uv,]);

  const gradientOffsetUvMinusSt = () => {
    const delta = dataMax - dataMinUv;
    return `${(delta - (uvMean - uvStDeviation - dataMinUv)) / delta * 100}%`;
  };

  const gradientOffsetPvMinusSt = () => {
    const delta = dataMax - dataMinPv;
    return `${(delta - (pvMean - pvStDeviation - dataMinPv)) / delta * 100}%`;
  };

  const gradientOffsetUvPlusSt = () => `${(dataMaxUv - (uvMean + uvStDeviation)) / dataMaxUv * 100}%`;

  const gradientOffsetPvPlusSt = () => `${(dataMaxPv - (pvMean + pvStDeviation)) / dataMaxPv * 100}%`;

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
                <Area
                  hide={!state.pv} type="monotone" dataKey="pv" stroke="blue" fill="url(#PvPlusStDev)"
                  activeDot={({ cx, cy, payload }) => {
                    const fill = payload.pv > payload.pv_plus_std || payload.pv < payload.pv_minus_std ? 'red' : 'blue'
                    return (
                      <circle cx={cx} cy={cy} r={8} fill={fill} strokeWidth={1} />
                    )}}
                  dot={({ cx, cy, payload }) => {
                    const fill = payload.pv > payload.pv_plus_std || payload.pv < payload.pv_minus_std ? 'red' : 'blue'
                    return (
                      <circle cx={cx} cy={cy} r={4} fill={fill} strokeWidth={1} />
                    )}}
                  />
                <Area hide={!state.pv} type="monotone" baseValue="dataMax" dataKey="pv" stroke="transparent" fill="url(#PvMinusStDev)" activeDot={{ r: 8 }} />
                <Line hide={!state.pv_z_score} type="monotone" dataKey="pv_plus_std" stroke="blue" activeDot={{ r: 8 }} strokeDasharray="2 2" />
                <Line hide={!state.pv_z_score} type="monotone" dataKey="pv_minus_std" stroke="blue" activeDot={{ r: 8 }} strokeDasharray="2 2" />

                <Area
                  hide={!state.uv} type="monotone" dataKey="uv" stroke="green" fill="url(#UvPlusStDev)"
                  activeDot={({ cx, cy, payload }) => {
                    const fill = payload.uv > payload.uv_plus_std || payload.uv < payload.uv_minus_std ? 'red' : 'green'
                    return (
                      <circle cx={cx} cy={cy} r={8} fill={fill} strokeWidth={1} />
                    )}}
                  dot={({ cx, cy, payload }) => {
                    const fill = payload.uv > payload.uv_plus_std || payload.uv < payload.uv_minus_std ? 'red' : 'green'
                    return (
                      <circle cx={cx} cy={cy} r={4} fill={fill} strokeWidth={1} />
                    )}}
                />
                <Area hide={!state.uv} type="monotone" baseValue="dataMax" dataKey="uv" stroke="transparent" fill="url(#UvMinusStDev)" activeDot={{ r: 8 }} />
                <Line hide={!state.uv_z_score}type="monotone" dataKey="uv_plus_std" stroke="green" fill="transparent" activeDot={{ r: 8 }} strokeDasharray="2 2" />
                <Line hide={!state.uv_z_score} type="monotone" dataKey="uv_minus_std" stroke="green" strokeDasharray="2 2" />
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
        <Table data={dataUpdated} />
      </div>
    );
}

