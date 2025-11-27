import{a$ as q,b9 as J,r as U,af as Q,j as t}from"./index-1gxxumks.js";import{B as tt}from"./Breadcrumb-D-z1q2H7.js";import{P as ot}from"./PageContainer-CcFGKzWT.js";import{P as H}from"./ParentCard-Clj2WW4G.js";import{C as s}from"./ChildCard-pU14VYQ6.js";import{S as a}from"./Stack-C2qTYmUq.js";import{B as o,a as nt}from"./Button-DKNxixJp.js";import{z as E,t as b,as as u,X as rt,aE as et,ax as G,ay as F,az as L,aF as R,aG as M,aH as O}from"./index.esm-EJ29clj2.js";import{a as Y,g as _,s as C,d as w,m as W,i as it,c as at,b as lt}from"./Typography-gBkIfv85.js";import{r as st}from"./resolveProps-CxWqPvcr.js";import{u as ct}from"./useId-CiwD3jSp.js";import{c as dt}from"./composeClasses-O3bfDh63.js";import{T as d}from"./Tooltip-Bdl85RHo.js";import{I as y}from"./IconButton-R1j0HZ58.js";import{F as x}from"./Fab--r1vUjtA.js";import{B as i}from"./ButtonGroup-Dc1tKjND.js";import{C as c}from"./CodeDialog-B36fXwz1.js";import{G as e}from"./Grid2-CFjitul9.js";import"./index-BwqtTtay.js";import"./createSvgIcon-IgGUew4I.js";import"./ButtonBase-BP4UcNRm.js";import"./useSlotProps-kFXdEnr4.js";import"./resolveComponentProps-wf3a5Dzy.js";import"./Link-CbhZsHgE.js";import"./Paper-CFTaduOC.js";import"./Box-rTPpZw4U.js";import"./Card-W1ZN2Ibg.js";import"./CardHeader-COHUtWFZ.js";import"./Divider-jM7vrPYY.js";import"./dividerClasses-T6l5cUjA.js";import"./CardContent-Dj2ezXO9.js";import"./createStack-ByRgbIrg.js";import"./composeClasses-CZn__ddx.js";import"./Popper-Dq-NJQGl.js";import"./getReactNodeRef-Dv5Cnn4q.js";import"./Portal-BtjLBOFM.js";import"./useControlled-DAcvgf1e.js";import"./Grow-G9PJ9mrr.js";import"./utils-CUOamiDe.js";import"./DialogContent-DrVcS3-y.js";import"./Modal-CI1OBMJP.js";import"./ownerWindow-DupJrkIw.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-Bz8-rvmW.js";import"./DialogTitle-8Q858oMI.js";import"./toConsumableArray-Mwh-kK05.js";function ut(r){return Y("MuiCircularProgress",r)}_("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const g=44,V=q`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,K=q`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,xt=typeof V!="string"?J`
        animation: ${V} 1.4s linear infinite;
      `:null,ht=typeof K!="string"?J`
        animation: ${K} 1.4s ease-in-out infinite;
      `:null,mt=r=>{const{classes:n,variant:l,color:h,disableShrink:f}=r,p={root:["root",l,`color${w(h)}`],svg:["svg"],circle:["circle",`circle${w(l)}`,f&&"circleDisableShrink"]};return lt(p,ut,n)},pt=C("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,n)=>{const{ownerState:l}=r;return[n.root,n[l.variant],n[`color${w(l.color)}`]]}})(W(({theme:r})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("transform")}},{props:{variant:"indeterminate"},style:xt||{animation:`${V} 1.4s linear infinite`}},...Object.entries(r.palette).filter(it()).map(([n])=>({props:{color:n},style:{color:(r.vars||r).palette[n].main}}))]}))),jt=C("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,n)=>n.svg})({display:"block"}),Bt=C("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,n)=>{const{ownerState:l}=r;return[n.circle,n[`circle${w(l.variant)}`],l.disableShrink&&n.circleDisableShrink]}})(W(({theme:r})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:n})=>n.variant==="indeterminate"&&!n.disableShrink,style:ht||{animation:`${K} 1.4s ease-in-out infinite`}}]}))),gt=U.forwardRef(function(n,l){const h=Q({props:n,name:"MuiCircularProgress"}),{className:f,color:p="primary",disableShrink:$=!1,size:S=40,style:N,thickness:j=3.6,value:z=0,variant:A="indeterminate",...D}=h,v={...h,color:p,disableShrink:$,size:S,thickness:j,value:z,variant:A},T=mt(v),k={},B={},I={};if(A==="determinate"){const P=2*Math.PI*((g-j)/2);k.strokeDasharray=P.toFixed(3),I["aria-valuenow"]=Math.round(z),k.strokeDashoffset=`${((100-z)/100*P).toFixed(3)}px`,B.transform="rotate(-90deg)"}return t.jsx(pt,{className:at(T.root,f),style:{width:S,height:S,...B,...N},ownerState:v,ref:l,role:"progressbar",...I,...D,children:t.jsx(jt,{className:T.svg,ownerState:v,viewBox:`${g/2} ${g/2} ${g} ${g}`,children:t.jsx(Bt,{className:T.circle,style:k,ownerState:v,cx:g,cy:g,r:(g-j)/2,fill:"none",strokeWidth:j})})})});function bt(r){return Y("MuiLoadingButton",r)}const m=_("MuiLoadingButton",["root","label","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),yt=r=>{const{loading:n,loadingPosition:l,classes:h}=r,f={root:["root",n&&"loading"],label:["label"],startIcon:[n&&`startIconLoading${w(l)}`],endIcon:[n&&`endIconLoading${w(l)}`],loadingIndicator:["loadingIndicator",n&&`loadingIndicator${w(l)}`]},p=dt(f,bt,h);return{...h,...p}},wt=r=>r!=="ownerState"&&r!=="theme"&&r!=="sx"&&r!=="as"&&r!=="classes",ft=C(o,{shouldForwardProp:r=>wt(r)||r==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(r,n)=>[n.root,n.startIconLoadingStart&&{[`& .${m.startIconLoadingStart}`]:n.startIconLoadingStart},n.endIconLoadingEnd&&{[`& .${m.endIconLoadingEnd}`]:n.endIconLoadingEnd}]})(W(({theme:r})=>({display:"inline-flex",[`& .${m.startIconLoadingStart}, & .${m.endIconLoadingEnd}`]:{transition:r.transitions.create(["opacity"],{duration:r.transitions.duration.short}),opacity:0},variants:[{props:{loadingPosition:"center"},style:{transition:r.transitions.create(["background-color","box-shadow","border-color"],{duration:r.transitions.duration.short}),[`&.${m.loading}`]:{color:"transparent"}}},{props:({ownerState:n})=>n.loadingPosition==="start"&&n.fullWidth,style:{[`& .${m.startIconLoadingStart}, & .${m.endIconLoadingEnd}`]:{transition:r.transitions.create(["opacity"],{duration:r.transitions.duration.short}),opacity:0,marginRight:-8}}},{props:({ownerState:n})=>n.loadingPosition==="end"&&n.fullWidth,style:{[`& .${m.startIconLoadingStart}, & .${m.endIconLoadingEnd}`]:{transition:r.transitions.create(["opacity"],{duration:r.transitions.duration.short}),opacity:0,marginLeft:-8}}}]}))),It=C("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(r,n)=>{const{ownerState:l}=r;return[n.loadingIndicator,n[`loadingIndicator${w(l.loadingPosition)}`]]}})(W(({theme:r})=>({position:"absolute",visibility:"visible",display:"flex",variants:[{props:{loadingPosition:"start",size:"small"},style:{left:10}},{props:({loadingPosition:n,ownerState:l})=>n==="start"&&l.size!=="small",style:{left:14}},{props:{variant:"text",loadingPosition:"start"},style:{left:6}},{props:{loadingPosition:"center"},style:{left:"50%",transform:"translate(-50%)",color:(r.vars||r).palette.action.disabled}},{props:{loadingPosition:"end",size:"small"},style:{right:10}},{props:({loadingPosition:n,ownerState:l})=>n==="end"&&l.size!=="small",style:{right:14}},{props:{variant:"text",loadingPosition:"end"},style:{right:6}},{props:({ownerState:n})=>n.loadingPosition==="start"&&n.fullWidth,style:{position:"relative",left:-10}},{props:({ownerState:n})=>n.loadingPosition==="end"&&n.fullWidth,style:{position:"relative",right:-10}}]}))),X=C("span",{name:"MuiLoadingButton",slot:"Label",overridesResolver:(r,n)=>[n.label]})({display:"inherit",alignItems:"inherit",justifyContent:"inherit"}),Z=U.forwardRef(function(n,l){const h=U.useContext(nt),f=st(h,n),p=Q({props:f,name:"MuiLoadingButton"}),{children:$,disabled:S=!1,id:N,loading:j=!1,loadingIndicator:z,loadingPosition:A="center",variant:D="text",...v}=p,T=ct(N),k=z??t.jsx(gt,{"aria-labelledby":T,color:"inherit",size:16}),B={...p,disabled:S,loading:j,loadingIndicator:k,loadingPosition:A,variant:D},I=yt(B),P=j?t.jsx(It,{className:I.loadingIndicator,ownerState:B,children:k}):null;return t.jsxs(ft,{disabled:S||j,id:T,ref:l,...v,variant:D,classes:I,ownerState:B,children:[B.loadingPosition==="end"?t.jsx(X,{className:I.label,children:$}):P,B.loadingPosition==="end"?P:t.jsx(X,{className:I.label,children:$})]})}),St=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"contained",color:"primary",children:"Primary"}),t.jsx(o,{variant:"contained",color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",variant:"contained",color:"primary",children:"Link"})]}),vt=()=>t.jsxs(a,{gap:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"contained",color:"primary",children:"Primary"}),t.jsx(o,{variant:"contained",color:"secondary",children:"Secondary"}),t.jsx(o,{variant:"contained",color:"error",children:"Error"}),t.jsx(o,{variant:"contained",color:"warning",children:"Warning"}),t.jsx(o,{variant:"contained",color:"success",children:"Success"})]}),Tt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(Z,{loading:!0,loadingIndicator:"Loading…",variant:"contained",color:"error",startIcon:t.jsx(E,{width:18}),children:"Left Icon"}),t.jsx(Z,{loading:!0,variant:"contained",color:"secondary",endIcon:t.jsx(E,{width:18}),children:"Right Icon"})]}),kt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},alignItems:"center",justifyContent:"center",children:[t.jsx(o,{variant:"contained",size:"small",children:"Small"}),t.jsx(o,{variant:"contained",size:"medium",children:"Medium"}),t.jsx(o,{variant:"contained",size:"large",children:"Large"})]}),Ct=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"outlined",color:"primary",children:"Primary"}),t.jsx(o,{variant:"outlined",color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",variant:"outlined",color:"primary",children:"Link"})]}),zt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"outlined",color:"error",startIcon:t.jsx(E,{width:18}),children:"Left Icon"}),t.jsx(o,{variant:"outlined",color:"secondary",endIcon:t.jsx(b,{width:18}),children:"Right Icon"})]}),Pt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},alignItems:"center",justifyContent:"center",children:[t.jsx(o,{variant:"outlined",size:"small",children:"Small"}),t.jsx(o,{variant:"outlined",size:"medium",children:"Medium"}),t.jsx(o,{variant:"outlined",size:"large",children:"Large"})]}),Gt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{color:"primary",children:"Primary"}),t.jsx(o,{color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",color:"primary",children:"Link"})]}),Ft=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{color:"primary",children:"Primary"}),t.jsx(o,{color:"secondary",children:"Secondary"}),t.jsx(o,{color:"error",children:"Error"}),t.jsx(o,{color:"warning",children:"Warning"}),t.jsx(o,{color:"success",children:"Success"})]}),Lt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(o,{color:"error",startIcon:t.jsx(E,{width:18}),children:"Left Icon"}),t.jsx(o,{color:"secondary",endIcon:t.jsx(b,{width:18}),children:"Right Icon"})]}),Rt=()=>t.jsxs(a,{spacing:1,direction:"row",alignItems:"center",justifyContent:"center",children:[t.jsx(o,{size:"small",children:"Small"}),t.jsx(o,{size:"medium",children:"Medium"}),t.jsx(o,{size:"large",children:"Large"})]}),Mt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained",color:"primary","aria-label":"primary-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained",color:"secondary","aria-label":"secondary-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained",color:"error","aria-label":"error-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained",color:"warning","aria-label":"warning-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained",color:"success","aria-label":"success-bell",children:t.jsx(u,{width:18})})})]}),Ot=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained","aria-label":"small-bell",children:t.jsx(u,{width:16})})}),t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained",size:"medium","aria-label":"medium-bell",children:t.jsx(u,{width:19})})}),t.jsx(d,{title:"Bell",children:t.jsx(y,{variant:"contained","aria-label":"large-bell",children:t.jsx(u,{width:21})})})]}),$t=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Send",children:t.jsx(x,{color:"primary","aria-label":"send",children:t.jsx(b,{width:20})})}),t.jsx(d,{title:"Add",children:t.jsx(x,{color:"secondary","aria-label":"plus",children:t.jsx(rt,{width:20})})}),t.jsx(x,{disabled:!0,"aria-label":"clipboard",children:t.jsx(et,{width:20})})]}),At=()=>t.jsx(t.Fragment,{children:t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",alignItems:"center",children:[t.jsx(d,{title:"Send",children:t.jsx(x,{color:"primary","aria-label":"send",children:t.jsx(b,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"secondary","aria-label":"send",children:t.jsx(b,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"warning","aria-label":"send",children:t.jsx(b,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"error","aria-label":"send",children:t.jsx(b,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"success","aria-label":"send",children:t.jsx(b,{width:20})})})]})}),Dt=()=>t.jsx(t.Fragment,{children:t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Bell",children:t.jsx(x,{size:"small",color:"primary","aria-label":"small-bell",children:t.jsx(u,{width:16})})}),t.jsx(d,{title:"Bell",children:t.jsx(x,{size:"medium",color:"secondary","aria-label":"medium-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(x,{size:"large",color:"warning","aria-label":"large-bell",children:t.jsx(u,{width:20})})})]})}),Et=()=>t.jsxs(a,{spacing:1,children:[t.jsxs(i,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"contained",elevation:0,"aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Wt=()=>t.jsxs(a,{spacing:1,justifyContent:"center",children:[t.jsxs(i,{size:"small",variant:"outlined","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{size:"large",variant:"outlined","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Nt=()=>t.jsxs(a,{spacing:1,direction:"row",children:[t.jsxs(i,{orientation:"vertical",variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{orientation:"vertical",variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{orientation:"vertical",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Ut=()=>t.jsxs(a,{spacing:2,direction:{xs:"column",sm:"row",lg:"column"},justifyContent:"center",children:[t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(i,{variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"contained",color:"secondary","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"contained",color:"error","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{color:"success",variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(i,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(G,{width:18})}),t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"secondary","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(G,{width:18})}),t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"warning","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(G,{width:18})}),t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"error","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(G,{width:18})}),t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"success","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(G,{width:18})}),t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})})]})]}),t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(i,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"secondary",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"warning",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"error",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"success",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]})]})]}),Vt=()=>t.jsxs(a,{spacing:1,direction:"column",justifyContent:"center",children:[t.jsxs(i,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{color:"secondary",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{color:"error",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Kt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import {  Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="contained" color="primary">
      Primary
    </Button>
    <Button variant="contained" color="secondary">
      Secondary
    </Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" variant="contained" color="primary">
      Link
    </Button>
</Stack>`})}),Ht=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import {  Button, Stack } from '@mui/material';

