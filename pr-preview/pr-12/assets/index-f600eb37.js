import{r as h,a as c,o as N,p as j,u as E,j as e,B as b,N as P,A as p}from"./index-5c6f538e.js";import{o as S,s as r,u as A,c as t,A as T,T as y,a as n,P as u,L,t as _}from"./index-08f0617b.js";const C=S({email:r().trim().min(1,{message:"Enter email"}).email({message:"Enter valid email"}),firstName:r().trim().min(1,{message:"Enter first name"}),lastName:r().trim().min(1,{message:"Enter last name"}),password:r().trim().min(1,{message:"Enter password"}).min(8,{message:"Min 8 characters"}),repeatedPassword:r().trim().min(1,{message:"Enter confirm password"}).min(8,{message:"Min 8 characters"})}).refine(o=>o.password===o.repeatedPassword,{message:"Passwords don't match",path:["repeatedPassword"]}),$=()=>{const o=c(N),i=c(j),l=E(),{register:a,handleSubmit:g,formState:{errors:s},setError:f}=A({resolver:_(C)}),w=m=>{l(p.register(m))};h.useEffect(()=>{x()},[i]);const x=()=>{i!==void 0&&Object.keys(i.errors).forEach(m=>{const d=i.errors[m];d!==void 0&&f(m,{message:d})})},v=()=>{l(p.reset)};return e.jsxs("div",{className:`${t.auth}`,children:[o&&e.jsx(T,{}),e.jsxs("form",{className:`${t["auth-form"]}`,onSubmit:g(w),children:[e.jsx(y,{variant:"h2",className:`${t["auth-form__title"]}`,children:"Sign up"}),e.jsx(n,{id:"email",autoComplete:"email",error:s.email!==void 0,helperText:s.email?.message,label:"Email",variant:"outlined",...a("email",{required:!0})}),e.jsx(n,{id:"firstName",autoComplete:"given-name",error:s.firstName!==void 0,helperText:s.firstName?.message,label:"First name",variant:"outlined",...a("firstName",{required:!0})}),e.jsx(n,{id:"lastName",autoComplete:"family-name",error:s.lastName!==void 0,helperText:s.lastName?.message,label:"Email",variant:"outlined",...a("lastName",{required:!0})}),e.jsx(u,{name:"password",label:"Password",register:a,autocomplete:"new-password",error:s.password}),e.jsx(u,{name:"repeatedPassword",label:"Repeated password",register:a,autocomplete:"new-password",error:s.repeatedPassword}),e.jsx(b,{variant:"contained",className:`${t["auth-form__submit"]}`,type:"submit",children:"Submit"}),e.jsx(L,{component:P,to:"/auth/login",className:`${t["auth-form__auth-change"]}`,onClick:v,children:"Sign in"})]})]})},k=h.memo($);export{k as RegistrationPage};