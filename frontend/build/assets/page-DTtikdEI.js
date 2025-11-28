import{r as g,j as t}from"./index-BvKsHq39.js";import{B as M}from"./Breadcrumb-D8hqt6RT.js";import{P as N}from"./PageContainer-B5n1q2IU.js";import{C}from"./CodeDialog-DOO60z65.js";import{P as k}from"./ParentCard-CnqaPcOJ.js";import{u as j}from"./Paper-Dw9Z9lKu.js";import{S as c}from"./Stack-BbwedUsx.js";import{B as s}from"./Box-Cgsde7yB.js";import{_ as e}from"./Typography-Cd2fCHjT.js";import{c as X}from"./ButtonBase-D1rmaemC.js";import{D as b}from"./useChartContainerDimensions-ZJ1B-2T3.js";import{B as I}from"./BarPlot-B_PRbG3h.js";import{A as K,L as U,b as W}from"./LineHighlightPlot-Y3ynsoy0.js";import{R as Y,C as q,a as J}from"./ChartsAxisHighlight-0-PryMjI.js";import{F as H}from"./FormControlLabel-CGb6HoDn.js";import{S as A}from"./Switch-Cb30KIf1.js";import{G as O}from"./Grid2-DRIhct5E.js";import"./index.esm-ugoV-OIv.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./getReactNodeRef-CeXiOENg.js";import"./Portal-Cu5WyFQi.js";import"./useControlled-CqszgbyI.js";import"./useId-DVmFICJa.js";import"./Grow-pYFqELkc.js";import"./utils-CfOsK_SU.js";import"./IconButton-VvYfEoZr.js";import"./DialogContent-aWxIG_p7.js";import"./Modal-CEdargRK.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BWQNm6rb.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./Card-Chng94uH.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./useThemeProps-03R8yy7c.js";import"./createStack-_s5wtiSe.js";import"./composeClasses-mRK-vHC7.js";import"./useChartId-CRyesGAG.js";import"./useSkipAnimation-Cr-suAmi.js";import"./path-DyVhHtw_.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-DVSm7LDD.js";import"./SwitchBase-CoR_qOd3.js";const Q=["xAxis","yAxis","width","height","margin","colors","sx","showTooltip","tooltip","showHighlight","axisHighlight","children","slots","slotProps","data","plotType","valueFormatter","area","curve","className"],V={top:5,bottom:5,left:5,right:5},n=g.forwardRef(function(r,h){const{xAxis:x,yAxis:L,width:d,height:S,margin:f=V,colors:m,sx:P,showTooltip:B,tooltip:u,showHighlight:y,axisHighlight:v,children:G,slots:l,slotProps:p,data:T,plotType:a="line",valueFormatter:R=w=>w===null?"":w.toString(),area:F,curve:_="linear",className:E}=r,z=X(r,Q),o=e({},y&&a==="bar"?{x:"band"}:{x:"none"},v);return t.jsxs(Y,e({},z,{ref:h,series:[e({type:a,data:T,valueFormatter:R},a==="bar"?{}:{area:F,curve:_,disableHighlight:!y})],width:d,height:S,margin:f,className:E,xAxis:[e({id:b,scaleType:a==="bar"?"band":"point",data:Array.from({length:T.length},(w,D)=>D),hideTooltip:x===void 0},x)],yAxis:[e({id:b},L)],colors:m,sx:P,disableAxisListener:(!B||(u==null?void 0:u.trigger)!=="axis")&&(o==null?void 0:o.x)==="none"&&(o==null?void 0:o.y)==="none",children:[a==="bar"&&t.jsx(I,{skipAnimation:!0,slots:l,slotProps:p,sx:{shapeRendering:"auto"}}),a==="line"&&t.jsxs(g.Fragment,{children:[t.jsx(K,{skipAnimation:!0,slots:l,slotProps:p}),t.jsx(U,{skipAnimation:!0,slots:l,slotProps:p}),t.jsx(W,{slots:l,slotProps:p})]}),t.jsx(q,e({},o)),B&&t.jsx(J,e({},u,{slotProps:p,slots:l})),G]}))});function Z(){return t.jsx(C,{children:`
import React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { useTheme } from '@mui/material';
const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BasicSparkLine ',
},
]; 

 function BasicSparkLine() {
    const theme = useTheme();
    const primary = theme.palette.primary.main;


    return (

            <Stack direction="row" sx={{ width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} colors={[primary]} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart
                        plotType="bar"
                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                        height={100}
                        colors={[primary]}
                    />
                </Box>
            </Stack>
    )
}

export default BasicSparkLine
    

`})}function $(){const r=j().palette.primary.main;return t.jsx(k,{title:"Basic Chart",codeModel:t.jsx(Z,{}),children:t.jsxs(c,{direction:"row",sx:{width:"100%"},children:[t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[1,4,2,5,7,2,4,6],height:100,colors:[r]})}),t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{plotType:"bar",data:[1,4,2,5,7,2,4,6],height:100,colors:[r]})})]})})}function tt(){return t.jsx(C,{children:`

    import * as React from 'react';
    import Stack from '@mui/material/Stack';
    import Box from '@mui/material/Box';
    import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
    import { useTheme } from '@mui/material';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'AreaSparkLineChart ',
},
]; 

    export default function AreaSparkLineChart() {
        const theme = useTheme();
        const primary = theme.palette.primary.main;
        return (
                <Stack direction="row" sx={{ width: '100%' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <SparkLineChart data={[3, -10, -2, 5, 7, -2, 4, 6]} height={100} area colors={[primary]} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <SparkLineChart
                            data={[3, -10, -2, 5, 7, -2, 4, 6]}
                            height={100}
                            curve="natural"
                            colors={[primary]}
                            area
                        />
                    </Box>
                </Stack>
          
        );
    }
`})}function rt(){const r=j().palette.primary.main;return t.jsx(k,{title:"AreaSparkLine Chart",codeModel:t.jsx(tt,{}),children:t.jsxs(c,{direction:"row",sx:{width:"100%"},children:[t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[3,-10,-2,5,7,-2,4,6],height:100,area:!0,colors:[r]})}),t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[3,-10,-2,5,7,-2,4,6],height:100,curve:"natural",colors:[r],area:!0})})]})})}function ot(){return t.jsx(C,{children:`
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { useTheme } from '@mui/material';

 const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BasicSparkLineCustomizationChart ',
},
]; 


export default function BasicSparkLineCustomizationChart() {
    const [showHighlight, setShowHighlight] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(true);

    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const handleHighlightChange = (event) => {
        setShowHighlight(event.target.checked);
    };

    const handleTooltipChange = (event) => {
        setShowTooltip(event.target.checked);
    };

    return (

            <Stack direction="column" sx={{ width: '100%' }}>
                <Stack direction="row">
                    <FormControlLabel
                        value="end"
                        control={
                            <Switch
                                color="primary"
                                checked={showHighlight}
                                onChange={handleHighlightChange}

                            />
                        }
                        label="showHighlight"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="end"
                        control={
                            <Switch
                                color="primary"
                                checked={showTooltip}
                                onChange={handleTooltipChange}
                            />
                        }
                        label="showTooltip"
                        labelPlacement="end"
                    />
                </Stack>
                <Stack direction="row" sx={{ width: '100%' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <SparkLineChart
                            data={[1, 4, 2, 5, 7, 2, 4, 6]}
                            height={100}
                            showHighlight={showHighlight}
                            showTooltip={showTooltip}
                            colors={[primary]}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <SparkLineChart
                            plotType="bar"
                            data={[1, 4, 2, 5, 7, 2, 4, 6]}
                            height={100}
                            showHighlight={showHighlight}
                            showTooltip={showTooltip}
                            colors={[primary]}
                        />
                    </Box>
                </Stack>
            </Stack>

    );
}
            `})}function et(){const[i,r]=g.useState(!0),[h,x]=g.useState(!0),d=j().palette.primary.main,S=m=>{r(m.target.checked)},f=m=>{x(m.target.checked)};return t.jsx(k,{title:" Customization Chart",codeModel:t.jsx(ot,{}),children:t.jsxs(c,{direction:"column",sx:{width:"100%"},children:[t.jsxs(c,{direction:"row",children:[t.jsx(H,{value:"end",control:t.jsx(A,{color:"primary",checked:i,onChange:S}),label:"showHighlight",labelPlacement:"end"}),t.jsx(H,{value:"end",control:t.jsx(A,{color:"primary",checked:h,onChange:f}),label:"showTooltip",labelPlacement:"end"})]}),t.jsxs(c,{direction:"row",sx:{width:"100%"},children:[t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[1,4,2,5,7,2,4,6],height:100,showHighlight:i,showTooltip:h,colors:[d]})}),t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{plotType:"bar",data:[1,4,2,5,7,2,4,6],height:100,showHighlight:i,showTooltip:h,colors:[d]})})]})]})})}const it=[{to:"/",title:"Home"},{title:"SparkLine Charts "}],ar=()=>t.jsxs(N,{title:"SparkLine Charts",description:"this is SparkLine Charts ",children:[t.jsx(M,{title:"SparkLine Charts",items:it}),t.jsxs(O,{container:!0,spacing:3,children:[t.jsx($,{}),t.jsx(rt,{}),t.jsx(et,{})]})]});export{ar as default};
