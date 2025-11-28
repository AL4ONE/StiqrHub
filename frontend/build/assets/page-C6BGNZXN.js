import{j as e,r as p}from"./index-1gxxumks.js";import{B as u}from"./Breadcrumb-D-z1q2H7.js";import{P as x}from"./PageContainer-CcFGKzWT.js";import{C as t}from"./CodeDialog-B36fXwz1.js";import{P as r}from"./ParentCard-Clj2WW4G.js";import{B as m}from"./Box-rTPpZw4U.js";import{S as l,T as i}from"./TreeItem-Dpm-XJ5j.js";import{S as I}from"./Stack-C2qTYmUq.js";import{B as h}from"./Button-DKNxixJp.js";import{G as T}from"./Grid2-CFjitul9.js";import"./index.esm-EJ29clj2.js";import"./Typography-gBkIfv85.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Paper-CFTaduOC.js";import"./Tooltip-Bdl85RHo.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./useId-CiwD3jSp.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./IconButton-R1j0HZ58.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./Checkbox-Ce2uMhHt.js";import"./SwitchBase-CKvq49z_.js";import"./useFormControl-CbTsxQCq.js";import"./Collapse-Ba-4dC-4.js";import"./createStack-ByRgbIrg.js";import"./composeClasses-CZn__ddx.js";import"./resolveProps-CxWqPvcr.js";function b(){return e.jsx(t,{children:`
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
title: 'MultiSelectTreeView ',
},
]; 

function MultiSelectTreeView() {
    return (
       
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView multiSelect>
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
     
    )
}

export default MultiSelectTreeView

              `})}function g(){return e.jsx(r,{title:"MultiSelect Treeview",codeModel:e.jsx(b,{}),children:e.jsx(m,{sx:{minHeight:352,minWidth:250},children:e.jsxs(l,{multiSelect:!0,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})})}function S(){return e.jsx(t,{children:`
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
title: 'CheckboxSelection ',
},
]; 

export default function CheckboxSelection() {
    return (
            <Box sx={{ minHeight: 352, minWidth: 290 }}>
                <SimpleTreeView checkboxSelection>
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


                `})}function j(){return e.jsx(r,{title:"CheckboxSelection",codeModel:e.jsx(S,{}),children:e.jsx(m,{sx:{minHeight:352,minWidth:290},children:e.jsxs(l,{checkboxSelection:!0,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})})}function k(){return e.jsx(t,{children:`
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Button from '@mui/material/Button';

 const BCrumb = [
{
to: '/',
title: 'Home',
},
{
title: 'ControlledSelectiontree ',
},
]; 


function ControlledSelectiontree() {
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleSelectedItemsChange = (event, ids) => {
        setSelectedItems(ids);
    };

    const handleSelectClick = () => {
        setSelectedItems((oldSelected) =>
            oldSelected.length === 0
                ? [
                    'grid',
                    'grid-community',
                    'grid-pro',
                    'grid-premium',
                    'pickers',
                    'pickers-community',
                    'pickers-pro',
                    'charts',
                    'charts-community',
                    'tree-view',
                    'tree-view-community',
                ]
                : [],
        );
    };

    return (
       

            <Stack spacing={2}>
                <div>
                    <Button onClick={handleSelectClick}>
                        {selectedItems.length === 0 ? 'Select all' : 'Unselect all'}
                    </Button>
                </div>
                <Box sx={{ minHeight: 352, minWidth: 250 }}>
                    <SimpleTreeView
                        selectedItems={selectedItems}
                        onSelectedItemsChange={handleSelectedItemsChange}
                        multiSelect
                    >
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
   
    )
}

export default ControlledSelectiontree
            
            `})}function w(){const[o,d]=p.useState([]),c=(a,n)=>{d(n)},s=()=>{d(a=>a.length===0?["grid","grid-community","grid-pro","grid-premium","pickers","pickers-community","pickers-pro","charts","charts-community","tree-view","tree-view-community"]:[])};return e.jsx(r,{title:"ControlledSelectiontree",codeModel:e.jsx(k,{}),children:e.jsxs(I,{spacing:2,children:[e.jsx("div",{children:e.jsx(h,{onClick:s,children:o.length===0?"Select all":"Unselect all"})}),e.jsx(m,{sx:{minHeight:352,minWidth:250},children:e.jsxs(l,{selectedItems:o,onSelectedItemsChange:c,multiSelect:!0,children:[e.jsxs(i,{itemId:"grid",label:"Data Grid",children:[e.jsx(i,{itemId:"grid-community",label:"@mui/x-data-grid"}),e.jsx(i,{itemId:"grid-pro",label:"@mui/x-data-grid-pro"}),e.jsx(i,{itemId:"grid-premium",label:"@mui/x-data-grid-premium"})]}),e.jsxs(i,{itemId:"pickers",label:"Date and Time Pickers",children:[e.jsx(i,{itemId:"pickers-community",label:"@mui/x-date-pickers"}),e.jsx(i,{itemId:"pickers-pro",label:"@mui/x-date-pickers-pro"})]}),e.jsx(i,{itemId:"charts",label:"Charts",children:e.jsx(i,{itemId:"charts-community",label:"@mui/x-charts"})}),e.jsx(i,{itemId:"tree-view",label:"Tree View",children:e.jsx(i,{itemId:"tree-view-community",label:"@mui/x-tree-view"})})]})})]})})}const v=[{to:"/",title:"Home"},{title:"Simple Treeview "}],be=()=>e.jsxs(x,{title:"Simple Treeview",description:"this is Simple Treeview ",children:[e.jsx(u,{title:"Simple Treeview",items:v}),e.jsxs(T,{container:!0,spacing:3,children:[e.jsx(g,{}),e.jsx(j,{}),e.jsx(w,{})]})]});export{be as default};
