import{u as h,r as x,j as e,L as p,f,$ as j,y as l}from"./index-BvLg1fWM.js";import{H as b}from"./Helmet-BZH04Yzz.js";import{a as N}from"./api-sjr0-pHH.js";import{c as g,a as d,u as v}from"./index.esm-QEcpd-Ep.js";import{I as w}from"./index-Ci69w3Nc.js";function L(){const n=h(),[o,r]=x.useState(!1);async function i(u){try{r(!0);let{data:a}=await N.post("/api/admin/add-admin",u);l.success("تم اضافة المسؤول بنجاح"),console.log(a.type),r(!1),n("/admins")}catch(a){r(!1),a.response&&a.response.data.message==="هذا المستخدم موجود بالفعل"?l.warning("المستخدم موجود بالفعل!"):l.error("حدث خطأ أثناء إضافة المسؤول!")}}const t=/^(010|011|012|015)[0-9]{8}$/,c=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;let m=g({userName:d().matches(t,"رقم الهاتف غير صالح، يجب أن يكون مصريًا").required("رقم الهاتف مطلوب"),password:d().matches(c,"كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، وحرف خاص، ولا تقل عن 6 أحرف").required("كلمه المرور مطلوبة"),role:d().required("الدور مطلوب")});const s=v({initialValues:{userName:"",password:"",role:""},validationSchema:m,onSubmit:i});return o?e.jsx(p,{}):e.jsxs(e.Fragment,{children:[e.jsx(b,{children:e.jsx("title",{children:"اضافة مسؤول"})}),e.jsx("section",{className:"my-5 py-4 add-admin",children:e.jsxs("div",{className:"container mt-3",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center my-3",children:[e.jsx("h4",{className:"fw-bold dash-header",children:"إضافة مسؤؤل جديد :"}),e.jsx(f,{to:"/admin-dashboard",className:"redirect-link",children:e.jsxs("button",{className:"btn px-4 rounded-0 fs-6",children:["الرجوع الى لوحه التحكم"," ",e.jsx(w,{size:18,className:"mx-2"})]})})]}),e.jsxs("form",{onSubmit:s.handleSubmit,children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{htmlFor:"userName",className:"form-label fw-bold",children:"رقم الهاتف :"}),e.jsx("input",{className:"form-control mb-3",placeholder:"أدخل رقم الهاتف",style:{textAlign:"right",direction:"rtl"},id:"userName",name:"userName",value:s.values.userName,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.userName&&s.touched.userName?e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.userName}):""]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{htmlFor:"password",className:"form-label fw-bold",children:"كلمة المرور :"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"أدخل كلمة المرور",style:{textAlign:"right",direction:"rtl"},id:"password",name:"password",value:s.values.password,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.password&&s.touched.password?e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.password}):""]})]}),e.jsx("div",{className:"row mb-3",children:e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{htmlFor:"role",className:"form-label fw-bold",children:"الدور :"}),e.jsxs("select",{id:"role",name:"role",className:"form-select",value:s.values.role,onChange:s.handleChange,onBlur:s.handleBlur,children:[e.jsx("option",{value:"",disabled:!0,hidden:!0,children:"اختر الدور"}),e.jsx("option",{value:"admin",children:"مسؤول ادارة"}),e.jsx("option",{value:"user",children:"مسؤول الطلاب"}),e.jsx("option",{value:"exams",children:"مسؤول امتحانات"})]}),s.errors.role&&s.touched.role?e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.role}):""]})}),e.jsx("button",{type:"submit",className:"btn rounded-0 d-flex justify-content-center",disabled:!(s.isValid&&s.dirty),children:o?e.jsx(j,{height:"20",width:"50",color:"#fff",ariaLabel:"bars-loading",visible:!0}):"اضافة المسؤول"})]})]})})]})}export{L as default};
