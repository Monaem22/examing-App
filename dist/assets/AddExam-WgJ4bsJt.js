import{r as h,u as q,j as e,L as C,f as B,$ as F,y as p}from"./index-BU-rm2uI.js";import{H as Q}from"./Helmet-CYjTrV5H.js";import{a as A}from"./api-DTyocR7z.js";import{c as G,a as c,u as S}from"./index.esm-DFs15I_E.js";import{I as k}from"./index-mYDvtZSz.js";function H(){h.useEffect(()=>{window.scrollTo(0,0)},[]);const j=q(),[x,m]=h.useState(!1),[o,i]=h.useState([{question_title:"",subQuestions:[{questionText:"",correctAnswer:"",options:["","",""]}]}]),b=t=>{const l=[...o];l[t].subQuestions.push({questionText:"",correctAnswer:"",options:["","",""]}),i(l)},v=(t,l)=>{const a=[...o];a[t].subQuestions.splice(l,1),i(a)},f=t=>{const l=[...o];l.splice(t,1),i(l)},N=(t,l,a)=>{const n=[...o];n[t][l]=a,i(n)},u=(t,l,a,n)=>{const r=[...o];r[t].subQuestions[l][a]=n,i(r)};async function g(t){try{m(!0);let{data:l}=await A.post("/api/exam/add-exam",{...t,questions:o});p.success("تم اضافة الامتحان بنجاح"),m(!1),console.log(l.type),j("/admin-dashboard")}catch{p.error("حدث خطأ اثناء اضافة الامتحان! تاكد من وقت الامتحان!"),m(!1)}}let y=G({title:c().required("عنوان الامتحان مطلوب"),description:c().required("وصف الامتحان مطلوب"),date:c().required("تاريخ الامتحان مطلوب"),time:c().required("وقت الامتحان مطلوب"),duration:c().required("مدة الامتحان مطلوبة"),grade:c().required("الصف الدراسي مطلوب")});const s=S({initialValues:{title:"",description:"",date:"",time:"",duration:"",grade:""},validationSchema:y,onSubmit:g});return x?e.jsx(C,{}):e.jsxs(e.Fragment,{children:[e.jsx(Q,{children:e.jsx("title",{children:"اضافة امتحان"})}),e.jsx("section",{className:"add-exam my-5 py-3",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center py-3",children:[e.jsx("h4",{className:"fw-bold mb-2 dash-header",children:"إضافة امتحان :"}),e.jsx(B,{to:"/admin-dashboard",className:"redirect-link",children:e.jsxs("button",{className:"btn px-4 rounded-0 fs-6",children:["الرجوع الى لوحه التحكم"," ",e.jsx(k,{size:18,className:"mx-2"})]})})]}),e.jsxs("form",{onSubmit:s.handleSubmit,children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-4 my-2",children:[e.jsx("label",{htmlFor:"title",className:"form-label fw-bold",children:"عنوان الامتحان :"}),e.jsx("input",{className:"form-control",placeholder:"أدخل عنوان الامتحان",style:{textAlign:"right",direction:"rtl"},id:"title",name:"title",value:s.values.title,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.title&&s.touched.title&&e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.title})]}),e.jsxs("div",{className:"col-md-4 my-2",children:[e.jsx("label",{htmlFor:"description",className:"form-label fw-bold",children:"وصف الامتحان :"}),e.jsx("input",{className:"form-control",placeholder:"أدخل وصف الامتحان من اختيارك",style:{textAlign:"right",direction:"rtl"},id:"description",name:"description",value:s.values.description,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.description&&s.touched.description&&e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.description})]}),e.jsxs("div",{className:"col-md-4 my-2",children:[e.jsx("label",{htmlFor:"date",className:"form-label fw-bold",children:"تاريخ الامتحان :"}),e.jsx("input",{type:"date",className:"form-control",id:"date",name:"date",value:s.values.date,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.date&&s.touched.date&&e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.date})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-4 my-2",children:[e.jsx("label",{htmlFor:"time",className:"form-label fw-bold",children:"وقت الامتحان :"}),e.jsx("input",{type:"text",className:"form-control",id:"time",name:"time",placeholder:"الساعه بالتوقيت العالمى [ 18:15 ]",value:s.values.time,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.time&&s.touched.time&&e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.time})]}),e.jsxs("div",{className:"col-md-4 my-2",children:[e.jsx("label",{htmlFor:"duration",className:"form-label fw-bold",children:"مدة الامتحان :"}),e.jsx("input",{className:"form-control",placeholder:"أدخل مدة الامتحان [ 1H - 1h - 30M - 30m ]",style:{textAlign:"right",direction:"rtl"},id:"duration",name:"duration",value:s.values.duration,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.duration&&s.touched.duration&&e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.duration})]}),e.jsxs("div",{className:"col-md-4 my-2",children:[e.jsx("label",{htmlFor:"grade",className:"form-label fw-bold",children:"الصف :"}),e.jsxs("select",{id:"grade",name:"grade",className:"form-select",value:s.values.grade,onChange:s.handleChange,onBlur:s.handleBlur,children:[e.jsx("option",{value:"",disabled:!0,hidden:!0,children:"اختر الصف"}),e.jsxs("optgroup",{label:"المرحلة الابتدائية",children:[e.jsx("option",{value:"G4",children:"الصف الرابع الابتدائي"}),e.jsx("option",{value:"G5",children:"الصف الخامس الابتدائي"}),e.jsx("option",{value:"G6",children:"الصف السادس الابتدائي"})]}),e.jsxs("optgroup",{label:"المرحلة الإعدادية",children:[e.jsx("option",{value:"G7",children:"الصف الأول الإعدادي"}),e.jsx("option",{value:"G8",children:"الصف الثاني الإعدادي"}),e.jsx("option",{value:"G9",children:"الصف الثالث الإعدادي"})]}),e.jsxs("optgroup",{label:"المرحلة الثانوية",children:[e.jsx("option",{value:"G10",children:"الصف الأول الثانوي"}),e.jsx("option",{value:"G11",children:"الصف الثاني الثانوي"}),e.jsx("option",{value:"G12",children:"الصف الثالث الثانوي"})]})]}),s.errors.grade&&s.touched.grade?e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.grade}):""]})]}),e.jsx("div",{className:"row mb-3",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("h5",{className:"fw-bold my-4",children:"الأسئلة [سيكون هناك سؤال رئيسي داخلة اى عدد من الأسئلة] :"}),o.map((t,l)=>e.jsxs("div",{children:[e.jsxs("div",{className:"my-3",children:[e.jsx("label",{htmlFor:"q-title",className:"fw-bold",children:"عنوان السؤال الرئيسى :"}),e.jsx("input",{type:"text",name:"q-title",className:"form-control mb-3 mt-2",placeholder:"أكمل - اختر - ما النتائج - الخ",required:!0,value:t.question_title,onChange:a=>N(l,"question_title",a.target.value)})]}),t.subQuestions.map((a,n)=>e.jsxs("div",{className:"my-2",children:[e.jsx("label",{htmlFor:"q-title",className:"fw-bold",children:"نص السؤال :"}),e.jsx("input",{type:"text",className:"form-control my-2",required:!0,placeholder:"أدخل نص السؤال",value:a.questionText,onChange:r=>u(l,n,"questionText",r.target.value)}),e.jsxs("div",{className:"my-3",children:[e.jsx("label",{htmlFor:"q-title",className:"fw-bold",children:"الاختيارات :"}),e.jsx("div",{className:"row",children:a.options.map((r,d)=>e.jsx("div",{className:"col-4",children:e.jsx("input",{type:"text",className:"form-control my-2",required:!0,placeholder:`اختيار ${d+1}`,value:r,onChange:w=>u(l,n,"options",[...a.options.slice(0,d),w.target.value,...a.options.slice(d+1)])})},d))})]}),e.jsxs("div",{className:"my-3",children:[e.jsx("label",{htmlFor:"q-title",className:"fw-bold",children:"الإجابة الصحيحة :"}),e.jsxs("select",{className:"form-select my-2",value:a.correctAnswer,required:!0,onChange:r=>u(l,n,"correctAnswer",r.target.value),children:[e.jsx("option",{value:"",disabled:!0,hidden:!0,children:"اختر الإجابة الصحيحة"}),a.options.map((r,d)=>e.jsx("option",{value:r,children:r},d))]})]}),e.jsxs("div",{className:"d-flex justify-content-end",children:[e.jsx("button",{type:"button",className:"btn rounded-0",onClick:()=>v(l,n),children:"إزالة السؤال الفرعي"}),e.jsx("button",{type:"button",className:"btn rounded-0 mx-3",onClick:()=>b(l),children:"إضافة سؤال فرعي"})]})]},n)),e.jsxs("div",{className:"d-flex gap-3 mt-4",children:[e.jsx("button",{type:"button",className:"btn rounded-0",onClick:()=>i([...o,{question_title:"",subQuestions:[{questionText:"",correctAnswer:"",options:["","",""]}]}]),children:"إضافة سؤال رئيسي"}),e.jsx("button",{type:"button",className:"btn rounded-0",onClick:()=>f(l),children:"حذف السؤال الرئيسي"})]})]},l))]})}),e.jsx("button",{type:"submit",className:"btn rounded-0 d-flex justify-content-center w-100",disabled:!(s.isValid&&s.dirty),children:x?e.jsx(F,{height:"20",width:"50",color:"#fff",ariaLabel:"bars-loading",visible:!0}):"اضافة الامتحان"})]})]})})]})}export{H as default};
