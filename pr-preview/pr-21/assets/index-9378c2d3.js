import{r as m,h as t,U as j,V as v,W as S,u as b,j as e,X as L,p as w,T as A,B as E,Y as N,Z as n}from"./index-4c83303d.js";import{u as _,T as y}from"./index.esm-c352f754.js";import{z as o,t as P}from"./index-7f8f5abd.js";import{s as T,a as s,P as F,L as V}from"./PasswordField-462a1be7.js";import{A as k}from"./Alert-b54d8889.js";import"./GlobalStyles-98f4bea4.js";import"./IconButton-b861b1a4.js";const C=o.object({email:o.string().trim().email({message:"Enter valid email"}),password:o.string().trim().min(8,{message:"Min 8 characters"})}).required(),q={email:"",password:""},B=()=>{const l=t(j),c=t(v),r=t(S),i=b(),{register:u,control:p,handleSubmit:d,formState:{errors:a},setError:h}=_({defaultValues:q,resolver:P(C)}),g=x=>{i(n.login(x))};m.useEffect(()=>{T(r,h)},[r]);const f=()=>{i(n.reset)};return c!==null?e.jsx(L,{to:"/",replace:!0}):e.jsxs("div",{className:s.auth,children:[l&&e.jsx(w,{}),e.jsxs("form",{className:s["auth-form"],onSubmit:d(g),children:[e.jsx(A,{variant:"h2",className:s["auth-form__title"],children:"Sign in"}),r!==void 0&&e.jsx(k,{severity:"error",children:r?.errors.common}),e.jsx(y,{id:"email",autoComplete:"email",error:a.email!==void 0,helperText:a.email?.message,label:"Email",required:!0,variant:"outlined",...u("email")}),e.jsx(F,{name:"password",label:"Password",control:p,autocomplete:"current-password",error:a.password}),e.jsx(E,{variant:"contained",className:s["auth-form__submit"],type:"submit",children:"Submit"}),e.jsx(V,{component:N,to:"/auth/registration",onClick:f,className:s["auth-form__auth-change"],children:"Sign up"})]})]})},X=m.memo(B);export{X as LoginPage};
