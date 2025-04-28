import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import s from './app.module.scss'


export default function App () {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
    const uvMean = data.reduce((acc, { uv }) => acc + uv, 0)/data.length;
    const uvStDeviation = Math.sqrt(
      data.reduce((sum, {uv}) => sum + Math.pow(uv - uvMean, 2), 0) / data.length
    );
    const pvMean = data.reduce((acc, { pv }) => acc + pv, 0)/data.length;
    const pvStDeviation = Math.sqrt(
      data.reduce((sum, {pv}) => sum + Math.pow(pv - pvMean, 2), 0) / data.length
    );
    console.log(uvMean, pvMean, uvStDeviation, pvStDeviation);
    const dataUpdated = data.map((i) => {
      const uv_z = (i.uv - uvMean) / uvStDeviation;
      const pv_z = (i.pv - pvMean) / pvStDeviation;
      const pv_plus_std = pvMean + pvStDeviation;
      const uv_plus_std = uvMean + uvStDeviation;
      const pv_minus_std = pvMean - pvStDeviation;
      const uv_minus_std = uvMean - uvStDeviation;
      return {
        ...i,
        uv_z,
        pv_z,
        pv_plus_std,
        uv_plus_std,
        pv_minus_std,
        uv_minus_std,
        uv_mean: uvMean,
        pv_mean: pvMean
      }
    })

    return (
      <div className={s.container}>
        <div className={s.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
              {/*<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pv_plus_std" stroke="black" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pv_minus_std" stroke="grey" />
              <Line type="monotone" dataKey="pv_mean" stroke="red" />*/}
              {/*<Line type="monotone" dataKey="pv_z" stroke="blue" activeDot={{ r: 8 }} />*/}
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              {/*<Line type="monotone" dataKey="uv_z" stroke="green" />*/}
              <Line type="monotone" dataKey="uv_plus_std" stroke="blue" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv_minus_std" stroke="green" />
              <Line type="monotone" dataKey="uv_mean" stroke="red" />
            </LineChart>
          </ResponsiveContainer>
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

