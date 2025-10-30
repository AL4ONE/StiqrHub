import{j as e,R as T}from"./index-DDD7yp0g.js";import{B as p}from"./Breadcrumb-y7m_PrQR.js";import{P as g}from"./PageContainer-kiFKIuEi.js";import{P as C}from"./ParentCard-CTF0AMkY.js";import{C as s}from"./ChildCard-DhGLD5NB.js";import{C as d}from"./CodeDialog-t_U43CiB.js";import{j as I,a4 as f,aK as u}from"./index.esm-C8f4hTIY.js";import{G as n}from"./Grid2-GkWFtmjY.js";import{T as b,a as j,b as m}from"./TabPanel-DSyomr4H.js";import{B as o}from"./Box-CvBWjzNB.js";import{a as c,T as h}from"./Tabs-Bgfc3Y_Y.js";import{D as B}from"./Divider-CwEHe13b.js";import"./Typography-L20TPdxk.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./ButtonBase-DkEVVfaO.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./Paper-BlVDmG2s.js";import"./Card-B1UZbs-c.js";import"./CardHeader-D2q6eYVH.js";import"./CardContent--215Oq_K.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./useControlled-Bv1_2TZl.js";import"./useId-B8IfysN2.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-DLOajWAY.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";import"./composeClasses-CT39Oeyw.js";import"./composeClasses-O3bfDh63.js";import"./debounce-Be36O1Ab.js";import"./KeyboardArrowRight-Dh2-bAh4.js";import"./dividerClasses-Dpi_Mre1.js";const w=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                >
                  {COMMON_TAB.map((tab, index) => (
                    <Tab
                      key={tab.value}
                      icon={tab.icon}
                      label={tab.label}
                      value={tab.value}
                      disabled={tab.disabled}
                    />
                  ))}
                </Tabs>
                <Box backgroundColor="grey.100" mt={2}>
                  {COMMON_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={panel.value}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>`})}),P=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                >
                  {COMMON_TAB.map((tab, index) => (
                    <Tab
                      key={tab.value}
                      icon={tab.icon}
                      label={tab.label}
                      iconPosition="bottom"
                      value={tab.value}
                      disabled={tab.disabled}
                    />
                  ))}
                </Tabs>
                <Box backgroundColor="grey.100" mt={2}>
                  {COMMON_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={panel.value}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>`})}),O=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                >
                  {COMMON_TAB.map((tab, index) => (
                    <Tab
                      key={tab.value}
                      icon={tab.icon}
                      label={tab.label}
                      iconPosition="start"
                      value={tab.value}
                      disabled={tab.disabled}
                    />
                  ))}
                </Tabs>
                <Box backgroundColor="grey.100" mt={2}>
                  {COMMON_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={panel.value}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>`})}),M=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                >
                  {COMMON_TAB.map((tab, index) => (
                    <Tab
                      key={tab.value}
                      icon={tab.icon}
                      label={tab.label}
                      iconPosition="end"
                      value={tab.value}
                      disabled={tab.disabled}
                    />
                  ))}
                </Tabs>
                <Box backgroundColor="grey.100" mt={2}>
                  {COMMON_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={panel.value}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>`})}),L=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const SCROLLABLE_TAB = [
  { value: '1', icon: <IconUser width={20} height={20} />, label: 'Item 1' },
  { value: '2', icon: <IconUser width={20} height={20} />, label: 'Item 2' },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item 3' },
  { value: '4', icon: <IconUser width={20} height={20} />, label: 'Item 4' },
  { value: '5', icon: <IconUser width={20} height={20} />, label: 'Item 5' },
  { value: '6', icon: <IconUser width={20} height={20} />, label: 'Item 6' },
  { value: '7', icon: <IconUser width={20} height={20} />, label: 'Item 7' }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {SCROLLABLE_TAB.map((tab, index) => (
                    <Tab
                      key={tab.value}
                      icon={tab.icon}
                      label={tab.label}
                      iconPosition="top"
                      value={tab.value}
                      disabled={tab.disabled}
                    />
                  ))}
                </Tabs>
                <Box backgroundColor="grey.100" mt={2}>
                  {SCROLLABLE_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={panel.value}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>`})}),y=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Box>
                  <TabList
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {COMMON_TAB.map((tab, index) => (
                      <Tab key={tab.value} label={tab.label} value={String(index + 1)} />
                    ))}
                  </TabList>
                </Box>
                <Divider />
                <Box backgroundColor="grey.100" mt={2}>
                  {COMMON_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={String(index + 1)}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
`})}),A=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                >
                  {COMMON_TAB.map((tab, index) => (
                    <Tab key={tab.value} icon={tab.icon} value={tab.value} />
                  ))}
                </Tabs>
                <Box backgroundColor="grey.100" mt={2}>
                  {COMMON_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={panel.value}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
`})}),V=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import React from "react";
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const SCROLLABLE_TAB = [
  { value: '1', icon: <IconUser width={20} height={20} />, label: 'Item 1' },
  { value: '2', icon: <IconUser width={20} height={20} />, label: 'Item 2' },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item 3' },
  { value: '4', icon: <IconUser width={20} height={20} />, label: 'Item 4' },
  { value: '5', icon: <IconUser width={20} height={20} />, label: 'Item 5' },
  { value: '6', icon: <IconUser width={20} height={20} />, label: 'Item 6' },
  { value: '7', icon: <IconUser width={20} height={20} />, label: 'Item 7' }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
                <Box width="100%" gap={2} display="flex" flexGrow={1} sx={{ height: 224 }}>
                  <Tabs
                    value={value}
                    orientation="vertical"
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {SCROLLABLE_TAB.map((tab, index) => (
                      <Tab
                        key={tab.value}
                        icon={tab.icon}
                        label={tab.label}
                        iconPosition="top"
                        value={tab.value}
                        disabled={tab.disabled}
                      />
                    ))}
                  </Tabs>
                  <Box backgroundColor="grey.100" width="100%">
                    {SCROLLABLE_TAB.map((panel, index) => (
                      <TabPanel key={panel.value} value={panel.value}>
                        {panel.label}
                      </TabPanel>
                    ))}
                  </Box>
                </Box>
              </TabContext>`})}),k=[{to:"/",title:"Home"},{title:"Tabs"}],i=[{value:"1",icon:e.jsx(I,{width:20,height:20}),label:"Item One",disabled:!1},{value:"2",icon:e.jsx(f,{width:20,height:20}),label:"Item Two",disabled:!1},{value:"3",icon:e.jsx(u,{width:20,height:20}),label:"Item Three",disabled:!0}],x=[{value:"1",icon:e.jsx(u,{width:20,height:20}),label:"Item 1"},{value:"2",icon:e.jsx(u,{width:20,height:20}),label:"Item 2"},{value:"3",icon:e.jsx(u,{width:20,height:20}),label:"Item 3"},{value:"4",icon:e.jsx(u,{width:20,height:20}),label:"Item 4"},{value:"5",icon:e.jsx(u,{width:20,height:20}),label:"Item 5"},{value:"6",icon:e.jsx(u,{width:20,height:20}),label:"Item 6"},{value:"7",icon:e.jsx(u,{width:20,height:20}),label:"Item 7"}],Be=()=>{const[t,v]=T.useState("1"),r=(a,l)=>{v(l)};return e.jsxs(g,{title:"Tabs",description:"this is Tabs page",children:[e.jsx(p,{title:"Tabs",items:k}),e.jsx(C,{title:"Tabs",children:e.jsxs(n,{container:!0,spacing:3,children:[e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Text",codeModel:e.jsx(y,{}),children:e.jsxs(b,{value:t,children:[e.jsx(o,{children:e.jsx(j,{variant:"scrollable",scrollButtons:"auto",onChange:r,"aria-label":"lab API tabs example",children:i.map((a,l)=>e.jsx(c,{label:a.label,value:String(l+1)},a.value))})}),e.jsx(B,{}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:i.map((a,l)=>e.jsx(m,{value:String(l+1),children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon",codeModel:e.jsx(A,{}),children:e.jsxs(b,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,value:a.value},a.value))}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:i.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon with Label",codeModel:e.jsx(w,{}),children:e.jsxs(b,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:i.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon Bottom",codeModel:e.jsx(P,{}),children:e.jsxs(b,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"bottom",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:i.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon Left",codeModel:e.jsx(O,{}),children:e.jsxs(b,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"start",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:i.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon Right",codeModel:e.jsx(M,{}),children:e.jsxs(b,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"end",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:i.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Scrollable",codeModel:e.jsx(L,{}),children:e.jsxs(b,{value:t,children:[e.jsx(h,{value:t,onChange:r,"aria-label":"icon tabs example",variant:"scrollable",scrollButtons:"auto",children:x.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"top",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{backgroundColor:"grey.100",mt:2,children:x.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{size:{xs:12,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Vertical",codeModel:e.jsx(V,{}),children:e.jsx(b,{value:t,children:e.jsxs(o,{width:"100%",gap:2,display:"flex",flexGrow:1,sx:{height:224},children:[e.jsx(h,{value:t,orientation:"vertical",onChange:r,variant:"scrollable",scrollButtons:"auto",children:x.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"top",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{backgroundColor:"grey.100",width:"100%",children:x.map((a,l)=>e.jsx(m,{value:a.value,children:a.label},a.value))})]})})})})]})})]})};export{Be as default};
