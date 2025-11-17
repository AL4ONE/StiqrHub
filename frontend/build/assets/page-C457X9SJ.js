import{r as g,j as t}from"./index-1gxxumks.js";import{B as M}from"./Breadcrumb-D-z1q2H7.js";import{P as N}from"./PageContainer-CcFGKzWT.js";import{C}from"./CodeDialog-B36fXwz1.js";import{P as k}from"./ParentCard-Clj2WW4G.js";import{u as j}from"./Paper-CFTaduOC.js";import{S as p}from"./Stack-C2qTYmUq.js";import{B as s}from"./Box-rTPpZw4U.js";import{_ as e}from"./Typography-gBkIfv85.js";import{c as X}from"./ButtonBase-BP4UcNRm.js";import{D as b}from"./useChartContainerDimensions-Dk0OaaTh.js";import{B as I}from"./BarPlot-CSbZKPPY.js";import{A as K,L as U,b as W}from"./LineHighlightPlot-B_lRrEO8.js";import{R as Y,C as q,a as J}from"./ChartsAxisHighlight-C7Bxjg5B.js";import{F as H}from"./FormControlLabel-BqfQq0Jn.js";import{S as A}from"./Switch-CIMJMtuj.js";import{G as O}from"./Grid2-CFjitul9.js";import"./index.esm-EJ29clj2.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./createStack-ByRgbIrg.js";import"./composeClasses-CZn__ddx.js";import"./useChartId-BOTu4bFH.js";import"./useSkipAnimation-C-Cf9kKL.js";import"./path-DyVhHtw_.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-CbTsxQCq.js";import"./SwitchBase-CKvq49z_.js";const Q=["xAxis","yAxis","width","height","margin","colors","sx","showTooltip","tooltip","showHighlight","axisHighlight","children","slots","slotProps","data","plotType","valueFormatter","area","curve","className"],V={top:5,bottom:5,left:5,right:5},n=g.forwardRef(function(r,h){const{xAxis:x,yAxis:L,width:d,height:S,margin:f=V,colors:m,sx:P,showTooltip:B,tooltip:u,showHighlight:y,axisHighlight:v,children:G,slots:l,slotProps:c,data:T,plotType:a="line",valueFormatter:R=w=>w===null?"":w.toString(),area:F,curve:_="linear",className:E}=r,z=X(r,Q),o=e({},y&&a==="bar"?{x:"band"}:{x:"none"},v);return t.jsxs(Y,e({},z,{ref:h,series:[e({type:a,data:T,valueFormatter:R},a==="bar"?{}:{area:F,curve:_,disableHighlight:!y})],width:d,height:S,margin:f,className:E,xAxis:[e({id:b,scaleType:a==="bar"?"band":"point",data:Array.from({length:T.length},(w,D)=>D),hideTooltip:x===void 0},x)],yAxis:[e({id:b},L)],colors:m,sx:P,disableAxisListener:(!B||(u==null?void 0:u.trigger)!=="axis")&&(o==null?void 0:o.x)==="none"&&(o==null?void 0:o.y)==="none",children:[a==="bar"&&t.jsx(I,{skipAnimation:!0,slots:l,slotProps:c,sx:{shapeRendering:"auto"}}),a==="line"&&t.jsxs(g.Fragment,{children:[t.jsx(K,{skipAnimation:!0,slots:l,slotProps:c}),t.jsx(U,{skipAnimation:!0,slots:l,slotProps:c}),t.jsx(W,{slots:l,slotProps:c})]}),t.jsx(q,e({},o)),B&&t.jsx(J,e({},u,{slotProps:c,slots:l})),G]}))});function Z(){return t.jsx(C,{children:`
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
    

`})}function $(){const r=j().palette.primary.main;return t.jsx(k,{title:"Basic Chart",codeModel:t.jsx(Z,{}),children:t.jsxs(p,{direction:"row",sx:{width:"100%"},children:[t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[1,4,2,5,7,2,4,6],height:100,colors:[r]})}),t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{plotType:"bar",data:[1,4,2,5,7,2,4,6],height:100,colors:[r]})})]})})}function tt(){return t.jsx(C,{children:`

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
`})}function rt(){const r=j().palette.primary.main;return t.jsx(k,{title:"AreaSparkLine Chart",codeModel:t.jsx(tt,{}),children:t.jsxs(p,{direction:"row",sx:{width:"100%"},children:[t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[3,-10,-2,5,7,-2,4,6],height:100,area:!0,colors:[r]})}),t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[3,-10,-2,5,7,-2,4,6],height:100,curve:"natural",colors:[r],area:!0})})]})})}function ot(){return t.jsx(C,{children:`
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
            `})}function et(){const[i,r]=g.useState(!0),[h,x]=g.useState(!0),d=j().palette.primary.main,S=m=>{r(m.target.checked)},f=m=>{x(m.target.checked)};return t.jsx(k,{title:" Customization Chart",codeModel:t.jsx(ot,{}),children:t.jsxs(p,{direction:"column",sx:{width:"100%"},children:[t.jsxs(p,{direction:"row",children:[t.jsx(H,{value:"end",control:t.jsx(A,{color:"primary",checked:i,onChange:S}),label:"showHighlight",labelPlacement:"end"}),t.jsx(H,{value:"end",control:t.jsx(A,{color:"primary",checked:h,onChange:f}),label:"showTooltip",labelPlacement:"end"})]}),t.jsxs(p,{direction:"row",sx:{width:"100%"},children:[t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{data:[1,4,2,5,7,2,4,6],height:100,showHighlight:i,showTooltip:h,colors:[d]})}),t.jsx(s,{sx:{flexGrow:1},children:t.jsx(n,{plotType:"bar",data:[1,4,2,5,7,2,4,6],height:100,showHighlight:i,showTooltip:h,colors:[d]})})]})]})})}const it=[{to:"/",title:"Home"},{title:"SparkLine Charts "}],ir=()=>t.jsxs(N,{title:"SparkLine Charts",description:"this is SparkLine Charts ",children:[t.jsx(M,{title:"SparkLine Charts",items:it}),t.jsxs(O,{container:!0,spacing:3,children:[t.jsx($,{}),t.jsx(rt,{}),t.jsx(et,{})]})]});export{ir as default};
