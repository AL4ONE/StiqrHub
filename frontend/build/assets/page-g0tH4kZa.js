import{j as e,r as D}from"./index-1gxxumks.js";import{B as F}from"./Breadcrumb-D-z1q2H7.js";import{P as X}from"./PageContainer-CcFGKzWT.js";import{P as y}from"./ParentCard-Clj2WW4G.js";import{C as f}from"./CodeDialog-B36fXwz1.js";import{u as C}from"./Paper-CFTaduOC.js";import{L as P,M as I,m as b}from"./LineChart-Dv_Nc57L.js";import{L as w,l as Y,d as A}from"./LineHighlightPlot-B_lRrEO8.js";import{n as S,y as T,o as H}from"./ChartsAxisHighlight-C7Bxjg5B.js";import{g as W,a as N,s as z,_ as m,b as k}from"./Typography-gBkIfv85.js";import{C as B}from"./ChartsText-DQWdVBFs.js";import{b as v}from"./useChartContainerDimensions-Dk0OaaTh.js";import{c as U,d as G}from"./ChartsOverlay-D7yvXwMh.js";import{a as _}from"./useChartId-BOTu4bFH.js";import{G as q}from"./Grid2-CFjitul9.js";import"./index.esm-EJ29clj2.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Box-rTPpZw4U.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./path-DyVhHtw_.js";import"./useSkipAnimation-C-Cf9kKL.js";import"./ChartsOnAxisClickHandler-ap8pY97s.js";import"./ChartsGrid-C_dGnuec.js";import"./composeClasses-CZn__ddx.js";function K(){return e.jsx(f,{children:`
            
'use client'
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from "@mui/material";

   const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'SimpleLineChart ',
  },
]; 


function SimpleLineChart() {
  
    const monthlyProfits = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const monthlyRevenue = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = ["January", "February", "March", "April", "May", "June", "July"];


    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    return (
       

            <LineChart
                height={300}
                  series={[
                    { data: monthlyRevenue, label: 'Revenue', color: primary },
                    { data: monthlyProfits, label: 'Profits', color: secondary },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
       
    )
}

export default SimpleLineChart
`})}function O(){const t=[4e3,3e3,2e3,2780,1890,2390,3490],r=[2400,1398,9800,3908,4800,3800,4300],a=["January","February","March","April","May","June","July"],i=C(),n=i.palette.primary.main,s=i.palette.secondary.main;return e.jsx(y,{title:"Simple Chart",codeModel:e.jsx(K,{}),children:e.jsx(P,{height:300,series:[{data:r,label:"Revenue",color:n},{data:t,label:"Profits",color:s}],xAxis:[{scaleType:"point",data:a}]})})}function Q(){return e.jsx(f,{children:`
'use client';
import React from 'react';
import { useTheme } from '@mui/material';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
    LinePlot,
    MarkPlot,
} from '@mui/x-charts/LineChart';

const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'SimpleLineChart' },
];

function SimpleLineChart() {
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    const theme = useTheme();
    const primary = theme.palette.primary.main;

    return (
        <ChartContainer
                width={800}
                height={300}
                series={[{ type: 'line', data: pData, color: primary }]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                disableAxisListener
            >
                <LinePlot />
                <MarkPlot />
            </ChartContainer>
    );
}

export default SimpleLineChart;
`})}function V(){const t=[2400,1398,9800,3908,4800,3800,4300],r=["Page A","Page B","Page C","Page D","Page E","Page F","Page G"],i=C().palette.primary.main;return e.jsx(y,{title:"Tiny Chart",codeModel:e.jsx(Q,{}),children:e.jsxs(S,{width:800,height:300,series:[{type:"line",data:t,color:i}],xAxis:[{scaleType:"point",data:r}],disableAxisListener:!0,children:[e.jsx(w,{}),e.jsx(I,{})]})})}function Z(){return e.jsx(f,{children:`
    
'use client'
import * as React from 'react';
import {
    LineChart,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';
import { useTheme } from "@mui/material";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'DashedLineChart ',
},
]; 


export default function DashedLineChart() {
   
    const monthlyProfits = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const monthlyRevenue = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = ["January", "February", "March", "April", "May", "June", "July"];

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    return (
            <LineChart
                width={500}
                height={300}
               series={[
                    { data: monthlyRevenue, label: "Revenue", id: "pvId", color: primary },
                    { data: monthlyProfits, label: "Profits", id: "uvId", color: secondary },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
               sx={\`
                \${\`& .\${lineElementClasses.root}, .\${markElementClasses.root}\`}: {
                    strokeWidth: 1,
                },
                \`.MuiLineElement-series-pvId\`: {
                    strokeDasharray: '5 5',
                },
                \`.MuiLineElement-series-uvId\`: {
                    strokeDasharray: '3 4 5 2',
                },
                \${\`& .\${markElementClasses.root}:not(.\${markElementClasses.highlighted})\`}: {
                    fill: '#fff',
                },
                \${\`& .\${markElementClasses.highlighted}\`}: {
                    stroke: 'none',
                },
            \`}
            />
      );
}
  `})}function ee(){const t=[4e3,3e3,2e3,2780,1890,2390,3490],r=[2400,1398,9800,3908,4800,3800,4300],a=["January","February","March","April","May","June","July"],i=C(),n=i.palette.primary.main,s=i.palette.secondary.main;return e.jsx(y,{title:"Dashed Chart",codeModel:e.jsx(Z,{}),children:e.jsx(P,{height:300,series:[{data:r,label:"Revenue",id:"pvId",color:n},{data:t,label:"Profits",id:"uvId",color:s}],xAxis:[{scaleType:"point",data:a}],sx:{[`.${Y.root}, .${b.root}`]:{strokeWidth:1},".MuiLineElement-series-pvId":{strokeDasharray:"5 5"},".MuiLineElement-series-uvId":{strokeDasharray:"3 4 5 2"},[`.${b.root}:not(.${b.highlighted})`]:{fill:"#fff"},[`& .${b.highlighted}`]:{stroke:"none"}}})})}function te(){return e.jsx(f,{children:`
  
"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from "@mui/material";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BiaxialLineChart ',
},
]; 
export default function BiaxialLineChart() {
    
    const monthlyProfits = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const monthlyRevenue = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = ["January", "February", "March", "April", "May", "June", "July"];


    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    return (
            <LineChart
                width={500}
                height={300}
               series={[
                    { data: monthlyRevenue, label: "Revenue", yAxisId: "leftAxisId", color: primary },
                    {
                        data: monthlyProfits,
                        label: "Profits",
                        yAxisId: "rightAxisId",
                        color: secondary,
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                rightAxis="rightAxisId"
            />
    );
}
`})}function ie(){const t=[4e3,3e3,2e3,2780,1890,2390,3490],r=[2400,1398,9800,3908,4800,3800,4300],a=["January","February","March","April","May","June","July"],i=C(),n=i.palette.primary.main,s=i.palette.secondary.main;return e.jsx(y,{title:"Biaxial Chart",codeModel:e.jsx(te,{}),children:e.jsx(P,{height:300,series:[{data:r,label:"Revenue",yAxisId:"leftAxisId",color:n},{data:t,label:"Profits",yAxisId:"rightAxisId",color:s}],xAxis:[{scaleType:"point",data:a}],yAxis:[{id:"leftAxisId"},{id:"rightAxisId"}],rightAxis:"rightAxisId"})})}function J(t){return N("MuiChartsReferenceLine",t)}const M=W("MuiChartsReferenceLine",["root","vertical","horizontal","line","label"]),E=z("g")(({theme:t})=>({[`& .${M.line}`]:{fill:"none",stroke:(t.vars||t).palette.text.primary,shapeRendering:"crispEdges",strokeWidth:1,pointerEvents:"none"},[`& .${M.label}`]:m({fill:(t.vars||t).palette.text.primary,stroke:"none",pointerEvents:"none",fontSize:12},t.typography.body1)})),re=({top:t,height:r,spacingY:a,labelAlign:i="middle"})=>{switch(i){case"start":return{y:t+a,style:{dominantBaseline:"hanging",textAnchor:"start"}};case"end":return{y:t+r-a,style:{dominantBaseline:"auto",textAnchor:"start"}};default:return{y:t+r/2,style:{dominantBaseline:"central",textAnchor:"start"}}}};function ae(t){return k({root:["root","vertical"],line:["line"],label:["label"]},J,t)}function ne(t){const{x:r,label:a="",spacing:i=5,classes:n,labelAlign:s,lineStyle:c,labelStyle:u,axisId:h}=t,{top:d,height:p}=v(),o=T(h)(r);if(o===void 0)return null;const x=`M ${o} ${d} l 0 ${p}`,l=ae(n),j=typeof i=="object"?i.x??0:i,R=typeof i=="object"?i.y??0:i,L=m({x:o+j,text:a,fontSize:12},re({top:d,height:p,spacingY:R,labelAlign:s}),{className:l.label});return e.jsxs(E,{className:l.root,children:[e.jsx("path",{d:x,className:l.line,style:c}),e.jsx(B,m({},L,{style:m({},L.style,u)}))]})}const se=({left:t,width:r,spacingX:a,labelAlign:i="middle"})=>{switch(i){case"start":return{x:t+a,style:{dominantBaseline:"auto",textAnchor:"start"}};case"end":return{x:t+r-a,style:{dominantBaseline:"auto",textAnchor:"end"}};default:return{x:t+r/2,style:{dominantBaseline:"auto",textAnchor:"middle"}}}};function oe(t){return k({root:["root","horizontal"],line:["line"],label:["label"]},J,t)}function le(t){const{y:r,label:a="",spacing:i=5,classes:n,labelAlign:s,lineStyle:c,labelStyle:u,axisId:h}=t,{left:d,width:p}=v(),o=H(h)(r);if(o===void 0)return null;const x=`M ${d} ${o} l ${p} 0`,l=oe(n),j=typeof i=="object"?i.x??0:i,R=typeof i=="object"?i.y??0:i,L=m({y:o-R,text:a,fontSize:12},se({left:d,width:p,spacingX:j,labelAlign:s}),{className:l.label});return e.jsxs(E,{className:l.root,children:[e.jsx("path",{d:x,className:l.line,style:c}),e.jsx(B,m({},L,{style:m({},L.style,u)}))]})}function $(t){const{x:r,y:a}=t;if(r!==void 0&&a!==void 0)throw new Error("MUI X: The ChartsReferenceLine cannot have both `x` and `y` props set.");if(r===void 0&&a===void 0)throw new Error("MUI X: The ChartsReferenceLine should have a value in `x` or `y` prop.");return r!==void 0?e.jsx(ne,m({},t)):e.jsx(le,m({},t))}function ce(){return e.jsx(f,{children:`
    
"use client";
import * as React from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { useTheme } from "@mui/material";

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'LineChartWithReferenceLines ',
},
];


export default function LineChartWithReferenceLines() {
  const monthlyProfits = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const monthlyRevenue = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

    const xLabels = ["January", "February", "March", "April", "May", "June", "July"];


  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const Linecolor = theme.palette.warning.main;

  return (
   
      <ChartContainer
        width={800}
        height={300}
        series={[
                    { data: monthlyRevenue, label: "Revenue", type: "line", color: primary },
                    { data: monthlyProfits, label: "Profits", type: "line", color: secondary },
                ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsReferenceLine
         x="March"
         label="Max Profits"
          lineStyle={{ stroke: Linecolor }}
        />
        <ChartsReferenceLine
          y={9800}
          label="Max"
          lineStyle={{ stroke: Linecolor }}
        />
        <ChartsXAxis />
        <ChartsYAxis />
      </ChartContainer>
 
  );
}


`})}function me(){const t=[4e3,3e3,2e3,2780,1890,2390,3490],r=[2400,1398,9800,3908,4800,3800,4300],a=["January","February","March","April","May","June","July"],i=C(),n=i.palette.primary.main,s=i.palette.secondary.main,c=i.palette.warning.main;return e.jsx(y,{title:"ReferenceLine Chart",codeModel:e.jsx(ce,{}),children:e.jsxs(S,{width:800,height:300,series:[{data:r,label:"Revenue",type:"line",color:n},{data:t,label:"Profits",type:"line",color:s}],xAxis:[{scaleType:"point",data:a}],children:[e.jsx(w,{}),e.jsx(I,{}),e.jsx($,{x:"March",label:"Max Profits",lineStyle:{stroke:c}}),e.jsx($,{y:9800,label:"Max",lineStyle:{stroke:c}}),e.jsx(U,{}),e.jsx(G,{})]})})}function he(){return e.jsx(f,{children:`
'use client'
import * as React from 'react';
import { LineChart, AnimatedLine } from '@mui/x-charts/LineChart';
import { useChartId, useDrawingArea, useXScale } from '@mui/x-charts/hooks';

import ParentCard from "src/components/shared/ParentCard";
import { useTheme } from "@mui/material";
import LinewithforecastCode from '../../code/linechartscode/LinewithforecastCode';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'LinewithforecastChart ',
  },
]; 

function CustomAnimatedLine(props) {
  const { limit, sxBefore, sxAfter, ...other } = props;
  const { top, bottom, height, left, width } = useDrawingArea();
  const scale = useXScale();
  const chartId = useChartId();

  if (limit === undefined) {
    return <AnimatedLine {...other} />;
  }

  const limitPosition = scale(limit); // Convert value to x coordinate.

  if (limitPosition === undefined) {
    return <AnimatedLine {...other} />;
  }

  const clipIdLeft = \`\${chartId}-\${props.ownerState.id}-line-limit-\${limit}-1\`;
  const clipIdRight = \`\${chartId}-\${props.ownerState.id}-line-limit-\${limit}-2\`;

  return (
    <React.Fragment>
      {/* Clip to show the line before the limit */}
      <clipPath id={clipIdLeft}>
        <rect
          x={left}
          y={0}
          width={limitPosition - left}
          height={top + height + bottom}
        />
      </clipPath>
      {/* Clip to show the line after the limit */}
      <clipPath id={clipIdRight}>
        <rect
          x={limitPosition}
          y={0}
          width={left + width - limitPosition}
          height={top + height + bottom}
        />
      </clipPath>
      <g clipPath={\`url(#\${clipIdLeft})\`}>
        <AnimatedLine {...other} sx={sxBefore} />
      </g>
      <g clipPath={\`url(#\${clipIdRight})\`}>
        <AnimatedLine {...other} sx={sxAfter} />
      </g>
    </React.Fragment>
  );
}

export default function LinewithforecastChart() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <LineChart
      series={[
        {
          type: 'line',
          data: [1, 2, 3, 4, 1, 2, 3, 4, 5],
          valueFormatter: (v, i) => \`\${v}\${i.dataIndex > 5 ? ' (estimated)' : ''}\`,
          color: primary,
        },
      ]}
      xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8] }]}
      height={200}
      width={400}
      slots={{ line: CustomAnimatedLine }}
      slotProps={{ line: { limit: 5, sxAfter: { strokeDasharray: '10 5' } } as any }}
    />
  );
}
`})}function de(t){const{limit:r,sxBefore:a,sxAfter:i,...n}=t,{top:s,bottom:c,height:u,left:h,width:d}=v(),p=T(),g=_();if(r===void 0)return e.jsx(A,{...n});const o=p(r);if(o===void 0)return e.jsx(A,{...n});const x=`${g}-${t.ownerState.id}-line-limit-${r}-1`,l=`${g}-${t.ownerState.id}-line-limit-${r}-2`;return e.jsxs(D.Fragment,{children:[e.jsx("clipPath",{id:x,children:e.jsx("rect",{x:h,y:0,width:o-h,height:s+u+c})}),e.jsx("clipPath",{id:l,children:e.jsx("rect",{x:o,y:0,width:h+d-o,height:s+u+c})}),e.jsx("g",{clipPath:`url(#${x})`,children:e.jsx(A,{...n,sx:a})}),e.jsx("g",{clipPath:`url(#${l})`,children:e.jsx(A,{...n,sx:i})})]})}function pe(){const r=C().palette.primary.main;return e.jsx(y,{title:"Forecast Chart",codeModel:e.jsx(he,{}),children:e.jsx(P,{series:[{type:"line",data:[1,2,3,4,1,2,3,4,5],valueFormatter:(a,i)=>`${a}${i.dataIndex>5?" (estimated)":""}`,color:r}],xAxis:[{data:[0,1,2,3,4,5,6,7,8]}],height:200,slots:{line:de},slotProps:{line:{limit:5,sxAfter:{strokeDasharray:"10 5"}}}})})}const ue=[{to:"/",title:"Home"},{title:"Line Charts"}],mt=()=>e.jsxs(X,{title:" Line Charts",description:"this is  Line Charts",children:[e.jsx(F,{title:" Line  Charts",items:ue}),e.jsxs(q,{container:!0,spacing:3,children:[e.jsx(O,{}),e.jsx(V,{}),e.jsx(ee,{}),e.jsx(ie,{}),e.jsx(me,{}),e.jsx(pe,{})]})]});export{mt as default};