<Stack gap={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="contained" color="primary">
        Primary
    </Button>
    <Button variant="contained" color="secondary">
        Secondary
    </Button>
    <Button variant="contained" color="error">
        Error
    </Button>
    <Button variant="contained" color="warning">
        Warning
    </Button>
    <Button variant="contained" color="success">
        Success
    </Button>
</Stack>`})}),Xt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Stack } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import LoadingButton from '@mui/lab/LoadingButton';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <LoadingButton loading loadingIndicator="Loading…"
      variant="contained"
      color="error"
      startIcon={<IconTrash width={18} />}
    >
      Left Icon
    </LoadingButton >
    <LoadingButton loading
      variant="contained"
      color="secondary"
      endIcon={<IconTrash width={18} />}
    >
      Right Icon
    </LoadingButton >
</Stack>`})}),Zt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="contained" size="small">
      Small
    </Button>
    <Button variant="contained" size="medium">
      Medium
    </Button>
    <Button variant="contained" size="large">
      Large
    </Button>
</Stack>`})}),qt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="error">
      Error
    </Button>
    <Button variant="outlined" color="warning">
      Warning
    </Button>
    <Button variant="outlined" color="success">
      Success
    </Button>
</Stack>`})}),Jt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button
        variant="outlined"
        color="error"
        startIcon={<IconTrash width={18} />}
    >
        Left Icon
    </Button>
    <Button
        variant="outlined"
        color="secondary"
        endIcon={<IconSend width={18} />}
    >
        Right Icon
    </Button>
