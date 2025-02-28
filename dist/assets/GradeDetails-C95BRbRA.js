import{r as c,j as s,L as j,y as d}from"./index-BvLg1fWM.js";import{H as p}from"./Helmet-BZH04Yzz.js";import{a as g}from"./api-sjr0-pHH.js";function b(){const[n,m]=c.useState(!1),[e,o]=c.useState(null);async function x(){const a=sessionStorage.getItem("StudentDegreesDegreesCode"),i=sessionStorage.getItem("StudentDegreesExamCode");if(!a||!i){d.error("بيانات الامتحان غير متوفرة، الرجاء العودة للصفحة السابقة.");return}try{m(!0);let{data:t}=await g.get(`/api/exam/exam-details/${a}/${i}`);o(t.data),d.success("تم جلب تفاصيل الامتحان بنجاح.")}catch(t){d.error("حدث خطأ أثناء جلب تفاصيل الامتحان."),console.error(t)}finally{m(!1)}}return c.useEffect(()=>{x()},[]),n?s.jsx(j,{}):s.jsxs(s.Fragment,{children:[s.jsx(p,{children:s.jsx("title",{children:"تفاصيل الامتحان"})}),s.jsxs("section",{className:"exam-details my-5 py-3",children:[s.jsx("h5",{className:"fw-bold m-3",children:"تفاصيل الامتحان :"}),s.jsx("div",{className:"container",children:e?s.jsxs("div",{className:"card p-3 shadow-sm rounded-3 mt-4",children:[s.jsx("div",{className:"card-header text-white fw-bold main-bg",children:e.exam.title}),s.jsxs("ul",{className:"list-group list-group-flush",children:[s.jsxs("li",{className:"list-group-item",children:["📜 الوصف: ",e.exam.description]}),s.jsxs("li",{className:"list-group-item",children:["📅 التاريخ: ",e.exam.date]}),s.jsxs("li",{className:"list-group-item",children:["⏰ الوقت: ",e.exam.time]}),s.jsxs("li",{className:"list-group-item",children:["⌛ المدة: ",e.exam.duration]}),s.jsxs("li",{className:"list-group-item",children:["❓ عدد الأسئلة: ",e.exam.totalQuestions]}),s.jsxs("li",{className:"list-group-item",children:["🔢 كود الامتحان: ",e.exam.examCode]}),s.jsxs("li",{className:"list-group-item",children:["🏆 الدرجة: ",e.score]})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx("h5",{className:"fw-bold",children:"📌 الأسئلة:"}),e.exam.questions.map((a,i)=>s.jsxs("div",{className:"mt-3 p-3 exam-details-questions rounded",children:[s.jsxs("h6",{className:"fw-bold main-bg p-2 text-white",children:[i+1,". ",a.question_title]}),s.jsx("ul",{className:"list-unstyled mt-2",children:a.subQuestions.map((t,u)=>{const l=e.detailedAnswers.find(r=>r.questionId===t._id);return s.jsxs("li",{className:"mb-2 list-questions",children:[s.jsxs("strong",{className:"text-muted",children:[i+1,".",u+1," ",t.questionText]}),s.jsx("ul",{className:"mt-1",children:t.options.map((r,h)=>s.jsxs("li",{className:`ms-3 ${r===t.correctAnswer?"text-success fw-bold":""}`,children:["- ",r]},h))}),s.jsxs("p",{className:"mt-2 text-success fw-bold",children:["✅ الإجابة الصحيحة: ",t.correctAnswer]}),s.jsxs("p",{className:`mt-2 fw-bold ${l!=null&&l.isCorrect?"text-success":"text-danger"}`,children:["🎯 إجابة الطالب:"," ",l?l.studentAnswer:"لم يتم الإجابة"]})]},t._id)})})]},a._id))]})]}):s.jsx("div",{className:"text-center text-danger fw-bold mt-3",children:s.jsx("p",{children:"لم يتم العثور على تفاصيل الامتحان."})})})]})]})}export{b as default};
