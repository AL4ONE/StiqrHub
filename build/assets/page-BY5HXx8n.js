import{j as e,r as s}from"./index-1gxxumks.js";import{B as c}from"./Breadcrumb-D-z1q2H7.js";import{P as p}from"./PageContainer-CcFGKzWT.js";import{P as r}from"./ParentCard-Clj2WW4G.js";import{C as m}from"./CodeDialog-B36fXwz1.js";import{B as a}from"./Box-rTPpZw4U.js";import{S as l,T as i}from"./TreeItem-Dpm-XJ5j.js";import{S as n}from"./Stack-C2qTYmUq.js";import{T as I}from"./Typography-gBkIfv85.js";import{G as x}from"./Grid2-CFjitul9.js";import"./index.esm-EJ29clj2.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Paper-CFTaduOC.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./Checkbox-Ce2uMhHt.js";import"./SwitchBase-CKvq49z_.js";import"./useFormControl-CbTsxQCq.js";import"./Collapse-Ba-4dC-4.js";import"./createStack-ByRgbIrg.js";import"./composeClasses-CZn__ddx.js";function u(){return e.jsx(m,{children:`
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
    `})}function h(){const[t,o]=s.useState(null);return e.jsx(r,{title:"Itemclicks  Treeview",codeModel:e.jsx(k,{}),children:e.jsxs(n,{spacing:2,children:[e.jsx(I,{children:t==null?"No item click recorded":`Last clicked item: ${t}`}),e.jsx(a,{sx:{minHeight:352,minWidth:300},children:e.jsxs(l,{onItemClick:(g,d)=>o(d),children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}const b=[{to:"/",title:"Home"},{title:"Simple Treeview "}],ne=()=>e.jsxs(p,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[e.jsx(c,{title:"Simple Treeview",items:b}),e.jsxs(x,{container:!0,spacing:3,children:[e.jsx(T,{}),e.jsx(h,{})]})]});export{ne as default};
