export const data = [
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

export const uvMean = data.reduce((acc, { uv }) => acc + uv, 0) / data.length;
export const uvStDeviation = Math.sqrt(
   data.reduce((sum, {uv}) => sum + Math.pow(uv - uvMean, 2), 0) / data.length
);
export const pvMean = data.reduce((acc, { pv }) => acc + pv, 0) / data.length;
export const pvStDeviation = Math.sqrt(
data.reduce((sum, {pv}) => sum + Math.pow(pv - pvMean, 2), 0) / data.length
);

export const gradientOffsetPvPlusSt = () => {
   const dataMax = Math.max(...data.map((i) => i.pv));
   return `${(dataMax - (pvMean + pvStDeviation)) / dataMax * 100}%`;
};
export const gradientOffsetPvMinusSt = () => {
   const dataMax = Math.max(...data.map((i) => i.pv));
   const dataMin = Math.min(...data.map((i) => i.pv));
   const delta = dataMax - dataMin;
   return `${(delta - (pvMean - pvStDeviation - dataMin)) / delta * 100}%`;
};
export const gradientOffsetUvPlusSt = () => {
   const dataMax = Math.max(...data.map((i) => i.uv));
   return `${(dataMax - (uvMean + uvStDeviation)) / dataMax * 100}%`;
};
export const gradientOffsetUvMinusSt = () => {
   const dataMax = Math.max(...data.map((i) => i.uv));
   const dataMin = Math.min(...data.map((i) => i.uv));
   const delta = dataMax - dataMin;
   return `${(delta - (uvMean - uvStDeviation - dataMin)) / delta * 100}%`;
};

export const dataUpdated = data.map((i) => {
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
     pv_mean: pvMean,
     pv_range_below: [pv_plus_std, i.pv],
     pv_range_down: [pv_minus_std, i.pv],
   }
 })