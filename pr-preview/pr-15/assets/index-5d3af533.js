import{v as D,w as X,b as g,j as t,x,V as Y,W as k,X as z,Y as _,_ as c,r as I,H as G,I as J,N as K,P as Q,h as C,Z as oo,$ as so,a0 as to,u as eo,a1 as ro,p as ao,T as lo,B as no,a2 as io,a3 as w}from"./index-1e691179.js";import{u as co,T as po}from"./index.esm-f76bb585.js";import{z as j,s as uo,a as m,P as mo,L as go,t as vo}from"./index-86c9da09.js";import{I as fo}from"./IconButton-042baf62.js";import"./GlobalStyles-a7130ae1.js";function xo(o){return X("MuiAlert",o)}const ho=D("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),N=ho,Ao=g(t.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),Co=g(t.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),jo=g(t.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),Io=g(t.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),So=g(t.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),Mo=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],Lo=o=>{const{variant:e,color:r,severity:a,classes:s}=o,l={root:["root",`${e}${k(r||a)}`,`${e}`],icon:["icon"],message:["message"],action:["action"]};return Q(l,xo,s)},yo=x(Y,{name:"MuiAlert",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:r}=o;return[e.root,e[r.variant],e[`${r.variant}${k(r.color||r.severity)}`]]}})(({theme:o,ownerState:e})=>{const r=o.palette.mode==="light"?z:_,a=o.palette.mode==="light"?_:z,s=e.color||e.severity;return c({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&e.variant==="standard"&&{color:o.vars?o.vars.palette.Alert[`${s}Color`]:r(o.palette[s].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${s}StandardBg`]:a(o.palette[s].light,.9),[`& .${N.icon}`]:o.vars?{color:o.vars.palette.Alert[`${s}IconColor`]}:{color:o.palette[s].main}},s&&e.variant==="outlined"&&{color:o.vars?o.vars.palette.Alert[`${s}Color`]:r(o.palette[s].light,.6),border:`1px solid ${(o.vars||o).palette[s].light}`,[`& .${N.icon}`]:o.vars?{color:o.vars.palette.Alert[`${s}IconColor`]}:{color:o.palette[s].main}},s&&e.variant==="filled"&&c({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${s}FilledColor`],backgroundColor:o.vars.palette.Alert[`${s}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[s].dark:o.palette[s].main,color:o.palette.getContrastText(o.palette[s].main)}))}),$o=x("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,e)=>e.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),bo=x("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,e)=>e.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),B=x("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,e)=>e.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),E={success:t.jsx(Ao,{fontSize:"inherit"}),warning:t.jsx(Co,{fontSize:"inherit"}),error:t.jsx(jo,{fontSize:"inherit"}),info:t.jsx(Io,{fontSize:"inherit"})},Po=I.forwardRef(function(e,r){var a,s,l,v,n,f;const d=G({props:e,name:"MuiAlert"}),{action:p,children:h,className:R,closeText:S="Close",color:T,components:M={},componentsProps:L={},icon:y,iconMapping:O=E,onClose:$,role:W="alert",severity:A="success",slotProps:b={},slots:P={},variant:V="standard"}=d,F=J(d,Mo),i=c({},d,{color:T,severity:A,variant:V}),u=Lo(i),H=(a=(s=P.closeButton)!=null?s:M.CloseButton)!=null?a:fo,U=(l=(v=P.closeIcon)!=null?v:M.CloseIcon)!=null?l:So,Z=(n=b.closeButton)!=null?n:L.closeButton,q=(f=b.closeIcon)!=null?f:L.closeIcon;return t.jsxs(yo,c({role:W,elevation:0,ownerState:i,className:K(u.root,R),ref:r},F,{children:[y!==!1?t.jsx($o,{ownerState:i,className:u.icon,children:y||O[A]||E[A]}):null,t.jsx(bo,{ownerState:i,className:u.message,children:h}),p!=null?t.jsx(B,{ownerState:i,className:u.action,children:p}):null,p==null&&$?t.jsx(B,{ownerState:i,className:u.action,children:t.jsx(H,c({size:"small","aria-label":S,title:S,color:"inherit",onClick:$},Z,{children:t.jsx(U,c({fontSize:"small"},q))}))}):null]}))}),zo=Po,_o=j.object({email:j.string().trim().email({message:"Enter valid email"}),password:j.string().trim().min(8,{message:"Min 8 characters"})}).required(),wo={email:"",password:""},No=()=>{const o=C(oo),e=C(so),r=C(to),a=eo(),{register:s,control:l,handleSubmit:v,formState:{errors:n},setError:f}=co({defaultValues:wo,resolver:vo(_o)}),d=h=>{a(w.login(h))};I.useEffect(()=>{uo(r,f)},[r]);const p=()=>{a(w.reset)};return e!==null?t.jsx(ro,{to:"/",replace:!0}):t.jsxs("div",{className:m.auth,children:[o&&t.jsx(ao,{}),t.jsxs("form",{className:m["auth-form"],onSubmit:v(d),children:[t.jsx(lo,{variant:"h2",className:m["auth-form__title"],children:"Sign in"}),r!==void 0&&t.jsx(zo,{severity:"error",children:r?.errors.common}),t.jsx(po,{id:"email",autoComplete:"email",error:n.email!==void 0,helperText:n.email?.message,label:"Email",required:!0,variant:"outlined",...s("email")}),t.jsx(mo,{name:"password",label:"Password",control:l,autocomplete:"current-password",error:n.password}),t.jsx(no,{variant:"contained",className:m["auth-form__submit"],type:"submit",children:"Submit"}),t.jsx(go,{component:io,to:"/auth/registration",onClick:p,className:m["auth-form__auth-change"],children:"Sign up"})]})]})},Oo=I.memo(No);export{Oo as LoginPage};