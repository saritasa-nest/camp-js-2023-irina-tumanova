import{r as u,h as d,X as x,Z as N,u as j,j as e,p as v,T as b,B as P,a0 as S,a1 as T,a2 as E}from"./index-22e6c56d.js";import{u as y,T as i}from"./index.esm-583ec0a2.js";import{o as A,b as s,s as L,a as r,P as p,L as _,t as C}from"./index-16a45e91.js";import"./GlobalStyles-4081b153.js";import"./IconButton-d17f3bb9.js";const R=A({email:s().trim().email({message:"Enter valid email"}),firstName:s().trim(),lastName:s().trim(),password:s().trim().min(8,{message:"Min 8 characters"}),repeatedPassword:s().trim().min(8,{message:"Min 8 characters"})}).required().refine(t=>t.password===t.repeatedPassword,{message:"Passwords don't match",path:["repeatedPassword"]}),q={email:"",firstName:"",lastName:"",password:"",repeatedPassword:""},F=()=>{const t=d(x),m=d(N),n=j(),{register:o,handleSubmit:c,formState:{errors:a},setError:h,control:l}=y({defaultValues:q,resolver:C(R)});u.useEffect(()=>{L(m,h)},[m]);const g=w=>{n(T.register(w))},f=()=>{n(E())};return e.jsxs("div",{className:r.auth,children:[t&&e.jsx(v,{}),e.jsxs("form",{className:r["auth-form"],onSubmit:c(g),children:[e.jsx(b,{variant:"h2",className:r["auth-form__title"],children:"Sign up"}),e.jsx(i,{id:"email",required:!0,autoComplete:"email",error:a.email!==void 0,helperText:a.email?.message??"",label:"Email",variant:"outlined",...o("email")}),e.jsx(i,{id:"firstName",required:!0,autoComplete:"given-name",error:a.firstName!==void 0,helperText:a.firstName?.message,label:"First name",variant:"outlined",...o("firstName")}),e.jsx(i,{id:"lastName",required:!0,autoComplete:"family-name",error:a.lastName!==void 0,helperText:a.lastName?.message??"",label:"Last name",variant:"outlined",...o("lastName")}),e.jsx(p,{name:"password",label:"Password",control:l,autocomplete:"new-password",error:a.password}),e.jsx(p,{name:"repeatedPassword",label:"Repeated password",control:l,autocomplete:"new-password",error:a.repeatedPassword}),e.jsx(P,{variant:"contained",className:r["auth-form__submit"],type:"submit",children:"Submit"}),e.jsx(_,{component:S,to:"/auth/login",className:r["auth-form__auth-change"],onClick:f,children:"Sign in"})]})]})},I=u.memo(F);export{I as RegistrationPage};
