import{R as c,j as o}from"./index-BvKsHq39.js";import{B as u}from"./Breadcrumb-D8hqt6RT.js";import{P as x}from"./PageContainer-B5n1q2IU.js";import{P}from"./ParentCard-CnqaPcOJ.js";import{C as s}from"./ChildCard-CAFP0Ce9.js";import{B as y}from"./Button-DOY2dwR5.js";import{P as m}from"./Popover-D4GaJhon.js";import{B as h}from"./Box-Cgsde7yB.js";import{T as n}from"./Typography-Cd2fCHjT.js";import{C as d}from"./CodeDialog-DOO60z65.js";import{G as l}from"./Grid2-DRIhct5E.js";import"./index.esm-ugoV-OIv.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Paper-Dw9Z9lKu.js";import"./Card-Chng94uH.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./resolveProps-CxWqPvcr.js";import"./isHostComponent-DVu5iVWx.js";import"./useSlot-BWQNm6rb.js";import"./Modal-CEdargRK.js";import"./getReactNodeRef-CeXiOENg.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./utils-CfOsK_SU.js";import"./Portal-Cu5WyFQi.js";import"./debounce-Be36O1Ab.js";import"./Grow-pYFqELkc.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./useControlled-CqszgbyI.js";import"./useId-DVmFICJa.js";import"./IconButton-VvYfEoZr.js";import"./DialogContent-aWxIG_p7.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./composeClasses-mRK-vHC7.js";import"./useThemeProps-03R8yy7c.js";const g=()=>{const[e,r]=c.useState(null),a=v=>{r(v.currentTarget)},i=()=>{r(null)},t=!!e,p=t?"simple-popover":void 0;return o.jsxs(o.Fragment,{children:[o.jsx(y,{"aria-describedby":p,variant:"contained",onClick:a,children:"Open Popover"}),o.jsx(m,{id:p,open:t,anchorEl:e,onClose:i,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:o.jsxs(h,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Basic Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},f=()=>{const[e,r]=c.useState(null),a=p=>{r(p.currentTarget)},i=()=>{r(null)},t=!!e;return o.jsxs(o.Fragment,{children:[o.jsx(n,{"aria-owns":t?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:a,onMouseLeave:i,children:"Hover with a Popover."}),o.jsx(m,{id:"mouse-over-popover",sx:{pointerEvents:"none"},open:t,anchorEl:e,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:i,disableRestoreFocus:!0,children:o.jsxs(h,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Hover Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},j=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
import React from "react";
import { 
    Popover, 
    Typography, 
    Button, 
    Box 
} from '@mui/material';


const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

return (
    <>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
            <Box p={2}>
                <Typography variant="h6" mb={1}>
                    Basic Popover
                </Typography>
                <Typography color="textSecondary">
                    The component is built on top of the Modal component.
                </Typography>
            </Box>
        </Popover>
    </>
);`})}),C=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
import React from "react";
import { 
  Popover, 
  Box, 
  Typography 
} from '@mui/material';


const [anchorEl, setAnchorEl] = React.useState(null);

const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
};

const handlePopoverClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);

return (
    <>
        <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            Hover with a Popover.
        </Typography>
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Box p={2}>
                <Typography variant="h6" mb={1}>
                    Hover Popover
                </Typography>
                <Typography color="textSecondary">
                    The component is built on top of the Modal component.
                </Typography>
            </Box>
      </Popover>
    </>
);`})}),E=[{to:"/",title:"Home"},{title:"Popover"}],xo=()=>o.jsxs(x,{title:"Popover",description:"this is Popover page",children:[o.jsx(u,{title:"Popover",items:E}),o.jsx(P,{title:"Popover",children:o.jsxs(l,{container:!0,spacing:3,children:[o.jsx(l,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Click",codeModel:o.jsx(j,{}),children:o.jsx(g,{})})}),o.jsx(l,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Hover",codeModel:o.jsx(C,{}),children:o.jsx(f,{})})})]})})]});export{xo as default};
