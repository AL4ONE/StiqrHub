import{j as e,R as h}from"./index-BvKsHq39.js";import{q as d}from"./index.esm-ugoV-OIv.js";import{B as m}from"./Breadcrumb-D8hqt6RT.js";import{P as p}from"./PageContainer-B5n1q2IU.js";import{P as u}from"./ParentCard-CnqaPcOJ.js";import{C as r}from"./ChildCard-CAFP0Ce9.js";import{C as l}from"./CodeDialog-DOO60z65.js";import{G as t}from"./Grid2-DRIhct5E.js";import{S as s}from"./Stack-BbwedUsx.js";import{A as i}from"./Alert-B13cQAqU.js";import{A as n}from"./AlertTitle-C2SfmW9J.js";import{B as c}from"./Button-DOY2dwR5.js";import{C as x}from"./Collapse-DpFh-0ld.js";import{I as f}from"./IconButton-VvYfEoZr.js";import"./Typography-Cd2fCHjT.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Paper-Dw9Z9lKu.js";import"./Box-Cgsde7yB.js";import"./Card-Chng94uH.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./getReactNodeRef-CeXiOENg.js";import"./Portal-Cu5WyFQi.js";import"./useControlled-CqszgbyI.js";import"./useId-DVmFICJa.js";import"./Grow-pYFqELkc.js";import"./utils-CfOsK_SU.js";import"./DialogContent-aWxIG_p7.js";import"./Modal-CEdargRK.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BWQNm6rb.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./composeClasses-mRK-vHC7.js";import"./useThemeProps-03R8yy7c.js";import"./createStack-_s5wtiSe.js";import"./Close-DygSBxP3.js";import"./resolveProps-CxWqPvcr.js";const j=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
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
</Button>`})}),T=[{to:"/",title:"Home"},{title:"Alert"}],je=()=>{const[o,a]=h.useState(!0);return e.jsxs(p,{title:"Alert",description:"this is Alert page",children:[e.jsx(m,{title:"Alert",items:T}),e.jsx(u,{title:"Alert",children:e.jsxs(t,{container:!0,spacing:3,children:[e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Basic",children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{severity:"error",icon:!1,children:"This is an error alert — check it out!"}),e.jsx(i,{severity:"warning",icon:!1,children:"This is a warning alert — check it out!"}),e.jsx(i,{severity:"info",icon:!1,children:"This is an info alert — check it out!"}),e.jsx(i,{severity:"success",icon:!1,children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Filled",codeModel:e.jsx(j,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"filled",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(i,{variant:"filled",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Outlined",codeModel:e.jsx(v,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(i,{variant:"outlined",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Description",codeModel:e.jsx(g,{}),children:e.jsxs(s,{spacing:1,children:[e.jsxs(i,{severity:"error",children:[e.jsx(n,{children:"Error"}),"This is an error alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"warning",children:[e.jsx(n,{children:"Warning"}),"This is a warning alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"info",children:[e.jsx(n,{children:"Info"}),"This is an info alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(i,{severity:"success",children:[e.jsx(n,{children:"Success"}),"This is a success alert — ",e.jsx("strong",{children:"check it out!"})]})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Action",codeModel:e.jsx(A,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(i,{variant:"filled",severity:"warning",onClose:()=>{},children:"This is a success alert — check it out!"}),e.jsx(i,{variant:"filled",severity:"info",action:e.jsx(c,{color:"inherit",size:"small",children:"UNDO"}),children:"This is a success alert — check it out!"})]})})}),e.jsx(t,{size:12,display:"flex",alignItems:"stretch",children:e.jsxs(r,{title:"Transition",codeModel:e.jsx(k,{}),children:[e.jsx(s,{spacing:1,children:e.jsx(x,{in:o,children:e.jsx(i,{variant:"filled",severity:"info",sx:{mb:1},action:e.jsx(f,{"aria-label":"close",color:"inherit",size:"small",onClick:()=>{a(!1)},children:e.jsx(d,{width:20})}),children:"Close me!"})})}),e.jsx(c,{disabled:o,variant:"contained",onClick:()=>{a(!0)},children:"Re-open"})]})})]})})]})};export{je as default};
