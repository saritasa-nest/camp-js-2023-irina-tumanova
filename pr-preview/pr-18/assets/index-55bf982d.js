import{b as y,r as a,l as F,u as b,f as m,s as M,j as e,L as T,e as R,T as A,G as p,m as E,n as u,o as O,p as v,h as x,D as B,B as k,g as V,O as $,q}from"./index-4252a463.js";import{u as z,T as H,I as J}from"./index.esm-6e24e4c6.js";import{M as K,a as Q,I as U,D as W,P as X}from"./InfinityScroll-c44a18ca.js";import{M as Y}from"./MultipleSelect-667da7d0.js";const Z=y(s=>s.genres.genres,s=>s),ee=y(s=>s.genres.isLoading,s=>s);class S{constructor({types:n,search:r}){this.types=n,this.search=r}}const se={"card-container":"_card-container_16fj8_1"},te=a.forwardRef(({genre:s},n)=>{const r=F(),i=b(),c=m(M),o=()=>{c&&i(E()),r(`${s.id}`)};return e.jsx(T,{className:se["card-container"],ref:n,onClick:o,children:e.jsx(R,{primary:s.name,secondary:e.jsx(A,{component:"span",variant:"body2",color:"text.primary",children:p.toReadable(s.type)})})})}),ae=a.memo(te),ne="_aside_1iiw9_1",re="_form_1iiw9_13",h={aside:ne,form:re},G=[{field:u.Name,direction:""},{field:u.Type,direction:""}],j={pagination:new X({pageSize:15,pageNumber:0}),sorting:G,filters:new S({types:[],search:""})},oe={types:[],search:"",sorting:G},ie=()=>{const s=b(),n=m(Z),r=m(ee),[i,c]=a.useState(!1),[o,g]=a.useState(j),[N,I]=a.useState(null),D=()=>{g(t=>({...t,pagination:{...t.pagination,pageNumber:t.pagination.pageNumber+1}}))};a.useEffect(()=>{s(O())},[]),a.useEffect(()=>{s(v(o))},[o]);const{register:L,handleSubmit:P,control:f}=z({defaultValues:oe}),l=()=>{c(t=>!t)},_=({types:t,search:d,sorting:C})=>{s(q()),g({...j,sorting:C,filters:new S({types:t,search:d})}),l()},w=a.useCallback(t=>{I(t)},[]);return e.jsxs(x,{sx:{flex:1,display:"flex"},children:[e.jsx(B,{open:i,onClose:l,children:e.jsxs("form",{className:h.form,onSubmit:P(_),children:[e.jsx(H,{label:"Search",...L("search")}),e.jsx(Y,{name:"types",title:"Filter",toReadable:p.toReadable,control:f,items:p.toArray()}),e.jsx(K,{name:"sorting",title:"Sorting",control:f,toReadable:u.toReadable}),e.jsx(k,{type:"submit",children:"Apply"})]})}),e.jsxs("aside",{className:h.aside,children:[e.jsx(J,{onClick:l,children:e.jsx(Q,{})}),e.jsx(U,{lastItemNode:N,onObserve:D,children:e.jsxs(e.Fragment,{children:[r&&n.length===0&&e.jsx(V,{}),n.map((t,d)=>e.jsxs(x,{children:[e.jsx(ae,{ref:d===n.length-1?w:null,genre:t}),e.jsx(W,{})]},t.id))]})})]}),e.jsx($,{})]})},pe=a.memo(ie);export{pe as GenresPage};
