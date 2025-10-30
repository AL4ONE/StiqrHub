import{j as e,R as x}from"./index-DDD7yp0g.js";import{B as y}from"./Breadcrumb-y7m_PrQR.js";import{P as g}from"./PageContainer-kiFKIuEi.js";import{P as v}from"./ParentCard-CTF0AMkY.js";import{C as l}from"./ChildCard-DhGLD5NB.js";import{C as p}from"./CodeDialog-t_U43CiB.js";import{g as o}from"./index.esm-C8f4hTIY.js";import{G as s}from"./Grid2-GkWFtmjY.js";import{A as r,a as n,b as i}from"./AccordionSummary-DB8jpifA.js";import{T as a}from"./Typography-L20TPdxk.js";import{D as d}from"./Divider-CwEHe13b.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./ButtonBase-DkEVVfaO.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./Paper-BlVDmG2s.js";import"./Box-CvBWjzNB.js";import"./Card-B1UZbs-c.js";import"./CardHeader-D2q6eYVH.js";import"./CardContent--215Oq_K.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./useControlled-Bv1_2TZl.js";import"./useId-B8IfysN2.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-DLOajWAY.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";import"./composeClasses-CT39Oeyw.js";import"./Collapse-BxLm1WSX.js";import"./dividerClasses-Dpi_Mre1.js";const A=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
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
