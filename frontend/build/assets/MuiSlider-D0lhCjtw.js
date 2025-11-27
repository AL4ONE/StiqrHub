import{j as e,P as y,R as p}from"./index-1gxxumks.js";import{P as C}from"./ParentCard-Clj2WW4G.js";import{C as t}from"./ChildCard-pU14VYQ6.js";import{B as V}from"./Breadcrumb-D-z1q2H7.js";import{P as T}from"./PageContainer-CcFGKzWT.js";import{C as R}from"./CustomRangeSlider-BIyGIkyt.js";import{C as u}from"./CustomSlider-CzlriMHV.js";import{aI as c,aA as x}from"./index.esm-EJ29clj2.js";import{C as l}from"./CodeDialog-B36fXwz1.js";import{G as r}from"./Grid2-CFjitul9.js";import{B as o}from"./Box-CYUgu9wY.js";import{T as h}from"./Typography-gBkIfv85.js";import{S as a,a as w}from"./Slider-DBbsXdg4.js";import{S as M}from"./Stack-Ccyr-E3C.js";import"./Card-W1ZN2Ibg.js";import"./Paper-CFTaduOC.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./Box-rTPpZw4U.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./composeClasses-CZn__ddx.js";import"./clamp-DyuOe9kr.js";import"./visuallyHidden-Dan1xhjv.js";import"./isHostComponent-DVu5iVWx.js";import"./createStack-ByRgbIrg.js";const k=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '9px',
    borderRadius: '9px',
    opacity: '1',
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: () => theme.palette.secondary.main,
    width: '23px',
    height: '23px',
  },
  '& .MuiSlider-track': {
    height: '9px',
    borderRadius: '9px',
  },
}));

<CustomSlider defaultValue={30} aria-label="slider" />
`})}),I=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';
import { IconVolume, IconVolume2 } from '@tabler/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '9px',
    borderRadius: '9px',
    opacity: '1',
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: () => theme.palette.secondary.main,
    width: '23px',
    height: '23px',
  },
  '& .MuiSlider-track': {
    height: '9px',
    borderRadius: '9px',
  },
}));

<CustomSlider defaultValue={30} aria-label="volume slider" />
<Box display="flex" alignItems="center">
    <Typography>
        <IconVolume2 width={20} />
    </Typography>
    <Box ml="auto">
        <Typography>
            <IconVolume width={20} />
        </Typography>
    </Box>
</Box>
`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import { styled } from '@mui/material/styles';
import { IconVolume, IconVolume2 } from '@tabler/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SliderValueLabelProps } from '@mui/material/Slider';
import {SliderThumb} from '@mui/material/Slider';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '9px',
    borderRadius: '9px',
    opacity: '1',
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: () => theme.palette.secondary.main,
    width: '23px',
    height: '23px',
  },
  '& .MuiSlider-track': {
    height: '9px',
    borderRadius: '9px',
  },
}));

function AirbnbThumbComponent(props: SliderValueLabelProps) {
  const { children, ...other } = props;

  return (
    <SliderThumb {...other}>
      {children}
      <Box
        sx={{
          height: 9,
          width: '2px',
          backgroundColor: '#fff',
        }}
      />
      <Box
        sx={{
          height: '14px',
          width: '2px',
          backgroundColor: '#fff',
          ml: '2px',
        }}
      />
      <Box
        sx={{
          height: 9,
          width: '2px',
          backgroundColor: '#fff',
          ml: '2px',
        }}
      />
    </SliderThumb>
  );
}

<CustomRangeSlider
  components={{ Thumb: AirbnbThumbComponent }}
  getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
  defaultValue={[20, 40]}
/>
`})}),B=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import { Slider } from '@mui/material';

<Slider defaultValue={30} aria-label="slider" />
`})}),D=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import { Slider } from '@mui/material';

<Slider disabled defaultValue={30} aria-label="slider" />
`})}),g=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import React from 'react';
import { Slider } from '@mui/material';

  const [value, setValue] = React.useState(30);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value2, setValue2] = React.useState([20, 37]);
  const handleChange2 = (event2, newValue2) => {
    setValue2(newValue2);
  };

<Slider
    aria-label="Temperature"
    defaultValue={30}
    getAriaValueText={valuetext}
    valueLabelDisplay="auto"
    step={10}
    marks
    min={10}
    max={110}
/>
`})}),A=[{to:"/",title:"Home"},{title:"Slider"}],z=i=>`${i}°C`;function L(i){return`${i}°C`}const f=i=>{const{children:s,...m}=i;return e.jsxs(w,{...m,children:[s,e.jsx(o,{sx:{height:9,width:"2px",backgroundColor:"#fff"}}),e.jsx(o,{sx:{height:"14px",width:"2px",backgroundColor:"#fff",ml:"2px"}}),e.jsx(o,{sx:{height:9,width:"2px",backgroundColor:"#fff",ml:"2px"}})]})};f.propTypes={children:y.node};const ve=()=>{const[i,s]=p.useState(30),m=(d,n)=>{s(n)},[b,j]=p.useState([20,37]),S=(d,n)=>{j(n)};return e.jsxs(T,{title:"Slider",description:"this is Slider page",children:[e.jsx(V,{title:"Slider",items:A}),e.jsx(C,{title:"Slider",children:e.jsxs(r,{container:!0,spacing:3,children:[e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Custom",codeModel:e.jsx(k,{}),children:e.jsx(u,{defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsxs(t,{title:"Volume",codeModel:e.jsx(I,{}),children:[e.jsx(u,{defaultValue:30,"aria-label":"slider"}),e.jsxs(o,{display:"flex",alignItems:"center",children:[e.jsx(h,{children:e.jsx(c,{width:20})}),e.jsx(o,{ml:"auto",children:e.jsx(h,{children:e.jsx(x,{width:20})})})]})]})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Range",codeModel:e.jsx(v,{}),children:e.jsx(R,{components:{Thumb:f},getAriaLabel:d=>d===0?"Minimum price":"Maximum price",defaultValue:[20,40]})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Default",codeModel:e.jsx(B,{}),children:e.jsx(a,{defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Disabled",codeModel:e.jsx(D,{}),children:e.jsx(a,{disabled:!0,defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Volume",children:e.jsxs(M,{direction:"row",spacing:1,children:[e.jsx(c,{width:20}),e.jsx(a,{"aria-label":"Volume",value:i,onChange:m}),e.jsx(x,{width:20})]})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Discrete",codeModel:e.jsx(g,{}),children:e.jsx(a,{"aria-label":"Temperature",defaultValue:30,getAriaValueText:z,valueLabelDisplay:"auto",step:10,marks:!0,min:10,max:110})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Range Default",codeModel:e.jsx(g,{}),children:e.jsx(a,{getAriaLabel:()=>"Temperature range",value:b,onChange:S,valueLabelDisplay:"auto",getAriaValueText:L})})})]})})]})};export{ve as default};
