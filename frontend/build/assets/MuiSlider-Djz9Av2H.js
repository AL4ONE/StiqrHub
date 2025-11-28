import{j as e,P as y,R as p}from"./index-BvKsHq39.js";import{P as C}from"./ParentCard-CnqaPcOJ.js";import{C as t}from"./ChildCard-CAFP0Ce9.js";import{B as V}from"./Breadcrumb-D8hqt6RT.js";import{P as T}from"./PageContainer-B5n1q2IU.js";import{C as R}from"./CustomRangeSlider-CButQC9o.js";import{C as u}from"./CustomSlider-rutJq2qz.js";import{aI as c,aA as x}from"./index.esm-ugoV-OIv.js";import{C as l}from"./CodeDialog-DOO60z65.js";import{G as r}from"./Grid2-DRIhct5E.js";import{B as o}from"./Box-C4Sxuign.js";import{T as h}from"./Typography-Cd2fCHjT.js";import{S as a,a as w}from"./Slider-C2iQ4mcP.js";import{S as M}from"./Stack-D9c9E8OV.js";import"./Card-Chng94uH.js";import"./Paper-Dw9Z9lKu.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./Box-Cgsde7yB.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./getReactNodeRef-CeXiOENg.js";import"./Portal-Cu5WyFQi.js";import"./useControlled-CqszgbyI.js";import"./useId-DVmFICJa.js";import"./Grow-pYFqELkc.js";import"./utils-CfOsK_SU.js";import"./IconButton-VvYfEoZr.js";import"./DialogContent-aWxIG_p7.js";import"./Modal-CEdargRK.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BWQNm6rb.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./composeClasses-mRK-vHC7.js";import"./useThemeProps-03R8yy7c.js";import"./clamp-DyuOe9kr.js";import"./visuallyHidden-Dan1xhjv.js";import"./isHostComponent-DVu5iVWx.js";import"./createStack-_s5wtiSe.js";const k=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
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
`})}),A=[{to:"/",title:"Home"},{title:"Slider"}],z=i=>`${i}°C`;function L(i){return`${i}°C`}const f=i=>{const{children:s,...m}=i;return e.jsxs(w,{...m,children:[s,e.jsx(o,{sx:{height:9,width:"2px",backgroundColor:"#fff"}}),e.jsx(o,{sx:{height:"14px",width:"2px",backgroundColor:"#fff",ml:"2px"}}),e.jsx(o,{sx:{height:9,width:"2px",backgroundColor:"#fff",ml:"2px"}})]})};f.propTypes={children:y.node};const Be=()=>{const[i,s]=p.useState(30),m=(d,n)=>{s(n)},[b,j]=p.useState([20,37]),S=(d,n)=>{j(n)};return e.jsxs(T,{title:"Slider",description:"this is Slider page",children:[e.jsx(V,{title:"Slider",items:A}),e.jsx(C,{title:"Slider",children:e.jsxs(r,{container:!0,spacing:3,children:[e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Custom",codeModel:e.jsx(k,{}),children:e.jsx(u,{defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsxs(t,{title:"Volume",codeModel:e.jsx(I,{}),children:[e.jsx(u,{defaultValue:30,"aria-label":"slider"}),e.jsxs(o,{display:"flex",alignItems:"center",children:[e.jsx(h,{children:e.jsx(c,{width:20})}),e.jsx(o,{ml:"auto",children:e.jsx(h,{children:e.jsx(x,{width:20})})})]})]})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Range",codeModel:e.jsx(v,{}),children:e.jsx(R,{components:{Thumb:f},getAriaLabel:d=>d===0?"Minimum price":"Maximum price",defaultValue:[20,40]})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Default",codeModel:e.jsx(B,{}),children:e.jsx(a,{defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Disabled",codeModel:e.jsx(D,{}),children:e.jsx(a,{disabled:!0,defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Volume",children:e.jsxs(M,{direction:"row",spacing:1,children:[e.jsx(c,{width:20}),e.jsx(a,{"aria-label":"Volume",value:i,onChange:m}),e.jsx(x,{width:20})]})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Discrete",codeModel:e.jsx(g,{}),children:e.jsx(a,{"aria-label":"Temperature",defaultValue:30,getAriaValueText:z,valueLabelDisplay:"auto",step:10,marks:!0,min:10,max:110})})}),e.jsx(r,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Range Default",codeModel:e.jsx(g,{}),children:e.jsx(a,{getAriaLabel:()=>"Temperature range",value:b,onChange:S,valueLabelDisplay:"auto",getAriaValueText:L})})})]})})]})};export{Be as default};
