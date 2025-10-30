import{j as e,r as p}from"./index-DDD7yp0g.js";import{B as u}from"./Breadcrumb-y7m_PrQR.js";import{P as x}from"./PageContainer-kiFKIuEi.js";import{C as t}from"./CodeDialog-t_U43CiB.js";import{P as r}from"./ParentCard-CTF0AMkY.js";import{B as m}from"./Box-CvBWjzNB.js";import{S as l,T as i}from"./TreeItem-Br9oj0Qt.js";import{S as I}from"./Stack-CGmQnD9O.js";import{B as h}from"./Button-B7OYtI5t.js";import{G as T}from"./Grid2-GkWFtmjY.js";import"./index.esm-C8f4hTIY.js";import"./Typography-L20TPdxk.js";import"./index-BwqtTtay.js";import"./createSvgIcon-uhi8bttA.js";import"./ButtonBase-DkEVVfaO.js";import"./useSlotProps-C46zRRjp.js";import"./resolveComponentProps-C82RdvJA.js";import"./Link-CTwuqG6R.js";import"./Paper-BlVDmG2s.js";import"./Tooltip-BEVTWZy4.js";import"./Popper-BlGESdCr.js";import"./getReactNodeRef-E0IqBXm7.js";import"./Portal-Cjwr5TOI.js";import"./utils-DFVYCFIa.js";import"./useControlled-Bv1_2TZl.js";import"./useId-B8IfysN2.js";import"./Grow-DZbCU7-Y.js";import"./IconButton-DRpyqdLq.js";import"./DialogContent-DZbiCGLJ.js";import"./Modal-DVnfNCFV.js";import"./ownerWindow-DppxFBj0.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-DLOajWAY.js";import"./DialogTitle-DMA9pl9N.js";import"./toConsumableArray-Deg2KNXw.js";import"./Card-B1UZbs-c.js";import"./CardHeader-D2q6eYVH.js";import"./Divider-CwEHe13b.js";import"./dividerClasses-Dpi_Mre1.js";import"./CardContent--215Oq_K.js";import"./Checkbox-W4nSJgyb.js";import"./SwitchBase-D46p_q13.js";import"./useFormControl-BfxcYShI.js";import"./Collapse-BxLm1WSX.js";import"./createStack-CWzxi_AG.js";import"./composeClasses-CT39Oeyw.js";import"./resolveProps-CxWqPvcr.js";function b(){return e.jsx(t,{children:`
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
