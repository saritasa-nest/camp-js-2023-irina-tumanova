import{K as I,r as x,j as a,m as i,a0 as T,a1 as U,B as m,a2 as A,u as P,Q as R,n as L,T as O,a3 as q}from"./index-79030196.js";import{o as F,s as N,t as k}from"./index-73172d29.js";import{u as M,C as D,T as E}from"./index.esm-e8c73b6d.js";import{A as w}from"./Alert-85d6c7a9.js";import"./IconButton-542c1937.js";const B="_profile_3fxmf_1",V="_profile__header_3fxmf_13",z="_profile__actions_3fxmf_21",K="_profile__form_3fxmf_27",Y="_profile__avatar_3fxmf_36",G="_profile__email_3fxmf_37",Q="_profile__field_readonly_3fxmf_41",t={profile:B,profile__header:V,profile__actions:z,profile__form:K,profile__avatar:Y,profile__email:G,profile__field_readonly:Q},c={"avatar-upload":"_avatar-upload_d8qpf_1","avatar-upload__actions":"_avatar-upload__actions_d8qpf_10","avatar-upload__avatar":"_avatar-upload__avatar_d8qpf_16","avatar-upload__input":"_avatar-upload__input_d8qpf_21","avatar-upload__error":"_avatar-upload__error_d8qpf_27"},W=1024*60,C=["image/jpeg","image/png","image/webp"],X=1e3*3,Z=({imageUrl:d,changeImage:n,disable:e,className:_})=>{const[o,f]=x.useState(null),l=x.useRef(null),g=s=>{u();const p=s.target.files?.[0];if(p===void 0)return;const v=h(p);if(v!==null){j(v);return}n(p)},u=()=>{f(null),l.current=null},h=s=>C.includes(s.type)?s.size>W?"Max file size - 60 Kb":null:"Accept image type: jpeg/jpg, png, webp",j=s=>{f(s),l.current=setTimeout(u,X)},y=()=>{n(null)};return a.jsxs(i,{className:T(c["avatar-upload"],_),children:[a.jsx(U,{alt:"Current user avatar",className:c["avatar-upload__avatar"],src:d??void 0}),!e&&a.jsxs(i,{className:c["avatar-upload__actions"],children:[a.jsxs(m,{component:i,children:["Upload",a.jsx("input",{type:"file",onChange:g,accept:C.join(", "),className:c["avatar-upload__input"]})]}),a.jsx(m,{color:"error",onClick:y,children:"Delete"})]}),o!==null&&a.jsx(w,{severity:"error",className:c["avatar-upload__error"],children:o})]})},$=I(Z),H=F({firstName:N().trim().min(1,"Enter first name"),lastName:N().trim().min(1,"Enter last name"),avatarUrl:N().nullable()}),J={avatarUrl:null,email:"",firstName:"",lastName:""},aa=()=>{const{user:d,isLoading:n}=A(),[e,_]=x.useState(!0),{register:o,handleSubmit:f,formState:{errors:l},setValue:g,control:u}=M({defaultValues:d??J,resolver:k(H)}),[h,j]=x.useState(null),y=P(),s=r=>{y(q.updateCurrentUser({image:h,user:r})),_(!0)},p=()=>{_(r=>!r)},v=()=>{_(!0)},b=r=>{const S=r?URL.createObjectURL(r):null;j(r),g("avatarUrl",S)};return!n&&d===null?a.jsx(R,{to:"/"}):a.jsxs(i,{className:t.profile,children:[n&&a.jsx(L,{}),a.jsxs(i,{className:t.profile__header,children:[a.jsx(O,{variant:"h4",children:"Profile"}),a.jsx(i,{className:t.profile__actions,children:e?a.jsx(m,{color:"primary",onClick:p,children:"Edit"}):a.jsxs(a.Fragment,{children:[a.jsx(m,{onClick:v,children:"Cancel"}),a.jsx(m,{variant:"contained",type:"submit",onClick:f(s),children:"Save"})]})})]}),a.jsxs("form",{className:t.profile__form,children:[a.jsx(D,{name:"avatarUrl",control:u,render:({field:r})=>a.jsx($,{imageUrl:r.value,className:t.profile__avatar,disable:e,changeImage:b})}),a.jsx(E,{className:e?t.profile__field_readonly:"",InputProps:{readOnly:e},id:"firstName",required:!0,autoComplete:"given-name",error:l.firstName!==void 0,helperText:l.firstName?.message??"",label:"First name",variant:"standard",...o("firstName")}),a.jsx(E,{className:e?t.profile__field_readonly:"",id:"lastName",InputProps:{readOnly:e},required:!0,autoComplete:"family-name",error:l.lastName!==void 0,helperText:l.lastName?.message??"",label:"Last name",variant:"standard",...o("lastName")}),a.jsx(E,{className:T(t.profile__email,t.profile__field_readonly),id:"email",InputProps:{readOnly:e},autoComplete:"email",label:"Email",variant:"standard",...o("email")})]})]})},oa=I(aa);export{oa as ProfilePage};
