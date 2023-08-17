import{g as Z,b as G,d as g,j as e,s as x,P as J,e as B,h as $,l as b,_ as c,r as k,i as K,k as Q,m as X,n as Y,a as A,o as oo,p as so,q as eo,u as to,N as ro,A as ao,B as lo,t as no,v as P}from"./index-2d226d75.js";import{I as io,o as co,s as z,u as po,a as u,T as uo,b as go,P as mo,L as vo,t as xo}from"./index-ab6a9317.js";function fo(o){return G("MuiAlert",o)}const ho=Z("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),_=ho,Ao=g(e.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),Co=g(e.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),jo=g(e.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),Io=g(e.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),So=g(e.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),Mo=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],yo=o=>{const{variant:t,color:r,severity:a,classes:s}=o,l={root:["root",`${t}${B(r||a)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return Y(l,fo,s)},Lo=x(J,{name:"MuiAlert",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:r}=o;return[t.root,t[r.variant],t[`${r.variant}${B(r.color||r.severity)}`]]}})(({theme:o,ownerState:t})=>{const r=o.palette.mode==="light"?$:b,a=o.palette.mode==="light"?b:$,s=t.color||t.severity;return c({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&t.variant==="standard"&&{color:o.vars?o.vars.palette.Alert[`${s}Color`]:r(o.palette[s].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${s}StandardBg`]:a(o.palette[s].light,.9),[`& .${_.icon}`]:o.vars?{color:o.vars.palette.Alert[`${s}IconColor`]}:{color:o.palette[s].main}},s&&t.variant==="outlined"&&{color:o.vars?o.vars.palette.Alert[`${s}Color`]:r(o.palette[s].light,.6),border:`1px solid ${(o.vars||o).palette[s].light}`,[`& .${_.icon}`]:o.vars?{color:o.vars.palette.Alert[`${s}IconColor`]}:{color:o.palette[s].main}},s&&t.variant==="filled"&&c({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${s}FilledColor`],backgroundColor:o.vars.palette.Alert[`${s}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[s].dark:o.palette[s].main,color:o.palette.getContrastText(o.palette[s].main)}))}),$o=x("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),bo=x("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),N=x("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),w={success:e.jsx(Ao,{fontSize:"inherit"}),warning:e.jsx(Co,{fontSize:"inherit"}),error:e.jsx(jo,{fontSize:"inherit"}),info:e.jsx(Io,{fontSize:"inherit"})},Po=k.forwardRef(function(t,r){var a,s,l,n,m,v;const d=K({props:t,name:"MuiAlert"}),{action:f,children:E,className:R,closeText:C="Close",color:T,components:j={},componentsProps:I={},icon:S,iconMapping:O=w,onClose:M,role:W="alert",severity:h="success",slotProps:y={},slots:L={},variant:F="standard"}=d,H=Q(d,Mo),i=c({},d,{color:T,severity:h,variant:F}),p=yo(i),U=(a=(s=L.closeButton)!=null?s:j.CloseButton)!=null?a:io,V=(l=(n=L.closeIcon)!=null?n:j.CloseIcon)!=null?l:So,q=(m=y.closeButton)!=null?m:I.closeButton,D=(v=y.closeIcon)!=null?v:I.closeIcon;return e.jsxs(Lo,c({role:W,elevation:0,ownerState:i,className:X(p.root,R),ref:r},H,{children:[S!==!1?e.jsx($o,{ownerState:i,className:p.icon,children:S||O[h]||w[h]}):null,e.jsx(bo,{ownerState:i,className:p.message,children:E}),f!=null?e.jsx(N,{ownerState:i,className:p.action,children:f}):null,f==null&&M?e.jsx(N,{ownerState:i,className:p.action,children:e.jsx(U,c({size:"small","aria-label":C,title:C,color:"inherit",onClick:M},q,{children:e.jsx(V,c({fontSize:"small"},D))}))}):null]}))}),zo=Po,_o=co({email:z().trim().min(1,{message:"Enter email"}).email({message:"Enter valid email"}),password:z().trim().min(1,{message:"Enter password"}).min(8,{message:"Min 8 characters"})}),No=()=>{const o=A(oo),t=A(so),r=A(eo),a=to(),{register:s,handleSubmit:l,formState:{errors:n}}=po({resolver:xo(_o)}),m=d=>{a(P.login(d))},v=()=>{a(P.reset)};return t!==null?e.jsx(ro,{to:"/",replace:!0}):e.jsxs("div",{className:`${u.auth}`,children:[o&&e.jsx(ao,{}),e.jsxs("form",{className:u["auth-form"],onSubmit:l(m),children:[e.jsx(uo,{variant:"h2",className:u["auth-form__title"],children:"Sign in"}),r!==void 0&&e.jsx(zo,{severity:"error",children:r?.errors.common}),e.jsx(go,{id:"email",autoComplete:"email",error:n.email!==void 0,helperText:n.email?.message,label:"Email",required:!0,variant:"outlined",...s("email")}),e.jsx(mo,{name:"password",label:"Password",register:s,autocomplete:"current-password",error:n.password}),e.jsx(lo,{variant:"contained",className:u["auth-form__submit"],type:"submit",children:"Submit"}),e.jsx(vo,{component:no,to:"/auth/registration",onClick:v,className:u["auth-form__auth-change"],children:"Sign up"})]})]})},ko=k.memo(No);export{ko as LoginPage};
