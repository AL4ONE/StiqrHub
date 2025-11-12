var Lt=Object.defineProperty;var jt=(t,e,n)=>e in t?Lt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Y=(t,e,n)=>jt(t,typeof e!="symbol"?e+"":e,n);import{r as u,R as X,j as N,b0 as tt,ag as ft}from"./index-DDD7yp0g.js";import{_ as vt,c as E,g as dt,s as et,a as Nt,b as kt}from"./Typography-L20TPdxk.js";function Ot(t,e){typeof t=="function"?t(e):t&&(t.current=e)}const $t=typeof window<"u"?u.useLayoutEffect:u.useEffect;function G(t){const e=u.useRef(t);return $t(()=>{e.current=t}),u.useRef((...n)=>(0,e.current)(...n)).current}function ut(...t){return u.useMemo(()=>t.every(e=>e==null)?null:e=>{t.forEach(n=>{Ot(n,e)})},t)}const lt={};function ht(t,e){const n=u.useRef(lt);return n.current===lt&&(n.current=t(e)),n}const Ft=[];function Ut(t){u.useEffect(t,Ft)}class nt{constructor(){Y(this,"currentId",null);Y(this,"clear",()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)});Y(this,"disposeEffect",()=>this.clear)}static create(){return new nt}start(e,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},e)}}function zt(){const t=ht(nt.create).current;return Ut(t.disposeEffect),t}function ct(t){try{return t.matches(":focus-visible")}catch{}return!1}function _t(t,e){if(t==null)return{};var n={};for(var a in t)if({}.hasOwnProperty.call(t,a)){if(e.includes(a))continue;n[a]=t[a]}return n}function J(t,e){return J=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,a){return n.__proto__=a,n},J(t,e)}function At(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,J(t,e)}const pt=X.createContext(null);function Yt(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ot(t,e){var n=function(r){return e&&u.isValidElement(r)?e(r):r},a=Object.create(null);return t&&u.Children.map(t,function(o){return o}).forEach(function(o){a[o.key]=n(o)}),a}function Xt(t,e){t=t||{},e=e||{};function n(d){return d in e?e[d]:t[d]}var a=Object.create(null),o=[];for(var r in t)r in e?o.length&&(a[r]=o,o=[]):o.push(r);var s,p={};for(var l in e){if(a[l])for(s=0;s<a[l].length;s++){var f=a[l][s];p[a[l][s]]=n(f)}p[l]=n(l)}for(s=0;s<o.length;s++)p[o[s]]=n(o[s]);return p}function v(t,e,n){return n[e]!=null?n[e]:t.props[e]}function Kt(t,e){return ot(t.children,function(n){return u.cloneElement(n,{onExited:e.bind(null,n),in:!0,appear:v(n,"appear",t),enter:v(n,"enter",t),exit:v(n,"exit",t)})})}function Wt(t,e,n){var a=ot(t.children),o=Xt(e,a);return Object.keys(o).forEach(function(r){var s=o[r];if(u.isValidElement(s)){var p=r in e,l=r in a,f=e[r],d=u.isValidElement(f)&&!f.props.in;l&&(!p||d)?o[r]=u.cloneElement(s,{onExited:n.bind(null,s),in:!0,exit:v(s,"exit",t),enter:v(s,"enter",t)}):!l&&p&&!d?o[r]=u.cloneElement(s,{in:!1}):l&&p&&u.isValidElement(f)&&(o[r]=u.cloneElement(s,{onExited:n.bind(null,s),in:f.props.in,exit:v(s,"exit",t),enter:v(s,"enter",t)}))}}),o}var Ht=Object.values||function(t){return Object.keys(t).map(function(e){return t[e]})},Gt={component:"div",childFactory:function(e){return e}},rt=function(t){At(e,t);function e(a,o){var r;r=t.call(this,a,o)||this;var s=r.handleExited.bind(Yt(r));return r.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},r}var n=e.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(o,r){var s=r.children,p=r.handleExited,l=r.firstRender;return{children:l?Kt(o,p):Wt(o,s,p),firstRender:!1}},n.handleExited=function(o,r){var s=ot(this.props.children);o.key in s||(o.props.onExited&&o.props.onExited(r),this.mounted&&this.setState(function(p){var l=vt({},p.children);return delete l[o.key],{children:l}}))},n.render=function(){var o=this.props,r=o.component,s=o.childFactory,p=_t(o,["component","childFactory"]),l=this.state.contextValue,f=Ht(this.state.children).map(s);return delete p.appear,delete p.enter,delete p.exit,r===null?X.createElement(pt.Provider,{value:l},f):X.createElement(pt.Provider,{value:l},X.createElement(r,p,f))},e}(X.Component);rt.propTypes={};rt.defaultProps=Gt;class q{constructor(){Y(this,"mountEffect",()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())});this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}static create(){return new q}static use(){const e=ht(q.create).current,[n,a]=u.useState(!1);return e.shouldMount=n,e.setShouldMount=a,u.useEffect(e.mountEffect,[n]),e}mount(){return this.mounted||(this.mounted=Zt(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}start(...e){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.start(...e)})}stop(...e){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.stop(...e)})}pulsate(...e){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.pulsate(...e)})}}function qt(){return q.use()}function Zt(){let t,e;const n=new Promise((a,o)=>{t=a,e=o});return n.resolve=t,n.reject=e,n}function Jt(t){const{className:e,classes:n,pulsate:a=!1,rippleX:o,rippleY:r,rippleSize:s,in:p,onExited:l,timeout:f}=t,[d,M]=u.useState(!1),b=E(e,n.ripple,n.rippleVisible,a&&n.ripplePulsate),w={width:s,height:s,top:-(s/2)+r,left:-(s/2)+o},h=E(n.child,d&&n.childLeaving,a&&n.childPulsate);return!p&&!d&&M(!0),u.useEffect(()=>{if(!p&&l!=null){const S=setTimeout(l,f);return()=>{clearTimeout(S)}}},[l,p,f]),N.jsx("span",{className:b,style:w,children:N.jsx("span",{className:h})})}const m=dt("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Q=550,Qt=80,te=tt`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,ee=tt`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,ne=tt`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,oe=et("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),re=et(Jt,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${m.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${te};
    animation-duration: ${Q}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  &.${m.ripplePulsate} {
    animation-duration: ${({theme:t})=>t.transitions.duration.shorter}ms;
  }

  & .${m.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${m.childLeaving} {
    opacity: 0;
    animation-name: ${ee};
    animation-duration: ${Q}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  & .${m.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${ne};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,se=u.forwardRef(function(e,n){const a=ft({props:e,name:"MuiTouchRipple"}),{center:o=!1,classes:r={},className:s,...p}=a,[l,f]=u.useState([]),d=u.useRef(0),M=u.useRef(null);u.useEffect(()=>{M.current&&(M.current(),M.current=null)},[l]);const b=u.useRef(!1),w=zt(),h=u.useRef(null),S=u.useRef(null),x=u.useCallback(c=>{const{pulsate:R,rippleX:g,rippleY:$,rippleSize:D,cb:F}=c;f(y=>[...y,N.jsx(re,{classes:{ripple:E(r.ripple,m.ripple),rippleVisible:E(r.rippleVisible,m.rippleVisible),ripplePulsate:E(r.ripplePulsate,m.ripplePulsate),child:E(r.child,m.child),childLeaving:E(r.childLeaving,m.childLeaving),childPulsate:E(r.childPulsate,m.childPulsate)},timeout:Q,pulsate:R,rippleX:g,rippleY:$,rippleSize:D},d.current)]),d.current+=1,M.current=F},[r]),k=u.useCallback((c={},R={},g=()=>{})=>{const{pulsate:$=!1,center:D=o||R.pulsate,fakeElement:F=!1}=R;if((c==null?void 0:c.type)==="mousedown"&&b.current){b.current=!1;return}(c==null?void 0:c.type)==="touchstart"&&(b.current=!0);const y=F?null:S.current,V=y?y.getBoundingClientRect():{width:0,height:0,left:0,top:0};let I,C,B;if(D||c===void 0||c.clientX===0&&c.clientY===0||!c.clientX&&!c.touches)I=Math.round(V.width/2),C=Math.round(V.height/2);else{const{clientX:U,clientY:L}=c.touches&&c.touches.length>0?c.touches[0]:c;I=Math.round(U-V.left),C=Math.round(L-V.top)}if(D)B=Math.sqrt((2*V.width**2+V.height**2)/3),B%2===0&&(B+=1);else{const U=Math.max(Math.abs((y?y.clientWidth:0)-I),I)*2+2,L=Math.max(Math.abs((y?y.clientHeight:0)-C),C)*2+2;B=Math.sqrt(U**2+L**2)}c!=null&&c.touches?h.current===null&&(h.current=()=>{x({pulsate:$,rippleX:I,rippleY:C,rippleSize:B,cb:g})},w.start(Qt,()=>{h.current&&(h.current(),h.current=null)})):x({pulsate:$,rippleX:I,rippleY:C,rippleSize:B,cb:g})},[o,x,w]),K=u.useCallback(()=>{k({},{pulsate:!0})},[k]),O=u.useCallback((c,R)=>{if(w.clear(),(c==null?void 0:c.type)==="touchend"&&h.current){h.current(),h.current=null,w.start(0,()=>{O(c,R)});return}h.current=null,f(g=>g.length>0?g.slice(1):g),M.current=R},[w]);return u.useImperativeHandle(n,()=>({pulsate:K,start:k,stop:O}),[K,k,O]),N.jsx(oe,{className:E(m.root,r.root,s),ref:S,...p,children:N.jsx(rt,{component:null,exit:!0,children:l})})});function ie(t){return Nt("MuiButtonBase",t)}const ae=dt("MuiButtonBase",["root","disabled","focusVisible"]),ue=t=>{const{disabled:e,focusVisible:n,focusVisibleClassName:a,classes:o}=t,s=kt({root:["root",e&&"disabled",n&&"focusVisible"]},ie,o);return n&&a&&(s.root+=` ${a}`),s},le=et("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(t,e)=>e.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${ae.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),he=u.forwardRef(function(e,n){const a=ft({props:e,name:"MuiButtonBase"}),{action:o,centerRipple:r=!1,children:s,className:p,component:l="button",disabled:f=!1,disableRipple:d=!1,disableTouchRipple:M=!1,focusRipple:b=!1,focusVisibleClassName:w,LinkComponent:h="a",onBlur:S,onClick:x,onContextMenu:k,onDragLeave:K,onFocus:O,onFocusVisible:c,onKeyDown:R,onKeyUp:g,onMouseDown:$,onMouseLeave:D,onMouseUp:F,onTouchEnd:y,onTouchMove:V,onTouchStart:I,tabIndex:C=0,TouchRippleProps:B,touchRippleRef:U,type:L,...z}=a,_=u.useRef(null),T=qt(),mt=ut(T.ref,U),[j,W]=u.useState(!1);f&&j&&W(!1),u.useImperativeHandle(o,()=>({focusVisible:()=>{W(!0),_.current.focus()}}),[]);const bt=T.shouldMount&&!d&&!f;u.useEffect(()=>{j&&b&&!d&&T.pulsate()},[d,b,j,T]);function P(i,it,Dt=M){return G(at=>(it&&it(at),Dt||T[i](at),!0))}const gt=P("start",$),Mt=P("stop",k),Rt=P("stop",K),yt=P("stop",F),Et=P("stop",i=>{j&&i.preventDefault(),D&&D(i)}),xt=P("start",I),Ct=P("stop",y),Tt=P("stop",V),Pt=P("stop",i=>{ct(i.target)||W(!1),S&&S(i)},!1),wt=G(i=>{_.current||(_.current=i.currentTarget),ct(i.target)&&(W(!0),c&&c(i)),O&&O(i)}),Z=()=>{const i=_.current;return l&&l!=="button"&&!(i.tagName==="A"&&i.href)},Vt=G(i=>{b&&!i.repeat&&j&&i.key===" "&&T.stop(i,()=>{T.start(i)}),i.target===i.currentTarget&&Z()&&i.key===" "&&i.preventDefault(),R&&R(i),i.target===i.currentTarget&&Z()&&i.key==="Enter"&&!f&&(i.preventDefault(),x&&x(i))}),It=G(i=>{b&&i.key===" "&&j&&!i.defaultPrevented&&T.stop(i,()=>{T.pulsate(i)}),g&&g(i),x&&i.target===i.currentTarget&&Z()&&i.key===" "&&!i.defaultPrevented&&x(i)});let H=l;H==="button"&&(z.href||z.to)&&(H=h);const A={};H==="button"?(A.type=L===void 0?"button":L,A.disabled=f):(!z.href&&!z.to&&(A.role="button"),f&&(A["aria-disabled"]=f));const Bt=ut(n,_),st={...a,centerRipple:r,component:l,disabled:f,disableRipple:d,disableTouchRipple:M,focusRipple:b,tabIndex:C,focusVisible:j},St=ue(st);return N.jsxs(le,{as:H,className:E(St.root,p),ownerState:st,onBlur:Pt,onClick:x,onContextMenu:Mt,onFocus:wt,onKeyDown:Vt,onKeyUp:It,onMouseDown:gt,onMouseLeave:Et,onMouseUp:yt,onDragLeave:Rt,onTouchEnd:Ct,onTouchMove:Tt,onTouchStart:xt,ref:Bt,tabIndex:f?-1:C,type:L,...A,...z,children:[s,bt?N.jsx(se,{ref:mt,center:r,...B}):null]})});export{he as B,nt as T,J as _,Yt as a,At as b,_t as c,G as d,zt as e,$t as f,pt as g,rt as h,ct as i,Ot as s,ut as u};
