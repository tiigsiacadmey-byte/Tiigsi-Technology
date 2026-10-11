const COURSES=["Basic Computer Application","IT Fundamentals & Troubleshooting","Graphic Design Masterclass","Video Editing Masterclass","CCTV Camera Training Course","Data Analysis with Excel"];
function login(){if(adminUser.value==="admin"&&adminPass.value==="tiigsi2026"){sessionStorage.admin="1";showDash()}else loginError.textContent="Username ama password waa khalad."}
function showDash(){loginBox.classList.add("hidden");dashboard.classList.remove("hidden");filter.innerHTML='<option value="">Koorsooyinka oo dhan</option>'+COURSES.map(c=>`<option>${esc(c)}</option>`).join("");renderTable()}
function logout(){sessionStorage.removeItem("admin");location.reload()}
function formatDateTime(v){
  if(!v) return "-";
  const d=new Date(v);
  if(Number.isNaN(d.getTime())) return esc(v);
  return d.toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"});
}
function renderTable(){
 let all=getStudents(),q=search.value.toLowerCase(),f=filter.value;
 let d=all.filter(x=>(!q||[x.studentId,x.name,x.phone,x.course,x.city,x.message,x.dateTime].join(" ").toLowerCase().includes(q))&&(!f||x.course===f));
 total.textContent=all.length;
 dateCount.textContent=all.filter(x=>x.dateTime).length;
 messageCount.textContent=all.filter(x=>x.message&&x.message.trim()).length;
 courseCount.textContent=new Set(all.map(x=>x.course).filter(Boolean)).size;
 tbody.innerHTML=d.map((x,i)=>`<tr><td>${i+1}</td><td><b>${esc(x.studentId)}</b></td><td><b>${esc(x.name)}</b><small>${esc(x.email||"")}</small></td><td>${esc(x.phone)}</td><td>${esc(x.course)}</td><td>${formatDateTime(x.dateTime)}</td><td>${esc(x.message||"-")}</td><td><button class="iconbtn" onclick="viewStudent('${x.id}')">👁️</button><button class="iconbtn danger" onclick="delStudent('${x.id}')">🗑️</button></td></tr>`).join("")||'<tr><td colspan="8" class="empty">Weli lama helin diiwaangelin.</td></tr>';
}
function changeStatus(id,v){changeField(id,"status",v)}
function changeExam(id,v){changeField(id,"examStatus",v)}
function changeField(id,key,v){let d=getStudents(),x=d.find(a=>a.id===id);if(x){x[key]=v;saveStudents(d);renderTable()}}
function viewStudent(id){let x=getStudents().find(a=>a.id===id);alert(`XOGTA ARDAYGA\n\nStudent ID: ${x.studentId}\nMagac: ${x.name}\nPhone: ${x.phone}\nCourse: ${x.course}\nCity: ${x.city}\nDate & Time: ${formatDateTime(x.dateTime)}\nFariin: ${x.message||"-"}`)}
function delStudent(id){if(confirm("Ma hubtaa inaad tirtirayso ardaygan?")){saveStudents(getStudents().filter(x=>x.id!==id));renderTable()}}
function exportCSV(){let d=getStudents(),rows=[["Student ID","Name","Phone","Email","Age","Gender","City","Course","Date & Time","Message","Date"],...d.map(x=>[x.studentId,x.name,x.phone,x.email,x.age,x.gender,x.city,x.course,x.dateTime,x.message,x.date])];let csv=rows.map(r=>r.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\n");let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="tiigsi-students.csv";a.click()}
if(sessionStorage.admin==="1")showDash();