</Stack>`})}),Qt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="outlined" size="small">
      Small
    </Button>
    <Button variant="outlined" size="medium">
      Medium
    </Button>
    <Button variant="outlined" size="large">
      Large
    </Button>
</Stack>`})}),Yt=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" color="primary">
      Link
    </Button>
</Stack>`})}),_t=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="error">Error</Button>
    <Button color="warning">Warning</Button>
    <Button color="success">Success</Button>
</Stack>`})}),to=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Button color="error" startIcon={<IconTrash width={18} />}>
      Left Icon
    </Button>
    <Button color="secondary" endIcon={<IconSend width={18} />}>
      Right Icon
    </Button>
</Stack>`})}),oo=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
</Stack>`})}),no=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton color="primary" aria-label="primary-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="secondary" aria-label="secondary-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="error" aria-label="error-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="warning" aria-label="warning-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="success" aria-label="success-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
</Stack>`})}),ro=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton aria-label="small-bell">
        <IconBell width={16} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton size="medium" aria-label="medium-bell">
        <IconBell width={19} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton aria-label="large-bell">
        <IconBell width={21} />
      </IconButton>
    </Tooltip>
</Stack>`})}),eo=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconClipboard, IconPlus, IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Send">
      <Fab color="primary" aria-label="send">
        <IconSend width={20} />
      </Fab>
    </Tooltip>
    <Tooltip title="Add">
      <Fab color="secondary" aria-label="plus">
        <IconPlus width={20} />
      </Fab>
    </Tooltip>
    <Fab disabled aria-label="clipboard">
      <IconClipboard width={20} />
    </Fab>
