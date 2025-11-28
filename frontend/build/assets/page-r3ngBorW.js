import{j as e,r as s}from"./index-BvKsHq39.js";import{B as c}from"./Breadcrumb-D8hqt6RT.js";import{P as p}from"./PageContainer-B5n1q2IU.js";import{P as r}from"./ParentCard-CnqaPcOJ.js";import{C as m}from"./CodeDialog-DOO60z65.js";import{B as a}from"./Box-Cgsde7yB.js";import{S as l,T as i}from"./TreeItem-DCUUGqka.js";import{S as n}from"./Stack-BbwedUsx.js";import{T as I}from"./Typography-Cd2fCHjT.js";import{G as x}from"./Grid2-DRIhct5E.js";import"./index.esm-ugoV-OIv.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Paper-Dw9Z9lKu.js";import"./Card-Chng94uH.js";import"./CardHeader-CutR81r4.js";import"./Divider-D5riNfjf.js";import"./dividerClasses-Cy-AcaV9.js";import"./CardContent-Cx1RTDA8.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./getReactNodeRef-CeXiOENg.js";import"./Portal-Cu5WyFQi.js";import"./useControlled-CqszgbyI.js";import"./useId-DVmFICJa.js";import"./Grow-pYFqELkc.js";import"./utils-CfOsK_SU.js";import"./IconButton-VvYfEoZr.js";import"./DialogContent-aWxIG_p7.js";import"./Modal-CEdargRK.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BWQNm6rb.js";import"./DialogTitle-Bf135FLy.js";import"./toConsumableArray-JHbr3TM4.js";import"./useThemeProps-03R8yy7c.js";import"./Checkbox-Bu8ytVKH.js";import"./SwitchBase-CoR_qOd3.js";import"./useFormControl-DVSm7LDD.js";import"./Collapse-DpFh-0ld.js";import"./createStack-_s5wtiSe.js";import"./composeClasses-mRK-vHC7.js";function u(){return e.jsx(m,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'BasicSimpleTreeView ',
},
]; 


export default function BasicSimpleTreeView() {
    return (

        <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView>
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

    );
}

            `})}function T(){return e.jsx(r,{title:"Basic Treeview",codeModel:e.jsx(u,{}),children:e.jsx(a,{sx:{minHeight:352,minWidth:250},children:e.jsxs(l,{children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})})}function k(){return e.jsx(m,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'TrackitemclicksTree ',
},
]; 

function TrackitemclicksTree() {
    const [lastClickedItem, setLastClickedItem] = React.useState(null);
    return (
       
            <Stack spacing={2}>
                <Typography>
                    {lastClickedItem == null
                        ? 'No item click recorded'
                        : \`Last clicked item: \${lastClickedItem}\`}
                </Typography>
                <Box sx={{ minHeight: 352, minWidth: 300 }}>
                    <SimpleTreeView onItemClick={(event, itemId) => setLastClickedItem(itemId)}>
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
            </Stack >
     
    );
}

export default TrackitemclicksTree
    `})}function h(){const[t,o]=s.useState(null);return e.jsx(r,{title:"Itemclicks  Treeview",codeModel:e.jsx(k,{}),children:e.jsxs(n,{spacing:2,children:[e.jsx(I,{children:t==null?"No item click recorded":`Last clicked item: ${t}`}),e.jsx(a,{sx:{minHeight:352,minWidth:300},children:e.jsxs(l,{onItemClick:(g,d)=>o(d),children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}const b=[{to:"/",title:"Home"},{title:"Simple Treeview "}],Ie=()=>e.jsxs(p,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[e.jsx(c,{title:"Simple Treeview",items:b}),e.jsxs(x,{container:!0,spacing:3,children:[e.jsx(T,{}),e.jsx(h,{})]})]});export{Ie as default};
