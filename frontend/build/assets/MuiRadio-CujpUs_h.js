import{j as e,R as u}from"./index-BvKsHq39.js";import{P as g}from"./ParentCard-CnqaPcOJ.js";import{C as s}from"./ChildCard-CAFP0Ce9.js";import{B as C}from"./Breadcrumb-D8hqt6RT.js";import{P as k}from"./PageContainer-B5n1q2IU.js";import{C as t}from"./CustomRadio-DCAi4f-8.js";import{B as d}from"./Box-Cgsde7yB.js";import{F as n}from"./FormControlLabel-CGb6HoDn.js";import{R as l}from"./Radio-CyKJ468S.js";import{R}from"./RadioGroup-DL3uB9jD.js";import{C as m}from"./CodeDialog-DOO60z65.js";import{G as c}from"./Grid2-DRIhct5E.js";import"./Card-Chng94uH.js";import"./Typography-Cd2fCHjT.js";import"./Paper-Dw9Z9lKu.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./index.esm-ugoV-OIv.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./formControlState-Dq1zat_P.js";import"./useSlot-BWQNm6rb.js";import"./useFormControl-DVSm7LDD.js";import"./SwitchBase-CoR_qOd3.js";import"./useControlled-CqszgbyI.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useId-DVmFICJa.js";import"./FormGroup-Cr4I5_IA.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./getReactNodeRef-CeXiOENg.js";import"./Portal-Cu5WyFQi.js";import"./Grow-pYFqELkc.js";import"./utils-CfOsK_SU.js";import"./IconButton-VvYfEoZr.js";import"./DialogContent-aWxIG_p7.js";import"./Modal-CEdargRK.js";import"./ownerWindow-DrjrctJu.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./composeClasses-mRK-vHC7.js";import"./useThemeProps-03R8yy7c.js";const f=()=>e.jsxs(d,{textAlign:"center",children:[e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"primary",checked:!0}),label:"Primary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"secondary",checked:!0}),label:"Secondary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"success",checked:!0}),label:"Success",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"error",checked:!0}),label:"Error",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"warning",checked:!0}),label:"Warning",labelPlacement:"end"})]}),x={inputProps:{"aria-label":"Checkbox demo"}},j=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,...x}),e.jsx(l,{disabled:!0,...x}),e.jsx(l,{color:"default",...x})]})},h={inputProps:{"aria-label":"Checkbox demo"}},y=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,color:"primary",...h}),e.jsx(l,{checked:a,onChange:r,color:"secondary",...h}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.success.main,"&.Mui-checked":{color:o=>o.palette.success.main}}}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.error.main,"&.Mui-checked":{color:o=>o.palette.error.main}}}),e.jsx(l,{checked:a,onChange:r,...h,sx:{color:o=>o.palette.warning.main,"&.Mui-checked":{color:o=>o.palette.warning.main}}})]})},P=()=>{const[a,i]=u.useState("a"),r=p=>{i(p.target.value)},o=p=>({checked:a===p,onChange:r,value:p,name:"size-radio-button-demo",inputProps:{"aria-label":p}});return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{...o("a"),size:"small"}),e.jsx(l,{...o("b")}),e.jsx(l,{...o("c"),sx:{"& .MuiSvgIcon-root":{fontSize:28}}})]})},b={inputProps:{"aria-label":"Checkbox demo"}},B=()=>{const[a,i]=u.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(t,{checked:a,onChange:r,...b}),e.jsx(t,{disabled:!0,...b}),e.jsx(t,{color:"default",...b})]})},v=()=>e.jsx(d,{textAlign:"center",children:e.jsxs(R,{row:!0,"aria-label":"position",name:"position",defaultValue:"top",children:[e.jsx(n,{value:"top",control:e.jsx(t,{}),label:"Top",labelPlacement:"top"}),e.jsx(n,{value:"start",control:e.jsx(t,{}),label:"Start",labelPlacement:"start"}),e.jsx(n,{value:"bottom",control:e.jsx(t,{}),label:"Bottom",labelPlacement:"bottom"}),e.jsx(n,{value:"end",control:e.jsx(t,{}),label:"End"})]})}),S=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
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
`})}),L=[{to:"/",title:"Home"},{title:"Radio"}],Ie=()=>e.jsxs(k,{title:"Radio",description:"this is Radio page",children:[e.jsx(C,{title:"Radio",items:L}),e.jsx(g,{title:"Radio",children:e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Custom",codeModel:e.jsx(S,{}),children:e.jsx(B,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Color with Label",codeModel:e.jsx(I,{}),children:e.jsx(f,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default",codeModel:e.jsx(w,{}),children:e.jsx(j,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default Colors",codeModel:e.jsx(F,{}),children:e.jsx(y,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Sizes",codeModel:e.jsx(M,{}),children:e.jsx(P,{})})}),e.jsx(c,{size:{xs:12,lg:6,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Position",codeModel:e.jsx(z,{}),children:e.jsx(v,{})})})]})})]});export{Ie as default};
