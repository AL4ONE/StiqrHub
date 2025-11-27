import{r as g,j as t}from"./index-DDD7yp0g.js";import{B as M}from"./Breadcrumb-y7m_PrQR.js";import{P as N}from"./PageContainer-kiFKIuEi.js";import{C}from"./CodeDialog-t_U43CiB.js";import{P as k}from"./ParentCard-CTF0AMkY.js";import{u as j}from"./Paper-BlVDmG2s.js";import{S as p}from"./Stack-CGmQnD9O.js";import{B as s}from"./Box-CvBWjzNB.js";import{_ as e}from"./Typography-L20TPdxk.js";import{c as X}from"./ButtonBase-DkEVVfaO.js";import{D as b}from"./useChartContainerDimensions-DzgS0PtD.js";import{B as I}from"./BarPlot-BJqnf97M.js";import{A as K,L as U,b as W}from"./LineHighlightPlot-f9sQJHlP.js";import{R as Y,C as q,a as J}from"./ChartsAxisHighlight-CCAr4l83.js";import{F as H}from"./FormControlLabel-BOoebw1C.js";import{S as A}from"./Switch-BUlJ5nOS.js";import{G as O}from"./Grid2-GkWFtmjY.js";import"./index.esm-C8f4hTIY.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./useControlled-Bv1_2TZl.js";import"./useId-B8IfysN2.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-DLOajWAY.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";import"./Card-B1UZbs-c.js";import"./CardHeader-D2q6eYVH.js";import"./Divider-CwEHe13b.js";import"./dividerClasses-Dpi_Mre1.js";import"./CardContent--215Oq_K.js";import"./createStack-CWzxi_AG.js";import"./composeClasses-CT39Oeyw.js";import"./useChartId-C5MIbfDK.js";import"./useSkipAnimation-CyBem-Oi.js";import"./path-DyVhHtw_.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-BfxcYShI.js";import"./SwitchBase-D46p_q13.js";const Q=["xAxis","yAxis","width","height","margin","colors","sx","showTooltip","tooltip","showHighlight","axisHighlight","children","slots","slotProps","data","plotType","valueFormatter","area","curve","className"],V={top:5,bottom:5,left:5,right:5},n=g.forwardRef(function(r,h){const{xAxis:x,yAxis:L,width:d,height:S,margin:f=V,colors:m,sx:P,showTooltip:B,tooltip:u,showHighlight:y,axisHighlight:v,children:G,slots:l,slotProps:c,data:T,plotType:a="line",valueFormatter:R=w=>w===null?"":w.toString(),area:F,curve:_="linear",className:E}=r,z=X(r,Q),o=e({},y&&a==="bar"?{x:"band"}:{x:"none"},v);return t.jsxs(Y,e({},z,{ref:h,series:[e({type:a,data:T,valueFormatter:R},a==="bar"?{}:{area:F,curve:_,disableHighlight:!y})],width:d,height:S,margin:f,className:E,xAxis:[e({id:b,scaleType:a==="bar"?"band":"point",data:Array.from({length:T.length},(w,D)=>D),hideTooltip:x===void 0},x)],yAxis:[e({id:b},L)],colors:m,sx:P,disableAxisListener:(!B||(u==null?void 0:u.trigger)!=="axis")&&(o==null?void 0:o.x)==="none"&&(o==null?void 0:o.y)==="none",children:[a==="bar"&&t.jsx(I,{skipAnimation:!0,slots:l,slotProps:c,sx:{shapeRendering:"auto"}}),a==="line"&&t.jsxs(g.Fragment,{children:[t.jsx(K,{skipAnimation:!0,slots:l,slotProps:c}),t.jsx(U,{skipAnimation:!0,slots:l,slotProps:c}),t.jsx(W,{slots:l,slotProps:c})]}),t.jsx(q,e({},o)),B&&t.jsx(J,e({},u,{slotProps:c,slots:l})),G]}))});function Z(){return t.jsx(C,{children:`
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
