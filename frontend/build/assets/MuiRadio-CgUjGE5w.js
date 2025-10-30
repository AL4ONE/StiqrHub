import{j as e,R as u}from"./index-DDD7yp0g.js";import{P as g}from"./ParentCard-CTF0AMkY.js";import{C as s}from"./ChildCard-DhGLD5NB.js";import{B as C}from"./Breadcrumb-y7m_PrQR.js";import{P as k}from"./PageContainer-kiFKIuEi.js";import{C as t}from"./CustomRadio-CMpsk621.js";import{B as d}from"./Box-CvBWjzNB.js";import{F as n}from"./FormControlLabel-BOoebw1C.js";import{R as l}from"./Radio-Btk6dkQ1.js";import{R}from"./RadioGroup-B0tuNoOS.js";import{C as m}from"./CodeDialog-t_U43CiB.js";import{G as c}from"./Grid2-GkWFtmjY.js";import"./Card-B1UZbs-c.js";import"./Typography-L20TPdxk.js";import"./Paper-BlVDmG2s.js";import"./CardHeader-D2q6eYVH.js";import"./Divider-CwEHe13b.js";import"./dividerClasses-Dpi_Mre1.js";import"./CardContent--215Oq_K.js";import"./index.esm-C8f4hTIY.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./ButtonBase-DkEVVfaO.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./formControlState-Dq1zat_P.js";import"./useSlot-DLOajWAY.js";import"./useFormControl-BfxcYShI.js";import"./SwitchBase-D46p_q13.js";import"./useControlled-Bv1_2TZl.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useId-B8IfysN2.js";import"./FormGroup-DfAdZqSs.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";import"./composeClasses-CT39Oeyw.js";const f=()=>e.jsxs(d,{textAlign:"center",children:[e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"primary",checked:!0}),label:"Primary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"secondary",checked:!0}),label:"Secondary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"success",checked:!0}),label:"Success",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"error",checked:!0}),label:"Error",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"warning",checked:!0}),label:"Warning",labelPlacement:"end"})]}),x={inputProps:{"aria-label":"Checkbox demo"}},j=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,...x}),e.jsx(l,{disabled:!0,...x}),e.jsx(l,{color:"default",...x})]})},h={inputProps:{"aria-label":"Checkbox demo"}},y=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,color:"primary",...h}),e.jsx(l,{checked:a,onChange:r,color:"secondary",...h}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.success.main,"&.Mui-checked":{color:o=>o.palette.success.main}}}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.error.main,"&.Mui-checked":{color:o=>o.palette.error.main}}}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.warning.main,"&.Mui-checked":{color:o=>o.palette.warning.main}}})]})},P=()=>{const[a,i]=u.useState("a"),r=p=>{i(p.target.value)},o=p=>({checked:a===p,onChange:r,value:p,name:"size-radio-button-demo",inputProps:{"aria-label":p}});return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{...o("a"),size:"small"}),e.jsx(l,{...o("b")}),e.jsx(l,{...o("c"),sx:{"& .MuiSvgIcon-root":{fontSize:28}}})]})},b={inputProps:{"aria-label":"Checkbox demo"}},B=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(t,{checked:a,onChange:r,...b}),e.jsx(t,{disabled:!0,...b}),e.jsx(t,{color:"default",...b})]})},v=()=>e.jsx(d,{textAlign:"center",children:e.jsxs(R,{row:!0,"aria-label":"position",name:"position",defaultValue:"top",children:[e.jsx(n,{value:"top",control:e.jsx(t,{}),label:"Top",labelPlacement:"top"}),e.jsx(n,{value:"start",control:e.jsx(t,{}),label:"Start",labelPlacement:"start"}),e.jsx(n,{value:"bottom",control:e.jsx(t,{}),label:"Bottom",labelPlacement:"bottom"}),e.jsx(n,{value:"end",control:e.jsx(t,{}),label:"End"})]})}),S=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      {...props}
    />
  );
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
      <CustomRadio checked={checked} onChange={handleChange} {...label} />

      <CustomRadio disabled {...label} />
      <CustomRadio color="default" {...label} />
</Box>
`})}),I=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      {...props}
    />
  );
}


<Box textAlign="center">
    <FormControlLabel
        value="end"
        control={<CustomRadio color="primary" checked />}
        label="Primary"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="secondary" checked />}
        label="Secondary"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="success" checked />}
        label="Success"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="error" checked />}
        label="Danger"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="warning" checked />}
        label="Warning"
        labelPlacement="end"
    />
</Box>`})}),w=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, Radio } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <Radio checked={checked} onChange={handleChange} {...label} />

    <Radio disabled {...label} />
    <Radio color="default" {...label} />
</Box>
`})}),F=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, Radio } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
      <Radio checked={checked} onChange={handleChange} color="primary" {...label} />

      <Radio checked={checked} onChange={handleChange} color="secondary" {...label} />

      <Radio
        checked={checked}
        onChange={handleChange}
        {...label}
        sx={{
          color: (theme) => theme.palette.success.main,
          '&.Mui-checked': {
            color: (theme) => theme.palette.success.main,
          },
        }}
      />

      <Radio
        checked={checked}
        onChange={handleChange}
        {...label}
        sx={{
          color: (theme) => theme.palette.error.main,
          '&.Mui-checked': {
            color: (theme) => theme.palette.error.main,
          },
        }}
      />

      <Radio
        checked={checked}
        onChange={handleChange}
        {...label}
        sx={{
          color: (theme) => theme.palette.warning.main,
          '&.Mui-checked': {
            color: (theme) => theme.palette.warning.main,
          },
        }}
      />
    </Box>
`})}),M=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, Radio } from '@mui/material';

const [selectedValue, setSelectedValue] = React.useState('a');
const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
};
    
const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange2,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
});

<Box textAlign="center">
    <Radio {...controlProps('a')} size="small" />
    <Radio {...controlProps('b')} />
    <Radio
        {...controlProps('c')}
        sx={{
            '& .MuiSvgIcon-root': {
                fontSize: 28,
            },
        }}
    />
</Box>`})}),z=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import React from 'react';
import { Box, RadioGroup, FormControlLabel  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      {...props}
    />
  );
}

<Box textAlign="center">
    <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel value="top" control={<CustomRadio />} label="Top" labelPlacement="top" />
        <FormControlLabel
            value="start"
            control={<CustomRadio />}
            label="Start"
            labelPlacement="start"
        />
        <FormControlLabel
            value="bottom"
            control={<CustomRadio />}
            label="Bottom"
            labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<CustomRadio />} label="End" />
    </RadioGroup>
</Box>
`})}),L=[{to:"/",title:"Home"},{title:"Radio"}],Se=()=>e.jsxs(k,{title:"Radio",description:"this is Radio page",children:[e.jsx(C,{title:"Radio",items:L}),e.jsx(g,{title:"Radio",children:e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Custom",codeModel:e.jsx(S,{}),children:e.jsx(B,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Color with Label",codeModel:e.jsx(I,{}),children:e.jsx(f,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default",codeModel:e.jsx(w,{}),children:e.jsx(j,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default Colors",codeModel:e.jsx(F,{}),children:e.jsx(y,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Sizes",codeModel:e.jsx(M,{}),children:e.jsx(P,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Position",codeModel:e.jsx(z,{}),children:e.jsx(v,{})})})]})})]});export{Se as default};
