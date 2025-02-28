import{r as a,j as e,L as E,f as F,g as _,h as A,i as w,k as I,l as P,y as t}from"./index-BvLg1fWM.js";import{H as T}from"./Helmet-BZH04Yzz.js";import{a as x}from"./api-sjr0-pHH.js";import{I as U}from"./index-Ci69w3Nc.js";import{l as $}from"./react-confirm-alert-eN3sHCg1.js";function D(){const[v,d]=a.useState(!1),[h,i]=a.useState([]),[p,y]=a.useState(""),[o,S]=a.useState(""),[m,j]=a.useState(null),[u,b]=a.useState(""),[r,f]=a.useState(""),[c,N]=a.useState(""),M={G4:"الصف الرابع الابتدائي",G5:"الصف الخامس الابتدائي",G6:"الصف السادس الابتدائي",G7:"الصف الأول الإعدادي",G8:"الصف الثاني الإعدادي",G9:"الصف الثالث الإعدادي",G10:"الصف الأول الثانوي",G11:"الصف الثاني الثانوي",G12:"الصف الثالث الثانوي"};async function C(){try{d(!0);let{data:s}=await x.get("/api/user/all-students");t.success("تم جلب بيانات الطلاب بنجاح."),i(s.data),d(!1)}catch{t.error("حدثت مشكلة أثناء جلب بيانات الطلاب!"),d(!1)}}async function G(s){$.confirmAlert({title:"تأكيد الحذف",message:"هل أنت متأكد أنك تريد حذف هذا الطالب؟",buttons:[{label:"نعم",className:"confirm-delete-btn",onClick:async()=>{try{await x.delete(`/api/user/delete-student/${s}`),i(l=>l.filter(n=>n._id!==s)),t.success("تم حذف الطالب بنجاح.")}catch{t.error("حدثت مشكلة أثناء محاولة حذف الطالب!")}}},{label:"إلغاء",className:"confirm-cancel-btn",onClick:()=>console.log("تم الإلغاء")}]})}function k(s){j(s),b(s.name),f(s.studentMobile),N(s.parentMobile)}async function L(){if(!m)return;const s=/^(010|011|012|015)[0-9]{8}$/;if(!s.test(r)){t.error("رقم الطالب غير صالح، يجب أن يكون مصريًا.");return}if(!s.test(c)){t.error("رقم ولي الأمر غير صالح، يجب أن يكون مصريًا.");return}try{await x.put(`/api/user/update-student/${m._id}`,{name:u,studentMobile:r,parentMobile:c}),i(l=>l.map(n=>n._id===m._id?{...n,name:u,studentMobile:r,parentMobile:c}:n)),t.success("تم تعديل بيانات الطالب بنجاح."),j(null)}catch{t.error("حدثت مشكلة أثناء محاولة التعديل!")}}if(a.useEffect(()=>{C()},[]),v)return e.jsx(E,{});const g=h.filter(s=>(o===""||s.grade===o)&&s.name.toLowerCase().includes(p.toLowerCase()));return e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsx("title",{children:"جميع الطلاب"})}),e.jsx("section",{className:"students my-5 py-3",children:e.jsxs("div",{className:"container mt-3",children:[e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsx("h5",{className:"mt-2 fw-bold dash-header",children:"🎓 جميع الطلاب :"}),e.jsx(F,{to:"/admin-dashboard",className:"redirect-link",children:e.jsxs("button",{className:"btn px-4 rounded-0 fs-6",children:["الرجوع الى لوحه التحكم"," ",e.jsx(U,{size:18,className:"mx-2"})]})})]}),e.jsxs("div",{className:"d-flex gap-3 my-4",children:[e.jsxs("div",{className:"input-group w-50",children:[e.jsx("span",{className:"input-group-text bg-white search-icons",children:e.jsx(_,{className:"text-muted"})}),e.jsx("input",{type:"text",className:"form-control rounded-0",placeholder:"ابحث عن طالب بالاسم...",value:p,onChange:s=>y(s.target.value)})]}),e.jsxs("select",{className:"form-select w-50",value:o,onChange:s=>S(s.target.value),children:[e.jsx("option",{value:"",children:"اختر الصف"}),[...new Set(h.map(s=>s.grade))].map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsx("div",{className:"row",children:g.length>0?g.map((s,l)=>e.jsx("div",{className:"col-lg-4 mb-4",children:e.jsxs("div",{className:"card p-4 shadow-md",children:[e.jsx("span",{children:l+1}),e.jsx("div",{className:"card-header rounded-circle mx-auto d-flex justify-content-center align-items-center mb-3",style:{width:"60px",height:"60px"},children:e.jsx(A,{size:30})}),e.jsxs("div",{className:"card-details",children:[e.jsxs("p",{className:"h6 fw-bold my-4",children:["كود الطالب:",e.jsx("strong",{className:"me-1 fw-medium",children:s.studentCode})]}),e.jsxs("p",{className:"h6 fw-bold my-4",children:["الاسم:",e.jsx("strong",{className:"me-1 fw-medium",children:s.name})]}),e.jsxs("p",{className:"h6 fw-bold",children:["الصف:",e.jsx("strong",{className:"me-1 fw-medium",children:M[s.grade]||s.grade})]}),e.jsxs("p",{className:"h6 fw-bold my-4",children:[e.jsx(w,{className:"main-color"})," رقم الطالب:",e.jsx("strong",{className:"me-1 fw-medium",children:s.studentMobile})]}),e.jsxs("p",{className:"h6 fw-bold mb-3",children:[e.jsx(w,{className:"main-color"})," رقم ولي الأمر:",e.jsx("strong",{className:"me-1 fw-medium",children:s.parentMobile})]})]}),e.jsxs("div",{className:"card-buttons mt-3 d-flex justify-content-between gap-3 pt-4 card-details",children:[e.jsxs("button",{className:"btn d-flex align-items-center gap-1 rounded-0","data-bs-toggle":"modal","data-bs-target":"#updateStudentModal",onClick:()=>k(s),children:["تعديل ",e.jsx(I,{})]}),e.jsxs("button",{className:"btn bg-danger d-flex align-items-center gap-1 rounded-0",onClick:()=>G(s._id),children:["حذف ",e.jsx(P,{})]})]})]})},s._id)):e.jsx("div",{className:"col-12 text-center primary-color fw-bold",children:e.jsx("p",{children:"لا يوجد بيانات لعرضها"})})})]})}),e.jsx("div",{className:"modal fade",id:"updateStudentModal",tabIndex:"-1","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header d-flex justify-content-between",children:[e.jsx("button",{type:"button",className:"btn-close ms-auto","data-bs-dismiss":"modal"}),e.jsx("h5",{className:"modal-title",children:"تعديل بيانات الطالب"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsx("label",{className:"form-label",children:"اسم الطالب"}),e.jsx("input",{type:"text",className:"form-control",value:u,onChange:s=>b(s.target.value)}),e.jsx("label",{className:"form-label mt-3",children:"رقم الطالب"}),e.jsx("input",{type:"text",className:"form-control",value:r,onChange:s=>f(s.target.value)}),e.jsx("label",{className:"form-label mt-3",children:"رقم ولي الأمر"}),e.jsx("input",{type:"text",className:"form-control",value:c,onChange:s=>N(s.target.value)})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn","data-bs-dismiss":"modal",children:"إغلاق"}),e.jsx("button",{type:"button",className:"btn",onClick:L,"data-bs-dismiss":"modal",children:"حفظ التعديلات"})]})]})})})]})}export{D as default};
