import{u as r,j as e,B as _,c as v,r as g,b as d}from"./index-BCEI--hm.js";import{A as b}from"./AreaInput-BYRkx5IJ.js";import{u as j}from"./Input.module-Bm68ZGlj.js";const T="_themePicker_4sak2_1",A="_marginTop_4sak2_7",C="_dataAreaInput_4sak2_11",k="_dataActions_4sak2_15",n={themePicker:T,marginTop:A,dataAreaInput:C,dataActions:k},f="_ThemeColorButton_1vlei_1",E="_inner_1vlei_1",N="_color_1vlei_6",S="_orange_1vlei_12",B="_red_1vlei_15",P="_blue_1vlei_18",R="_purple_1vlei_21",y="_green_1vlei_24",I="_cyan_1vlei_27",G="_black_1vlei_30",L="_name_1vlei_33",a={ThemeColorButton:f,inner:E,color:N,orange:S,red:B,blue:P,purple:R,green:y,cyan:I,black:G,name:L},V=({code:o,name:i})=>{const l=r(c=>c.updateThemeColor);return e.jsx(_,{onClick:()=>l(o),className:a.ThemeColorButton,children:e.jsxs("div",{className:a.inner,children:[e.jsx("div",{className:v(a.color,a[o.toLowerCase()])}),e.jsx("div",{className:a.name,children:i})]})})},Y=()=>{const o=r(t=>t.setHeaderTitle),i=r(t=>t.importStorage),l=r(t=>t.exportStorage),c=[["ORANGE","Оранжевый"],["RED","Красный"],["BLUE","Синий"],["PURPLE","Фиолетовый"],["GREEN","Зеленый"],["CYAN","Бирюзовый"],["GRAY","Серый"],["BLACK","Черный"]],{control:u,formState:{isValid:w},handleSubmit:p,setValue:h}=j({mode:"onChange",defaultValues:{name:""}}),x=(t,s)=>{if(s.nativeEvent.submitter.name==="export"){const m=l();h("data",m),navigator.clipboard.writeText(m)}else s.nativeEvent.submitter.name==="import"&&i(t.data)};return g.useEffect(()=>{o("Настройки")},[]),e.jsxs(e.Fragment,{children:[e.jsx(d,{children:"Акцентный цвет темы"}),e.jsx("div",{className:n.themePicker,children:c.map(([t,s],m)=>e.jsx(V,{code:t,name:s},t))}),e.jsx(d,{className:n.marginTop,children:"Экспорт и импорт"}),e.jsxs("form",{onSubmit:p(x),children:[e.jsx(b,{name:"data",label:"Данные",control:u,className:n.dataAreaInput}),e.jsxs("div",{className:n.dataActions,children:[e.jsx(_,{type:"submit",name:"import",children:"Импорт"}),e.jsx(_,{type:"submit",name:"export",children:"Экспорт"})]})]})]})};export{Y as default};
