import{u as k,r as i,y as d,j as s,L as A,c as L,d as Q}from"./index-BU-rm2uI.js";import{H as $}from"./Helmet-CYjTrV5H.js";import{a as S}from"./api-DTyocR7z.js";function z(){var N,p,w,I,b,y;const v=k(),[E,m]=i.useState(!1),[t,f]=i.useState(null),[l,h]=i.useState({minutes:0,seconds:0}),[x,g]=i.useState([]),[c,u]=i.useState(0);i.useEffect(()=>{const e=JSON.parse(localStorage.getItem("savedAnswers"));e&&g(e)},[]),i.useEffect(()=>{const e=localStorage.getItem("currentQuestionIndex");e!==null&&u(Number(e))},[]),i.useEffect(()=>{localStorage.setItem("currentQuestionIndex",c)},[c]);async function q(){try{m(!0);let{data:e}=await S.get("/api/exam/take-exam"),n=localStorage.getItem("student_exam");if(n)f(JSON.parse(n));else{const a=e.data.exam.questions.map(r=>({...r,subQuestions:[...r.subQuestions].sort(()=>Math.random()-.5)})).sort(()=>Math.random()-.5),o={...e.data,exam:{...e.data.exam,questions:a}};f(o),localStorage.setItem("student_exam",JSON.stringify(o)),localStorage.setItem("currentQuestionIndex",0),u(0)}h({minutes:e.data.remainingTime.minutes||0,seconds:e.data.remainingTime.seconds||0}),d.success("تم تحميل الامتحان بنجاح.")}catch{d.error("حدثت مشكلة أثناء تحميل الامتحان!")}finally{m(!1)}}i.useEffect(()=>{q()},[]),i.useEffect(()=>{if(l.minutes===0&&l.seconds===0){j();return}const e=setInterval(()=>{h(n=>n.seconds>0?{...n,seconds:n.seconds-1}:n.minutes>0?{minutes:n.minutes-1,seconds:59}:(clearInterval(e),{minutes:0,seconds:0}))},1e3);return()=>clearInterval(e)},[l]);const _=(e,n)=>{g(a=>{const o=a.findIndex(C=>C.questionId===e);let r;return o!==-1?(r=[...a],r[o]={questionId:e,answer:n}):r=[...a,{questionId:e,answer:n}],localStorage.setItem("savedAnswers",JSON.stringify(r)),r})};async function j(){if(!t||!t.exam){console.log("Wait");return}if(t.exam.questions.flatMap(n=>n.subQuestions.filter(a=>!x.some(o=>o.questionId===a._id))).length>0){d.warning("يجب الإجابة على جميع الأسئلة قبل إرسال الامتحان!");return}try{m(!0);const n=await S.post(`/api/exam/submit-exam/?studentCode=${t.studentCode}&examCode=${t.examCode}`,{answers:x});console.log(n.data.type),d.success("تم إرسال الإجابات بنجاح!"),localStorage.removeItem("savedAnswers"),localStorage.removeItem("student_exam"),localStorage.removeItem("currentQuestionIndex"),v("/grades-login",{replace:!0})}catch(n){d.error("حدثت مشكلة أثناء إرسال الإجابات!"),console.error(n)}finally{m(!1)}}return E?s.jsx(A,{}):s.jsxs(s.Fragment,{children:[s.jsx($,{children:s.jsx("title",{children:((N=t==null?void 0:t.exam)==null?void 0:N.title)||"اختبار"})}),s.jsx("section",{className:"my-5 py-4 exam",children:s.jsxs("div",{className:"container",children:[s.jsx("h5",{className:"text-center primary-color fw-bold mt-1",children:(p=t==null?void 0:t.exam)==null?void 0:p.title}),s.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-5 exam-header",children:[s.jsxs("p",{className:"text-center",children:["وصف الامتحان : ",(w=t==null?void 0:t.exam)==null?void 0:w.description]}),s.jsx("div",{className:"w-50",children:s.jsxs("p",{className:"text-center main-bg text-white py-3",children:["⏳ الوقت المتبقي: ",l.minutes," دقيقة و ",l.seconds," ","ثانية"]})})]}),s.jsx("div",{className:"accordion mt-4",children:((I=t==null?void 0:t.exam)==null?void 0:I.questions)&&t.exam.questions.length>0&&s.jsxs("div",{className:"accordion-item",children:[s.jsx("h2",{className:"accordion-header",children:s.jsxs("button",{className:"accordion-button main-bg text-white",type:"button",children:[c+1,"."," ",t.exam.questions[c].question_title]})}),s.jsx("div",{className:"accordion-body",children:t.exam.questions[c].subQuestions.map((e,n)=>s.jsxs("div",{className:"py-3 exam-sub-question",children:[s.jsxs("p",{className:"fw-bold mb-4",children:[s.jsxs("strong",{children:[c+1,".",n+1," -"]})," ",e.questionText," .........."]}),s.jsx("div",{className:"d-flex flex-wrap my-2",children:e.options.map((a,o)=>s.jsxs("div",{className:"form-check me-3",children:[s.jsx("input",{className:"form-check-input",type:"radio",name:e._id,id:`option-${e._id}-${o}`,value:a,checked:x.some(r=>r.questionId===e._id&&r.answer===a),onChange:()=>_(e._id,a)}),s.jsx("label",{className:"form-check-label",htmlFor:`option-${e._id}-${o}`,children:a})]},o))})]},e._id))})]})}),s.jsxs("div",{className:"d-flex justify-content-between mt-4",children:[s.jsxs("button",{className:"btn shadow-lg rounded-0",disabled:c===0,onClick:()=>u(e=>e-1),children:[s.jsx(L,{size:20,className:"mx-1"}),"السؤال السابق"]}),c<((y=(b=t==null?void 0:t.exam)==null?void 0:b.questions)==null?void 0:y.length)-1?s.jsxs("button",{className:"btn shadow-lg rounded-0",onClick:()=>u(e=>e+1),children:["التالي السؤال",s.jsx(Q,{size:20,className:"mx-1"})]}):s.jsx("button",{className:"btn rounded-0",onClick:j,children:"إرسال الإجابات"})]})]})})]})}export{z as default};
