import{r as u,h as d,U as x,W as N,u as j,j as e,p as v,T as b,B as P,Y as S,Z as T,$ as E}from"./index-4c83303d.js";import{u as y,T as i}from"./index.esm-c352f754.js";import{o as A,s,t as L}from"./index-7f8f5abd.js";import{s as _,a as r,P as p,L as C}from"./PasswordField-462a1be7.js";import"./GlobalStyles-98f4bea4.js";import"./IconButton-b861b1a4.js";const R=A({email:s().trim().email({message:"Enter valid email"}),firstName:s().trim(),lastName:s().trim(),password:s().trim().min(8,{message:"Min 8 characters"}),repeatedPassword:s().trim().min(8,{message:"Min 8 characters"})}).required().refine(t=>t.password===t.repeatedPassword,{message:"Passwords don't match",path:["repeatedPassword"]}),q={email:"",firstName:"",lastName:"",password:"",repeatedPassword:""},F=()=>{const t=d(x),m=d(N),n=j(),{register:o,handleSubmit:c,formState:{errors:a},setError:h,control:l}=y({defaultValues:q,resolver:L(R)});u.useEffect(()=>{_(m,h)},[m]);const g=w=>{n(T.register(w))},f=()=>{n(E())};return e.jsxs("div",{className:r.auth,children:[t&&e.jsx(v,{}),e.jsxs("form",{className:r["auth-form"],onSubmit:c(g),children:[e.jsx(b,{variant:"h2",className:r["auth-form__title"],children:"Sign up"}),e.jsx(i,{id:"email",required:!0,autoComplete:"email",error:a.email!==void 0,helperText:a.email?.message??"",label:"Email",variant:"outlined",...o("email")}),e.jsx(i,{id:"firstName",required:!0,autoComplete:"given-name",error:a.firstName!==void 0,helperText:a.firstName?.message,label:"First name",variant:"outlined",...o("firstName")}),e.jsx(i,{id:"lastName",required:!0,autoComplete:"family-name",error:a.lastName!==void 0,helperText:a.lastName?.message??"",label:"Last name",variant:"outlined",...o("lastName")}),e.jsx(p,{name:"password",label:"Password",control:l,autocomplete:"new-password",error:a.password}),e.jsx(p,{name:"repeatedPassword",label:"Repeated password",control:l,autocomplete:"new-password",error:a.repeatedPassword}),e.jsx(P,{variant:"contained",className:r["auth-form__submit"],type:"submit",children:"Submit"}),e.jsx(C,{component:S,to:"/auth/login",className:r["auth-form__auth-change"],onClick:f,children:"Sign in"})]})]})},U=u.memo(F);export{U as RegistrationPage};
