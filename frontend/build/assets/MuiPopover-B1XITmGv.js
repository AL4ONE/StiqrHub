import{R as c,j as o}from"./index-1gxxumks.js";import{B as u}from"./Breadcrumb-D-z1q2H7.js";import{P as x}from"./PageContainer-CcFGKzWT.js";import{P}from"./ParentCard-Clj2WW4G.js";import{C as s}from"./ChildCard-pU14VYQ6.js";import{B as y}from"./Button-DKNxixJp.js";import{P as m}from"./Popover-DyaqtuNt.js";import{B as h}from"./Box-rTPpZw4U.js";import{T as n}from"./Typography-gBkIfv85.js";import{C as d}from"./CodeDialog-B36fXwz1.js";import{G as l}from"./Grid2-CFjitul9.js";import"./index.esm-EJ29clj2.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Paper-CFTaduOC.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./resolveProps-CxWqPvcr.js";import"./isHostComponent-DVu5iVWx.js";import"./useSlot-Bz8-rvmW.js";import"./Modal-CI1OBMJP.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./utils-CUOamiDe.js";import"./Portal-BtjLBOFM.js";import"./debounce-Be36O1Ab.js";import"./Grow-G9PJ9mrr.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./composeClasses-CZn__ddx.js";const g=()=>{const[e,r]=c.useState(null),a=v=>{r(v.currentTarget)},i=()=>{r(null)},t=!!e,p=t?"simple-popover":void 0;return o.jsxs(o.Fragment,{children:[o.jsx(y,{"aria-describedby":p,variant:"contained",onClick:a,children:"Open Popover"}),o.jsx(m,{id:p,open:t,anchorEl:e,onClose:i,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:o.jsxs(h,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Basic Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},f=()=>{const[e,r]=c.useState(null),a=p=>{r(p.currentTarget)},i=()=>{r(null)},t=!!e;return o.jsxs(o.Fragment,{children:[o.jsx(n,{"aria-owns":t?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:a,onMouseLeave:i,children:"Hover with a Popover."}),o.jsx(m,{id:"mouse-over-popover",sx:{pointerEvents:"none"},open:t,anchorEl:e,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:i,disableRestoreFocus:!0,children:o.jsxs(h,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Hover Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},j=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
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
);`})}),E=[{to:"/",title:"Home"},{title:"Popover"}],uo=()=>o.jsxs(x,{title:"Popover",description:"this is Popover page",children:[o.jsx(u,{title:"Popover",items:E}),o.jsx(P,{title:"Popover",children:o.jsxs(l,{container:!0,spacing:3,children:[o.jsx(l,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Click",codeModel:o.jsx(j,{}),children:o.jsx(g,{})})}),o.jsx(l,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Hover",codeModel:o.jsx(C,{}),children:o.jsx(f,{})})})]})})]});export{uo as default};
