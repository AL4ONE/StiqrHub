import{j as e,R as h}from"./index-1gxxumks.js";import{q as d}from"./index.esm-EJ29clj2.js";import{B as m}from"./Breadcrumb-D-z1q2H7.js";import{P as p}from"./PageContainer-CcFGKzWT.js";import{P as u}from"./ParentCard-Clj2WW4G.js";import{C as r}from"./ChildCard-pU14VYQ6.js";import{C as l}from"./CodeDialog-B36fXwz1.js";import{G as t}from"./Grid2-CFjitul9.js";import{S as s}from"./Stack-C2qTYmUq.js";import{A as i}from"./Alert-CI2HcSo3.js";import{A as n}from"./AlertTitle-CsEFUyNX.js";import{B as c}from"./Button-DKNxixJp.js";import{C as x}from"./Collapse-Ba-4dC-4.js";import{I as f}from"./IconButton-R1j0HZ58.js";import"./Typography-gBkIfv85.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Paper-CFTaduOC.js";import"./Box-rTPpZw4U.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./composeClasses-CZn__ddx.js";import"./createStack-ByRgbIrg.js";import"./Close-B5nM6txC.js";import"./resolveProps-CxWqPvcr.js";const j=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="error">
        This is an error alert — check it out!
    </Alert>
    <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
    </Alert>
    <Alert variant="filled" severity="info">
        This is an info alert — check it out!
    </Alert>
    <Alert variant="filled" severity="success">
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="outlined" severity="error">
        This is an error alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="warning">
        This is a warning alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="info">
        This is an info alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),g=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
    </Alert>
</Stack>`})}),A=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import {
  Stack,
  Button,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="warning">
        This is a success alert — check it out!
    </Alert>
    <Alert
        variant="filled"
        severity="info"
        action={
            <Button color="inherit" size="small">
                UNDO
            </Button>
        }
    >
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),k=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from "react";
import {
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";

<Stack spacing={1}>
    <Collapse in={open}>
        <Alert
            variant="filled"
            severity="info"
            sx={{ mb: 1 }}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <IconX width={20} />
                </IconButton>
            }
        >
            Close me!
        </Alert>
    </Collapse>
</Stack>
<Button
    disabled={open}
    variant="contained"
    onClick={() => {
        setOpen(true);
    }}
>
    Re-open
</Button>`})}),T=[{to:"/",title:"Home"},{title:"Alert"}],fe=()=>{const[o,a]=h.useState(!0);return e.jsxs(p,{title:"Alert",description:"this is Alert page",children:[e.jsx(m,{title:"Alert",items:T}),e.jsx(u,{title:"Alert",children:e.jsxs(t,{container:!0,spacing:3,children:[e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Basic",children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{severity:"error",icon:!1,children:"This is an error alert — check it out!"}),e.jsx(i,{severity:"warning",icon:!1,children:"This is a warning alert — check it out!"}),e.jsx(i,{severity:"info",icon:!1,children:"This is an info alert — check it out!"}),e.jsx(i,{severity:"success",icon:!1,children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Filled",codeModel:e.jsx(j,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"filled",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Outlined",codeModel:e.jsx(v,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Description",codeModel:e.jsx(g,{}),children:e.jsxs(s,{spacing:1,children:[e.jsxs(i,{severity:"error",children:[e.jsx(n,{children:"Error"}),"This is an error alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"warning",children:[e.jsx(n,{children:"Warning"}),"This is a warning alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"info",children:[e.jsx(n,{children:"Info"}),"This is an info alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"success",children:[e.jsx(n,{children:"Success"}),"This is a success alert — ",e.jsx("strong",{children:"check it out!"})]})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Action",codeModel:e.jsx(A,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"filled",severity:"warning",onClose:()=>{},children:"This is a success alert — check it out!"}),e.jsx(i,{variant:"filled",severity:"info",action:e.jsx(c,{color:"inherit",size:"small",children:"UNDO"}),children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsxs(r,{title:"Transition",codeModel:e.jsx(k,{}),children:[e.jsx(s,{spacing:1,children:e.jsx(x,{in:o,children:e.jsx(i,{variant:"filled",severity:"info",sx:{mb:1},action:e.jsx(f,{"aria-label":"close",color:"inherit",size:"small",onClick:()=>{a(!1)},children:e.jsx(d,{width:20})}),children:"Close me!"})})}),e.jsx(c,{disabled:o,variant:"contained",onClick:()=>{a(!0)},children:"Re-open"})]})})]})})]})};export{fe as default};
