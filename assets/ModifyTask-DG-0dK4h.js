import{u as r,r as i,f as o,j as e,m,B as c}from"./index-DQvqQxX3.js";import{T as A}from"./arrow_round-DitSO1LX.js";import{A as B}from"./AreaInput-BNp1c9Sx.js";import{D as u,i as C,a as D}from"./isSameOrAfter-DEP4Dt3y.js";import{u as E}from"./Input.module-D9W5f3c7.js";o.extend(C);o.extend(D);const q=({id:n})=>{const f=r(s=>s.isModalOpen),l=r(s=>s.closeModal),x=r(s=>s.modifyTask),{name:p,desc:j,start:h,end:b}=i.useMemo(()=>r.getState().getTask(n),[]),{control:a,formState:{isValid:S},handleSubmit:y,watch:d,setValue:M}=E({mode:"onChange",defaultValues:{name:p,desc:j,start:h,end:b}}),T=({name:s,desc:O,start:g,end:v})=>{x({id:n,name:s,desc:O,start:g,end:v}),l()},t=d("start"),k=d("end");return i.useEffect(()=>{o(k).isBefore(t)&&M("end",t)},[t]),e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:y(T),children:[e.jsxs("div",{className:m.scroller,children:[e.jsx(A,{name:"name",label:"Название",rules:{required:"обязательное"},autoFocus:f,control:a}),e.jsx(B,{name:"desc",label:"Описание",control:a}),e.jsx(u,{name:"start",label:"Начало",control:a}),e.jsx(u,{name:"end",label:"Конец",rules:{validate:s=>s?o(s).isSameOrAfter(t)||"не может быть раньше начала":!0},control:a})]}),e.jsxs("div",{className:m.actions,children:[e.jsx(c,{visualDisabled:!S,type:"submit",children:"Сохранить"}),e.jsx(c,{onClick:l,secondary:!0,children:"Отмена"})]})]})})};export{q as default};