</Stack>`})}),io=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconSend } from '@tabler/icons';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
    <Tooltip title="Send">
        <Fab color="primary" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="secondary" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="warning" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="error" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="success" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),ao=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
        <Fab size="small" color="primary" aria-label="small-bell">
          <IconBell width={16} />
        </Fab>
    </Tooltip>
    <Tooltip title="Bell">
        <Fab size="medium" color="secondary" aria-label="medium-bell">
          <IconBell width={18} />
        </Fab>
    </Tooltip>
    <Tooltip title="Bell">
        <Fab size="large" color="warning" aria-label="large-bell">
          <IconBell width={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),lo=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import {  Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} >
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="text" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),so=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} justifyContent="center">
    <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup size="large" variant="outlined" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),co=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} direction="row">
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>

    <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>

    <ButtonGroup orientation="vertical" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),uo=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} direction="column" justifyContent="center">
    <ButtonGroup variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup color="secondary" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup color="error" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),xo=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward } from '@tabler/icons';

<Stack spacing={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }} justifyContent="center">
    <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="error" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          color="success"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
    </Stack>
    <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="warning" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="error" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="success" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="secondary" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="warning" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="error" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="success" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
    </Stack>
</Stack>`})}),ho=[{to:"/",title:"Home"},{title:"Button"}],ln=()=>t.jsxs(ot,{title:"Buttons",description:"this is Buttons page",children:[t.jsx(tt,{title:"Button",items:ho}),t.jsxs(e,{container:!0,spacing:3,children:[t.jsx(e,{size:12,children:t.jsx(H,{title:"Buttons",children:t.jsxs(e,{container:!0,spacing:3,children:[t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Default",codeModel:t.jsx(Kt,{}),children:t.jsx(St,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Colors",codeModel:t.jsx(Ht,{}),children:t.jsx(vt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Loading Buttons",codeModel:t.jsx(Xt,{}),children:t.jsx(Tt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Sizes",codeModel:t.jsx(Zt,{}),children:t.jsx(kt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Outlined",codeModel:t.jsx(qt,{}),children:t.jsx(Ct,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Outlined Icon",codeModel:t.jsx(Jt,{}),children:t.jsx(zt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Outline Size",codeModel:t.jsx(Qt,{}),children:t.jsx(Pt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Text",codeModel:t.jsx(Yt,{}),children:t.jsx(Gt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Text Color",codeModel:t.jsx(_t,{}),children:t.jsx(Ft,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Text Icon",codeModel:t.jsx(to,{}),children:t.jsx(Lt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Text Sizes",codeModel:t.jsx(oo,{}),children:t.jsx(Rt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Icon Color",codeModel:t.jsx(no,{}),children:t.jsx(Mt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Icon Sizes",codeModel:t.jsx(ro,{}),children:t.jsx(Ot,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"FAB",codeModel:t.jsx(eo,{}),children:t.jsx($t,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"FAB Color",codeModel:t.jsx(io,{}),children:t.jsx(At,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"FAB Size",codeModel:t.jsx(ao,{}),children:t.jsx(Dt,{})})})]})})}),t.jsx(e,{size:12,children:t.jsx(H,{title:"Button Group",children:t.jsxs(e,{container:!0,spacing:3,children:[t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Default",codeModel:t.jsx(lo,{}),children:t.jsx(Et,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Sizes",codeModel:t.jsx(so,{}),children:t.jsx(Wt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Verical",codeModel:t.jsx(co,{}),children:t.jsx(Nt,{})})}),t.jsx(e,{size:{xs:12,lg:6},display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Text",codeModel:t.jsx(uo,{}),children:t.jsx(Vt,{})})}),t.jsx(e,{size:12,display:"flex",alignItems:"stretch",children:t.jsx(s,{title:"Color",codeModel:t.jsx(xo,{}),children:t.jsx(Ut,{})})})]})})})]})]});export{ln as default};
