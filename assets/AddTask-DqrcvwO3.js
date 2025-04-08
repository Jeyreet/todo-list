import{j as s,c as D,B as u,r as j,a as g,u as h,m as _}from"./index-DIRvoNUT.js";import{u as m,D as v,T as M}from"./DateInputContext-TuFDwvvd.js";import{A as I}from"./AreaInput-ApM_ZXPX.js";import{i as p,a as Y,u as k}from"./Input.module-DoWDVzPe.js";import{d as i}from"./Collapser-qAEYiKRl.js";import{r as N}from"./index-I1V8wj7M.js";const $="_InputGroup_wv5hn_1",G="_input_wv5hn_11",f={InputGroup:$,input:G},w=()=>{const{onChange:e,onBlur:n,value:o,name:t,ref:r,autoFocus:l,toggle:d,inputGroupRef:a}=m();return s.jsxs("div",{className:f.InputGroup,ref:a,children:[s.jsx("input",{className:D(p.input,f.input),onChange:e,onBlur:n,value:o,name:t,ref:r,type:"date",autoFocus:l,onClick:c=>c.preventDefault()}),s.jsx(u,{onClick:d,tabIndex:"-1",children:"К"})]})},F="_Controls_2rxsc_1",A="_text_2rxsc_13",b={Controls:F,text:A},E=()=>{const{value:e,onChange:n,close:o}=m(),t=j.useMemo(()=>i(e).get("month"),[e]),r=j.useMemo(()=>i(e).get("year"),[e]),l=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],d=()=>{n(i(e).add(1,"month").format("YYYY-MM-DD"))},a=()=>{n(i(e).add(-1,"month").format("YYYY-MM-DD"))},c=()=>{n(i().format("YYYY-MM-DD"))};return s.jsxs("div",{className:b.Controls,children:[s.jsx(u,{onClick:a,tabIndex:"-1",children:"<"}),s.jsxs("div",{className:b.text,children:[l[t]," ",r," г."]}),s.jsx(u,{onClick:d,tabIndex:"-1",children:">"}),s.jsx(u,{onClick:c,tabIndex:"-1",children:"Сбр"}),s.jsx(u,{onClick:o,tabIndex:"-1",children:"Ок"})]})},O="_Days_cxipy_1",S={Days:O},T="_weekday_1nplf_1",B={weekday:T},P=()=>s.jsx(s.Fragment,{children:["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map((e,n)=>s.jsx("div",{className:B.weekday,children:e},n))}),R=()=>{const{value:e}=m(),n=i(e).startOf("month"),o=n.day()===0?6:n.day()-1;return s.jsx(s.Fragment,{children:Array.from({length:o}).map((t,r)=>s.jsx("div",{},r))})},V="_button_qxs5n_1",q={button:V},W=()=>{const{value:e,onChange:n,close:o}=m(),t=i(e),r=t.date(),l=t.startOf("month").daysInMonth(),d=a=>{o(),n(i(e).date(a).format("YYYY-MM-DD"))};return s.jsx(s.Fragment,{children:Array.from({length:l}).map((a,c)=>s.jsx(u,{className:q.button,disabled:c+1===r,onClick:()=>d(c+1),tabIndex:"-1",children:c+1},c))})},z=()=>s.jsxs("div",{className:S.Days,children:[s.jsx(P,{}),s.jsx(R,{}),s.jsx(W,{})]}),H=({children:e})=>{const n=document.getElementById("portal");return N.createPortal(e,n)},J="_Calendar_15abb_1",K="_inner_15abb_23",L="_hider_15abb_93",Q="_padding_15abb_101",x={Calendar:J,inner:K,hider:L,padding:Q},U=()=>{const{isOpen:e,close:n,calendarRef:o}=m();return g(n,e),s.jsx(H,{children:s.jsx("div",{className:x.Calendar,inert:!e,onClick:n,children:s.jsx("div",{className:x.inner,ref:o,onClick:t=>t.stopPropagation(),children:s.jsx("div",{className:x.hider,children:s.jsxs("div",{className:x.padding,children:[s.jsx(E,{}),s.jsx(z,{})]})})})})})},X=()=>{const{label:e,error:n}=m();return s.jsxs("div",{className:p.name,children:[s.jsx("span",{children:e}),s.jsx("span",{children:(n==null?void 0:n.message)&&` (${n.message})`})]})},C=({name:e,control:n,rules:o,label:t,autoFocus:r})=>{const{field:{onChange:l,onBlur:d,value:a,ref:c},fieldState:{error:y}}=Y({name:e,control:n,rules:o,defaultValue:i().format("YYYY-MM-DD")});return s.jsx(v,{label:t,autoFocus:r,onChange:l,onBlur:d,value:a,ref:c,error:y,children:s.jsxs("label",{className:p.Input,children:[s.jsx(X,{}),s.jsx(w,{}),s.jsx(U,{})]})})},os=()=>{const e=h(a=>a.isModalOpen),n=h(a=>a.closeModal),o=h(a=>a.addTask),{control:t,formState:{isValid:r},handleSubmit:l}=k({mode:"onChange",defaultValues:{name:""}}),d=a=>{n(),o(a)};return s.jsx(s.Fragment,{children:s.jsxs("form",{onSubmit:l(d),children:[s.jsxs("div",{className:_.scroller,children:[s.jsx(M,{name:"name",label:"Название",rules:{required:"обязательное"},autoFocus:e,control:t}),s.jsx(I,{name:"desc",label:"Описание",control:t}),s.jsx(C,{name:"start",label:"Начало",control:t}),s.jsx(C,{name:"end",label:"Конец",control:t})]}),s.jsxs("div",{className:_.actions,children:[s.jsx(u,{visualDisabled:!r,type:"submit",children:"Добавить"}),s.jsx(u,{onClick:n,secondary:!0,children:"Отмена"})]})]})})};export{os as default};
