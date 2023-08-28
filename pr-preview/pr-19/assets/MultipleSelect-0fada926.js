import{p as j,q as V,t as w,v as P,w as T,_ as p,x as b,y,r as d,z as E,C as G,E as I,F as H,H as U,j as r,I as $,J as _,K as z}from"./index-fa4a41bb.js";import{F as N,I as D,C as W,S as q}from"./index.esm-ac9fd6ba.js";import{d as M}from"./MultipleSort-7645cfa3.js";const J=j("MuiListItemIcon",["root","alignItemsFlexStart"]),O=J;function K(e){return V("MuiMenuItem",e)}const A=j("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),c=A,Q=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],X=(e,s)=>{const{ownerState:a}=e;return[s.root,a.dense&&s.dense,a.divider&&s.divider,!a.disableGutters&&s.gutters]},Y=e=>{const{disabled:s,dense:a,divider:o,disableGutters:n,selected:l,classes:i}=e,t=_({root:["root",a&&"dense",s&&"disabled",!n&&"gutters",o&&"divider",l&&"selected"]},K,i);return p({},i,t)},Z=w(P,{shouldForwardProp:e=>T(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:X})(({theme:e,ownerState:s})=>p({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!s.disableGutters&&{paddingLeft:16,paddingRight:16},s.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${c.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:b(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${c.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:b(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${c.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:b(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:b(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${c.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${c.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${M.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${M.inset}`]:{marginLeft:52},[`& .${y.root}`]:{marginTop:0,marginBottom:0},[`& .${y.inset}`]:{paddingLeft:36},[`& .${O.root}`]:{minWidth:36}},!s.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},s.dense&&p({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${O.root} svg`]:{fontSize:"1.25rem"}}))),h=d.forwardRef(function(s,a){const o=E({props:s,name:"MuiMenuItem"}),{autoFocus:n=!1,component:l="li",dense:i=!1,divider:u=!1,disableGutters:t=!1,focusVisibleClassName:k,role:F="menuitem",tabIndex:f,className:R}=o,S=G(o,Q),m=d.useContext(I),C=d.useMemo(()=>({dense:i||m.dense||!1,disableGutters:t}),[m.dense,i,t]),g=d.useRef(null);H(()=>{n&&g.current&&g.current.focus()},[n]);const B=p({},o,{dense:C.dense,divider:u,disableGutters:t}),v=Y(o),L=U(g,a);let x;return o.disabled||(x=f!==void 0?f:-1),r.jsx(I.Provider,{value:C,children:r.jsx(Z,p({ref:L,role:F,tabIndex:x,component:l,focusVisibleClassName:$(v.focusVisible,k),className:$(v.root,R)},S,{ownerState:B,classes:v}))})}),ee=h,se=({items:e,title:s,control:a,name:o,toReadable:n})=>{const l=d.useId();return r.jsxs(N,{children:[r.jsx(D,{children:s}),r.jsx(W,{control:a,name:o,render:({field:{onChange:i,...u}})=>r.jsx(q,{label:s,...u,id:l,multiple:!0,onChange:i,children:e.map(t=>r.jsx(ee,{value:t,children:n?n(t):t},t))})})]})},ne=z(se);export{ne as M};
