import{u as c,r as m,j as e,L as u,m as h,F as x,$ as f,y as r}from"./index-BU-rm2uI.js";import{H as g}from"./Helmet-CYjTrV5H.js";import{a as p}from"./api-DTyocR7z.js";import{c as b,a as j,u as v}from"./index.esm-DFs15I_E.js";function L(){const n=c(),[i,a]=m.useState(!1);async function d(l){try{a(!0);let{data:t}=await p.post("/api/exam/login-to-degrees",l);r.success("تم تسجيل الدخول بنجاح"),sessionStorage.setItem("GradesCode",t.data.studentCode),a(!1),n("/grades")}catch(t){a(!1),t.response&&t.response.data.message.includes("هذا الطالب")?r.warning("الكود ليس صحيحا او الطالب غير موجود بالفعل!"):r.error("حدث خطأ أثناء تسجيل الدخول!")}}let o=b({studentCode:j().required("كود الطالب مطلوب")});const s=v({initialValues:{studentCode:""},validationSchema:o,onSubmit:d});return i?e.jsx(u,{}):e.jsxs(e.Fragment,{children:[e.jsx(g,{children:e.jsx("title",{children:"تسجيل دخول الدرجات"})}),e.jsx("section",{className:"login",children:e.jsx("div",{className:"container my-5 py-5",children:e.jsx("div",{className:"row justify-content-center p-3 my-4",children:e.jsxs(h.div,{variants:x(.3),initial:"hidden",animate:"visible",className:"col-md-6 p-4 shadow-sm",children:[e.jsx("h3",{className:"text-center mb-4",children:"تسجيل الدخول للدرجات"}),e.jsxs("form",{onSubmit:s.handleSubmit,children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"studentCode",className:"form-label fw-bold",children:"كود الطالب :"}),e.jsx("input",{className:"form-control",placeholder:"أدخل كود الطالب",style:{textAlign:"right",direction:"rtl"},id:"studentCode",name:"studentCode",value:s.values.studentCode,onChange:s.handleChange,onBlur:s.handleBlur}),s.errors.studentCode&&s.touched.studentCode?e.jsx("div",{className:"alert alert-danger p-2 my-2 rounded-0",children:s.errors.studentCode}):""]}),e.jsx("button",{type:"submit",className:"btn rounded-0 w-100 d-flex justify-content-center",disabled:!(s.isValid&&s.dirty),children:i?e.jsx(f,{height:"20",width:"50",color:"#fff",ariaLabel:"bars-loading",visible:!0}):"تسجيل الدخول"})]})]})})})})]})}export{L as default};
