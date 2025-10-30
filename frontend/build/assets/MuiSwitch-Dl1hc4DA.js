import{j as t}from"./index-DDD7yp0g.js";import{P as m}from"./ParentCard-CTF0AMkY.js";import{C as o}from"./ChildCard-DhGLD5NB.js";import{B as d}from"./Breadcrumb-y7m_PrQR.js";import{P as n}from"./PageContainer-kiFKIuEi.js";import{C as s}from"./CustomSwitch-DjzQOrwt.js";import{B as l}from"./Box-CvBWjzNB.js";import{S as e}from"./Switch-BUlJ5nOS.js";import{F as a}from"./FormGroup-DfAdZqSs.js";import{F as i}from"./FormControlLabel-BOoebw1C.js";import{C as c}from"./CodeDialog-t_U43CiB.js";import{G as r}from"./Grid2-GkWFtmjY.js";import"./Card-B1UZbs-c.js";import"./Typography-L20TPdxk.js";import"./Paper-BlVDmG2s.js";import"./CardHeader-D2q6eYVH.js";import"./Divider-CwEHe13b.js";import"./dividerClasses-Dpi_Mre1.js";import"./CardContent--215Oq_K.js";import"./index.esm-C8f4hTIY.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./ButtonBase-DkEVVfaO.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./SwitchBase-D46p_q13.js";import"./useFormControl-BfxcYShI.js";import"./useControlled-Bv1_2TZl.js";import"./formControlState-Dq1zat_P.js";import"./useSlot-DLOajWAY.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./useId-B8IfysN2.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./createChainedFunction-BO_9K8Jh.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";import"./composeClasses-CT39Oeyw.js";const h=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(s,{checked:!0}),t.jsx(s,{}),t.jsx(s,{disabled:!0,defaultChecked:!0}),t.jsx(s,{disabled:!0})]}),x=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0}),t.jsx(e,{}),t.jsx(e,{disabled:!0,defaultChecked:!0}),t.jsx(e,{disabled:!0})]}),u=()=>t.jsx(l,{textAlign:"center",children:t.jsxs(a,{children:[t.jsx(i,{control:t.jsx(e,{defaultChecked:!0}),label:"Label"}),t.jsx(i,{disabled:!0,control:t.jsx(e,{}),label:"Disabled"})]})}),p=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0,size:"small"}),t.jsx(e,{defaultChecked:!0})]}),j=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0}),t.jsx(e,{defaultChecked:!0,color:"secondary"}),t.jsx(e,{defaultChecked:!0,color:"error"}),t.jsx(e,{defaultChecked:!0,color:"warning"}),t.jsx(e,{defaultChecked:!0,color:"success"}),t.jsx(e,{defaultChecked:!0,color:"default"})]}),f=()=>t.jsx(l,{textAlign:"center",children:t.jsxs(a,{"aria-label":"position",row:!0,children:[t.jsx(i,{value:"top",control:t.jsx(e,{color:"primary"}),label:"Top",labelPlacement:"top"}),t.jsx(i,{value:"start",control:t.jsx(e,{color:"primary"}),label:"Start",labelPlacement:"start"}),t.jsx(i,{value:"bottom",control:t.jsx(e,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),t.jsx(i,{value:"end",control:t.jsx(e,{color:"primary"}),label:"End",labelPlacement:"end"})]})}),w=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { Box } from '@mui/material';

const CustomSwitch = styled((props: any) => <Switch {...props} />)(({ theme }) => ({
  '&.MuiSwitch-root': {
    width: '68px',
    height: '49px',
  },
  '&  .MuiButtonBase-root': {
    top: '6px',
    left: '6px',
  },
  '&  .MuiButtonBase-root.Mui-checked .MuiSwitch-thumb': {
    backgroundColor: 'primary.main',
  },
  '& .MuiSwitch-thumb': {
    width: '18px',
    height: '18px',
    borderRadius: '6px',
  },

  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    borderRadius: '5px',
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: 'primary',
        opacity: 0.18,
      },
    },
  },
}));

<Box textAlign="center">
    <CustomSwitch checked />
    <CustomSwitch />
    <CustomSwitch disabled defaultChecked />
    <CustomSwitch disabled />
</Box>
`})}),C=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked />
    <Switch />
    <Switch disabled defaultChecked />
    <Switch disabled />
</Box>
`})}),S=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Box, Switch, FormGroup, FormControlLabel } from '@mui/material';

<Box textAlign="center">
    <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
        <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
</Box>
`})}),b=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked size="small" />
    <Switch defaultChecked />
</Box>
`})}),g=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked />
    <Switch defaultChecked color="secondary" />
    <Switch defaultChecked color="error" />
    <Switch defaultChecked color="warning" />
    <Switch defaultChecked color="success" />
    <Switch defaultChecked color="default" />
</Box>
`})}),k=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Box, Switch, FormGroup, FormControlLabel } from '@mui/material';

<Box textAlign="center">
    <FormGroup aria-label="position" row>
        <FormControlLabel
            value="top"
            control={<Switch color="primary" />}
            label="Top"
            labelPlacement="top"
        />
        <FormControlLabel
            value="start"
            control={<Switch color="primary" />}
            label="Start"
            labelPlacement="start"
        />
        <FormControlLabel
            value="bottom"
            control={<Switch color="primary" />}
            label="Bottom"
            labelPlacement="bottom"
        />
        <FormControlLabel
            value="end"
            control={<Switch color="primary" />}
            label="End"
            labelPlacement="end"
        />
    </FormGroup>
</Box>
`})}),B=[{to:"/",title:"Home"},{title:"Switch"}],ft=()=>t.jsxs(n,{title:"Switch",description:"this is Switch page",children:[t.jsx(d,{title:"Switch",items:B}),t.jsx(m,{title:"Switch",children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Custom",codeModel:t.jsx(w,{}),children:t.jsx(h,{})})}),t.jsx(r,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Default",codeModel:t.jsx(C,{}),children:t.jsx(x,{})})}),t.jsx(r,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Default with Label",codeModel:t.jsx(S,{}),children:t.jsx(u,{})})}),t.jsx(r,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Sizes",codeModel:t.jsx(b,{}),children:t.jsx(p,{})})}),t.jsx(r,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Default Colors",codeModel:t.jsx(g,{}),children:t.jsx(j,{})})}),t.jsx(r,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Placement",codeModel:t.jsx(k,{}),children:t.jsx(f,{})})})]})})]});export{ft as default};
