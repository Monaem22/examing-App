import{r as l,A as i,j as s,f as e,d as a}from"./index-BvLg1fWM.js";import{H as t}from"./Helmet-BZH04Yzz.js";function j(){const{adminRole:d,setAdminRole:m}=l.useContext(i),[r,n]=l.useState(d);return l.useEffect(()=>{const c=sessionStorage.getItem("AdminRole");c!==r&&(n(c),m(c))},[d]),s.jsxs(s.Fragment,{children:[s.jsx(t,{children:s.jsx("title",{children:"لوحة التحكم"})}),s.jsx("section",{className:"my-4 dashboard",children:s.jsxs("div",{className:"container my-5 py-2",children:[s.jsx("h3",{className:"text-center fw-bold mb-3 pb-3",children:"لوحة التحكم المسؤول"}),d==="super_admin"&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"mb-5",children:[s.jsx("h4",{className:"fw-bold mb-4",children:"الطلاب :"}),s.jsxs("div",{className:"row g-4",children:[s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"إضافة طالب"}),s.jsxs(e,{to:"/add-student",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"جميع الطلاب"}),s.jsxs(e,{to:"/students",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})})]})]}),s.jsxs("div",{className:"mb-5",children:[s.jsx("h4",{className:"fw-bold mb-4",children:"الإدارة :"}),s.jsxs("div",{className:"row g-4",children:[s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"إضافة مسؤول"}),s.jsxs(e,{to:"/add-admin",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"جميع المسؤولين"}),s.jsxs(e,{to:"/admins",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})})]})]}),s.jsxs("div",{className:"mb-5",children:[s.jsx("h4",{className:"fw-bold mb-4",children:"الامتحانات :"}),s.jsxs("div",{className:"row g-4",children:[s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"إضافة امتحان"}),s.jsxs(e,{to:"/add-exam",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"جميع الامتحانات"}),s.jsxs(e,{to:"/all-exams",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"درجات الطلاب"}),s.jsxs(e,{to:"/student-grades",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})})]})]})]}),d==="admin"&&s.jsxs("div",{className:"mb-5",children:[s.jsx("h4",{className:"fw-bold mb-4",children:"الإدارة :"}),s.jsxs("div",{className:"row g-4",children:[s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"إضافة مسؤول"}),s.jsxs(e,{to:"/add-admin",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"جميع المسؤولين"}),s.jsxs(e,{to:"/admins",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})})]})]}),d==="exams"&&s.jsxs("div",{className:"mb-5",children:[s.jsx("h4",{className:"fw-bold mb-4",children:"الامتحانات :"}),s.jsxs("div",{className:"row g-4",children:[s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"إضافة امتحان"}),s.jsxs(e,{to:"/add-exam",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"جميع الامتحانات"}),s.jsxs(e,{to:"/all-exams",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"درجات الطلاب"}),s.jsxs(e,{to:"/student-grades",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})})]})]}),d==="user"&&s.jsxs("div",{className:"mb-5 mt-4",children:[s.jsx("h4",{className:"fw-bold mb-4",children:"الطلاب :"}),s.jsxs("div",{className:"row g-4",children:[s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"إضافة طالب"}),s.jsxs(e,{to:"/add-student",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"card p-3 text-center",children:[s.jsx("h6",{className:"mb-3 pb-3 fw-bold",children:"جميع الطلاب"}),s.jsxs(e,{to:"/students",className:"btn rounded-0 w-100",children:["انتقل الى ",s.jsx(a,{className:"ms-2"})]})]})})]})]})]})})]})}export{j as default};
