import{j as e,R as x}from"./index-1gxxumks.js";import{B as y}from"./Breadcrumb-D-z1q2H7.js";import{P as g}from"./PageContainer-CcFGKzWT.js";import{P as v}from"./ParentCard-Clj2WW4G.js";import{C as l}from"./ChildCard-pU14VYQ6.js";import{C as p}from"./CodeDialog-B36fXwz1.js";import{g as o}from"./index.esm-EJ29clj2.js";import{G as s}from"./Grid2-CFjitul9.js";import{A as r,a as n,b as i}from"./AccordionSummary-zqFX5gAL.js";import{T as a}from"./Typography-gBkIfv85.js";import{D as d}from"./Divider-jM7vrPYY.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Paper-CFTaduOC.js";import"./Box-rTPpZw4U.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./CardContent-Dj2ezXO9.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./composeClasses-CZn__ddx.js";import"./Collapse-Ba-4dC-4.js";import"./dividerClasses-T6l5cUjA.js";const A=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { IconChevronDown } from '@tabler/icons';

<Accordion>
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel1a-content"
        id="panel1a-header"
    >
        <Typography variant="h6">Accordion 1</Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="subtitle1" color="textSecondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo
        lobortis eget.
        </Typography>
    </AccordionDetails>
</Accordion>
<Divider />
<Accordion>
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel2a-content"
        id="panel2a-header"
    >
        <Typography variant="h6">Accordion 2</Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="subtitle1" color="textSecondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo
        lobortis eget.
        </Typography>
    </AccordionDetails>
    </Accordion>
    <Divider />
    <Accordion disabled>
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel3a-content"
        id="panel3a-header"
    >
        <Typography variant="h6">Disabled Accordion</Typography>
    </AccordionSummary>
    </Accordion>`})}),j=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { IconChevronDown } from '@tabler/icons';

<Accordion
    expanded={expanded === "panel1"}
    onChange={handleChange("panel1")}
    >
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
    >
        <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>
        General settings
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
        I am an accordion
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="subtitle1" color="textSecondary">
        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
        feugiat. Aliquam eget maximus est, id dignissim quam.
        </Typography>
    </AccordionDetails>
    </Accordion>
    <Accordion
    expanded={expanded === "panel2"}
    onChange={handleChange("panel2")}
    >
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
    >
        <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>
        Users
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
        You are currently not an owner
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="subtitle1" color="textSecondary">
        Donec placerat, lectus sed mattis semper, neque lectus
        feugiat lectus, varius pulvinar diam eros in elit.
        Pellentesque convallis laoreet laoreet.
        </Typography>
    </AccordionDetails>
    </Accordion>
    <Accordion
    expanded={expanded === "panel3"}
    onChange={handleChange("panel3")}
    >
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel3bh-content"
        id="panel3bh-header"
    >
        <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>
        Advanced settings
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
        Filtering has been entirely disabled for whole web server
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="subtitle1" color="textSecondary">
        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
        Integer sit amet egestas eros, vitae egestas augue. Duis vel
        est augue.
        </Typography>
    </AccordionDetails>
    </Accordion>
    <Accordion
    expanded={expanded === "panel4"}
    onChange={handleChange("panel4")}
    >
    <AccordionSummary
        expandIcon={<IconChevronDown />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
    >
        <Typography variant="h6" sx={{ width: "33%", flexShrink: 0 }}>
        Personal data
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="subtitle1" color="textSecondary">
        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
        Integer sit amet egestas eros, vitae egestas augue. Duis vel
        est augue.
        </Typography>
    </AccordionDetails>
    </Accordion>`})}),b=[{to:"/",title:"Home"},{title:"Accordion"}],de=()=>{const[t,h]=x.useState(!1),c=m=>(S,u)=>{h(u?m:!1)};return e.jsxs(g,{title:"Accordion",description:"this is Accordion page",children:[e.jsx(y,{title:"Accordion",items:b}),e.jsx(v,{title:"Accordion",children:e.jsxs(s,{container:!0,spacing:3,children:[e.jsx(s,{size:12,display:"flex",alignItems:"stretch",children:e.jsxs(l,{title:"Basic",codeModel:e.jsx(A,{}),children:[e.jsxs(r,{children:[e.jsx(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:e.jsx(a,{variant:"h6",children:"Accordion 1"})}),e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"textSecondary",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."})})]}),e.jsx(d,{}),e.jsxs(r,{children:[e.jsx(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel2a-content",id:"panel2a-header",children:e.jsx(a,{variant:"h6",children:"Accordion 2"})}),e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"textSecondary",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."})})]}),e.jsx(d,{}),e.jsx(r,{disabled:!0,children:e.jsx(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel3a-content",id:"panel3a-header",children:e.jsx(a,{variant:"h6",children:"Disabled Accordion"})})})]})}),e.jsx(s,{size:12,display:"flex",alignItems:"stretch",children:e.jsxs(l,{title:"Controlled",codeModel:e.jsx(j,{}),children:[e.jsxs(r,{expanded:t==="panel1",onChange:c("panel1"),children:[e.jsxs(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel1bh-content",id:"panel1bh-header",children:[e.jsx(a,{variant:"h6",sx:{width:"47%",flexShrink:0},children:"General settings"}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:"I am an accordion"})]}),e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"textSecondary",children:"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."})})]}),e.jsxs(r,{expanded:t==="panel2",onChange:c("panel2"),children:[e.jsxs(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel2bh-content",id:"panel2bh-header",children:[e.jsx(a,{variant:"h6",sx:{width:"47%",flexShrink:0},children:"Users"}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:"You are currently not an owner"})]}),e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"textSecondary",children:"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."})})]}),e.jsxs(r,{expanded:t==="panel3",onChange:c("panel3"),children:[e.jsxs(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel3bh-content",id:"panel3bh-header",children:[e.jsx(a,{variant:"h6",sx:{width:"47%",flexShrink:0},children:"Advanced settings"}),e.jsx(a,{variant:"subtitle2",color:"textSecondary",children:"Filtering has been entirely disabled for whole web server"})]}),e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"textSecondary",children:"Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue."})})]}),e.jsxs(r,{expanded:t==="panel4",onChange:c("panel4"),children:[e.jsx(n,{expandIcon:e.jsx(o,{}),"aria-controls":"panel4bh-content",id:"panel4bh-header",children:e.jsx(a,{variant:"h6",sx:{width:"47%",flexShrink:0},children:"Personal data"})}),e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"textSecondary",children:"Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue."})})]})]})})]})})]})};export{de as default};
