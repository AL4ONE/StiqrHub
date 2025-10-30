import{R as C,j as e}from"./index-DDD7yp0g.js";import{B as D}from"./Breadcrumb-y7m_PrQR.js";import{P as E}from"./PageContainer-kiFKIuEi.js";import{P as q}from"./ParentCard-CTF0AMkY.js";import{C as y}from"./ChildCard-DhGLD5NB.js";import{aT as H,aS as T,aR as w,aQ as M}from"./index.esm-C8f4hTIY.js";import{C as j}from"./CustomCheckbox-BCnDph55.js";import{G as c}from"./Grid2-GkWFtmjY.js";import{B as g}from"./Button-B7OYtI5t.js";import{P as B}from"./Paper-BlVDmG2s.js";import{L as G}from"./List-DMzfAv9C.js";import{L as O}from"./ListItemButton-Culx1Vp7.js";import{L as S}from"./ListItemIcon-DKWTlW0q.js";import{L as z}from"./ListItemText-VnIeX3HI.js";import{L as P}from"./ListItem-D-BHXdQl.js";import{S as F}from"./Stack-CGmQnD9O.js";import{C as N}from"./CardHeader-D2q6eYVH.js";import{D as Q}from"./Divider-CwEHe13b.js";import{C as A}from"./CodeDialog-t_U43CiB.js";import"./Typography-L20TPdxk.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./ButtonBase-DkEVVfaO.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./Box-CvBWjzNB.js";import"./Card-B1UZbs-c.js";import"./CardContent--215Oq_K.js";import"./Checkbox-W4nSJgyb.js";import"./SwitchBase-D46p_q13.js";import"./useFormControl-BfxcYShI.js";import"./useControlled-Bv1_2TZl.js";import"./composeClasses-CT39Oeyw.js";import"./resolveProps-CxWqPvcr.js";import"./listItemButtonClasses-BJsAkkEd.js";import"./listItemTextClasses-DO9sXsbo.js";import"./isHostComponent-DVu5iVWx.js";import"./isMuiElement-BQxZeA7w.js";import"./createStack-CWzxi_AG.js";import"./dividerClasses-Dpi_Mre1.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./useId-B8IfysN2.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-DLOajWAY.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";function p(t,r){return t.filter(n=>r.indexOf(n)===-1)}function R(t,r){return t.filter(n=>r.indexOf(n)!==-1)}const J=()=>{const[t,r]=C.useState([]),[n,h]=C.useState([0,1,2,3]),[l,m]=C.useState([4,5,6,7]),a=R(t,n),d=R(t,l),x=s=>()=>{const i=t.indexOf(s),o=[...t];i===-1?o.push(s):o.splice(i,1),r(o)},u=()=>{m(l.concat(n)),h([])},b=()=>{m(l.concat(a)),h(p(n,a)),r(p(t,a))},L=()=>{h(n.concat(d)),m(p(l,d)),r(p(t,d))},v=()=>{h(n.concat(l)),m([])},k=s=>e.jsx(B,{variant:"outlined",sx:{width:200,height:230,overflow:"auto"},children:e.jsxs(G,{dense:!0,component:"div",role:"list",children:[s.map(i=>{const o=`transfer-list-item-${i}-label`;return e.jsxs(O,{role:"listitem",onClick:x(i),children:[e.jsx(S,{children:e.jsx(j,{checked:t.indexOf(i)!==-1,tabIndex:-1,disableRipple:!0})}),e.jsx(z,{id:o,primary:`List item ${i+1}`})]},i)}),e.jsx(P,{})]})});return e.jsxs(c,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[e.jsx(c,{children:k(n)}),e.jsx(c,{children:e.jsxs(c,{container:!0,direction:"column",alignItems:"center",children:[e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:u,disabled:n.length===0,"aria-label":"move all right",children:e.jsx(H,{width:20,height:20})}),e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:b,disabled:a.length===0,"aria-label":"move selected right",children:e.jsx(T,{width:20,height:20})}),e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:L,disabled:d.length===0,"aria-label":"move selected left",children:e.jsx(w,{width:20,height:20})}),e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:v,disabled:l.length===0,"aria-label":"move all left",children:e.jsx(M,{width:20,height:20})})]})}),e.jsx(c,{children:k(l)})]})};function f(t,r){return t.filter(n=>r.indexOf(n)===-1)}function I(t,r){return t.filter(n=>r.indexOf(n)!==-1)}function K(t,r){return[...t,...f(r,t)]}const U=()=>{const[t,r]=C.useState([]),[n,h]=C.useState([0,1,2,3]),[l,m]=C.useState([4,5,6,7]),a=I(t,n),d=I(t,l),x=s=>()=>{const i=t.indexOf(s),o=[...t];i===-1?o.push(s):o.splice(i,1),r(o)},u=s=>I(t,s).length,b=s=>()=>{u(s)===s.length?r(f(t,s)):r(K(t,s))},L=()=>{m(l.concat(a)),h(f(n,a)),r(f(t,a))},v=()=>{h(n.concat(d)),m(f(l,d)),r(f(t,d))},k=(s,i)=>e.jsxs(B,{variant:"outlined",children:[e.jsx(N,{sx:{px:2},avatar:e.jsx(j,{onClick:b(i),checked:u(i)===i.length&&i.length!==0,indeterminate:u(i)!==i.length&&u(i)!==0,disabled:i.length===0}),title:s,subheader:`${u(i)}/${i.length} selected`}),e.jsx(Q,{}),e.jsxs(G,{sx:{width:200,height:230,overflow:"auto"},dense:!0,component:"div",role:"list",children:[i.map(o=>{const $=`transfer-list-all-item-${o}-label`;return e.jsxs(O,{role:"listitem",onClick:x(o),children:[e.jsx(S,{children:e.jsx(j,{checked:t.indexOf(o)!==-1,tabIndex:-1,disableRipple:!0})}),e.jsx(z,{id:$,primary:`List item ${o+1}`})]},o)}),e.jsx(P,{})]})]});return e.jsxs(c,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[e.jsx(c,{children:k("Choices",n)}),e.jsx(c,{children:e.jsxs(F,{spacing:1,children:[e.jsx(g,{variant:"outlined",size:"small",onClick:L,disabled:a.length===0,"aria-label":"move selected right",children:e.jsx(T,{width:20,height:20})}),e.jsx(g,{variant:"outlined",size:"small",onClick:v,disabled:d.length===0,"aria-label":"move selected left",children:e.jsx(w,{width:20,height:20})})]})}),e.jsx(c,{children:k("Chosen",l)})]})},V=()=>e.jsx(e.Fragment,{children:e.jsx(A,{children:`
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { List, ListItem, ListItemIcon, ListItemText, Button, Paper } from '@mui/material';

import {
  IconChevronRight,
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons';

import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const BasicTransferList = () => {
const [checked, setChecked] = React.useState<readonly number[]>([]);
const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

const leftChecked = intersection(checked, left);
const rightChecked = intersection(checked, right);

const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
};

const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
};

const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
};

const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
};
const theme = useTheme();
const borderColor = theme.palette.divider;

const customList = (items: readonly number[]) => (
    <Paper
      variant="outlined"
      sx={{ width: 200, height: 230, overflow: 'auto', border: '1px solid {borderColor}' }}
    >
        <List dense component="div" role="list">
            {items.map((value) => {
                const labelId = 'transfer-list-item-{value}-label';
                return (
                    <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                                <CustomCheckbox
                                    tabIndex={-1}
                                    disableRipple
                                    checked={checked.indexOf(value) !== -1}
                        />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={'List item {value + 1}'} />
                    </ListItem>
                );
            })}
        </List>
    </Paper>
);

return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid>{customList(left)}</Grid>
            <Grid>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        <IconChevronsRight width={20} height={20} />
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <IconChevronRight width={20} height={20} />
                   </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        <IconChevronLeft width={20} height={20} />
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        <IconChevronsLeft width={20} height={20} />
                    </Button>
                </Grid>
            </Grid>
        <Grid>{customList(right)}</Grid>
    </Grid>
    );
};`})}),W=()=>e.jsx(e.Fragment,{children:e.jsx(A,{children:`
import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  CardHeader,
  Stack,
  Paper,
} from '@mui/material';

import Grid from '@mui/material/Grid2';

import { IconChevronRight, IconChevronLeft } from '@tabler/icons';

import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

const EnhancedTransferList = () => {
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Paper variant="outlined" sx={{ border: '1px solid {borderColor}' }}>
      <CardHeader
        sx={{ px: 2 }}
        avatar={
          <CustomCheckbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
           
          />
        }
        title={title}
        subheader={'{numberOfChecked(items)}/{items.length} selected'}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = 'transfer-list-all-item-{value}-label';

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <CustomCheckbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={'List item {value + 1}'} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid>{customList('Choices', left)}</Grid>
      <Grid>
        <Stack spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <IconChevronRight width={20} height={20} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <IconChevronLeft width={20} height={20} />
          </Button>
        </Stack>
      </Grid>
      <Grid>{customList('Chosen', right)}</Grid>
    </Grid>
  );
};`})}),X=[{to:"/",title:"Home"},{title:"Transfer List"}],_e=()=>e.jsxs(E,{title:"Transfer List",description:"this is Transfer List page",children:[e.jsx(D,{title:"Transfer List",items:X}),e.jsx(q,{title:"Transfer List",children:e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(y,{title:"Basic",codeModel:e.jsx(V,{}),children:e.jsx(J,{})})}),e.jsx(c,{size:12,display:"flex",alignItems:"stretch",children:e.jsx(y,{title:"Enhanced",codeModel:e.jsx(W,{}),children:e.jsx(U,{})})})]})})]});export{_e as default};
