import{j as e}from"./index-BvKsHq39.js";import{B as p}from"./Breadcrumb-D8hqt6RT.js";import{P as a}from"./PageContainer-B5n1q2IU.js";import{u as s}from"./useTreeViewApiRef-DMU4Q77d.js";import{P as l}from"./ParentCard-CnqaPcOJ.js";import{C as d}from"./CodeDialog-DOO60z65.js";import{S as c}from"./Stack-BbwedUsx.js";import{B as n}from"./Button-DOY2dwR5.js";import{B as u}from"./Box-Cgsde7yB.js";import{S as x,T as i}from"./TreeItem-DCUUGqka.js";import{G as I}from"./Grid2-DRIhct5E.js";import"./index.esm-ugoV-OIv.js";import"./Typography-Cd2fCHjT.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Paper-Dw9Z9lKu.js";import"./Card-Chng94uH.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./getReactNodeRef-CeXiOENg.js";import"./Portal-Cu5WyFQi.js";import"./useControlled-CqszgbyI.js";import"./useId-DVmFICJa.js";import"./Grow-pYFqELkc.js";import"./utils-CfOsK_SU.js";import"./IconButton-VvYfEoZr.js";import"./DialogContent-aWxIG_p7.js";import"./Modal-CEdargRK.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BWQNm6rb.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./useThemeProps-03R8yy7c.js";import"./createStack-_s5wtiSe.js";import"./composeClasses-mRK-vHC7.js";import"./resolveProps-CxWqPvcr.js";import"./Checkbox-Bu8ytVKH.js";import"./SwitchBase-CoR_qOd3.js";import"./useFormControl-DVSm7LDD.js";import"./Collapse-DpFh-0ld.js";function T(){return e.jsx(d,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks/useTreeViewApiRef';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ApiMethodFocusItem ',
},
];
 
export default function ApiMethodFocusItem() {
    const apiRef = useTreeViewApiRef();
    const handleButtonClick = (event) => {
        apiRef.current?.focusItem(event, 'pickers');
    };

    return (
     
            <Stack spacing={2}>
                <div>
                    <Button onClick={handleButtonClick}>Focus pickers item</Button>
                </div>
                <Box sx={{ minHeight: 352, minWidth: 250 }}>
                    <SimpleTreeView apiRef={apiRef}>
                        <TreeItem itemId="grid" label="Data Grid">
                            <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                            <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                            <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                        </TreeItem>
                        <TreeItem itemId="pickers" label="Date and Time Pickers">
                            <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                            <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                        </TreeItem>
                        <TreeItem itemId="charts" label="Charts">
                            <TreeItem itemId="charts-community" label="@mui/x-charts" />
                        </TreeItem>
                        <TreeItem itemId="tree-view" label="Tree View">
                            <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
                        </TreeItem>
                    </SimpleTreeView>
                </Box>
            </Stack>
 
    );
}

            `})}function f(){const t=s(),m=o=>{var r;(r=t.current)==null||r.focusItem(o,"pickers")};return e.jsx(l,{title:"FocusItem Treeview",codeModel:e.jsx(T,{}),children:e.jsxs(c,{spacing:2,children:[e.jsx("div",{children:e.jsx(n,{onClick:m,children:"Focus pickers item"})}),e.jsx(u,{sx:{minHeight:352,minWidth:250},children:e.jsxs(x,{apiRef:t,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}const h=[{to:"/",title:"Home"},{title:"Simple Treeview "}],xe=()=>e.jsxs(a,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[e.jsx(p,{title:"Simple Treeview",items:h}),e.jsx(I,{container:!0,spacing:3,children:e.jsx(f,{})})]});export{xe as default};
