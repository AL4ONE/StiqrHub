import{j as t}from"./index-1gxxumks.js";import{P as m}from"./ParentCard-Clj2WW4G.js";import{C as o}from"./ChildCard-pU14VYQ6.js";import{B as d}from"./Breadcrumb-D-z1q2H7.js";import{P as n}from"./PageContainer-CcFGKzWT.js";import{C as s}from"./CustomSwitch-WrfISXMy.js";import{B as l}from"./Box-rTPpZw4U.js";import{S as e}from"./Switch-CIMJMtuj.js";import{F as a}from"./FormGroup-BlYvH6rZ.js";import{F as i}from"./FormControlLabel-BqfQq0Jn.js";import{C as c}from"./CodeDialog-B36fXwz1.js";import{G as r}from"./Grid2-CFjitul9.js";import"./Card-W1ZN2Ibg.js";import"./Typography-gBkIfv85.js";import"./Paper-CFTaduOC.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./index.esm-EJ29clj2.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./SwitchBase-CKvq49z_.js";import"./useFormControl-CbTsxQCq.js";import"./useControlled-DAcvgf1e.js";import"./formControlState-Dq1zat_P.js";import"./useSlot-Bz8-rvmW.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./composeClasses-CZn__ddx.js";const h=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(s,{checked:!0}),t.jsx(s,{}),t.jsx(s,{disabled:!0,defaultChecked:!0}),t.jsx(s,{disabled:!0})]}),x=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0}),t.jsx(e,{}),t.jsx(e,{disabled:!0,defaultChecked:!0}),t.jsx(e,{disabled:!0})]}),u=()=>t.jsx(l,{textAlign:"center",children:t.jsxs(a,{children:[t.jsx(i,{control:t.jsx(e,{defaultChecked:!0}),label:"Label"}),t.jsx(i,{disabled:!0,control:t.jsx(e,{}),label:"Disabled"})]})}),p=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0,size:"small"}),t.jsx(e,{defaultChecked:!0})]}),j=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0}),t.jsx(e,{defaultChecked:!0,color:"secondary"}),t.jsx(e,{defaultChecked:!0,color:"error"}),t.jsx(e,{defaultChecked:!0,color:"warning"}),t.jsx(e,{defaultChecked:!0,color:"success"}),t.jsx(e,{defaultChecked:!0,color:"default"})]}),f=()=>t.jsx(l,{textAlign:"center",children:t.jsxs(a,{"aria-label":"position",row:!0,children:[t.jsx(i,{value:"top",control:t.jsx(e,{color:"primary"}),label:"Top",labelPlacement:"top"}),t.jsx(i,{value:"start",control:t.jsx(e,{color:"primary"}),label:"Start",labelPlacement:"start"}),t.jsx(i,{value:"bottom",control:t.jsx(e,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),t.jsx(i,{value:"end",control:t.jsx(e,{color:"primary"}),label:"End",labelPlacement:"end"})]})}),w=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
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
