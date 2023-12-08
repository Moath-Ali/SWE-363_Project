// const options = document.querySelectorAll('.option');
//         // const resultDiv = document.getElementById('result');
      
//         options.forEach(option => {
//           option.addEventListener('click', () => {
//             options.forEach(o => o.classList.remove('selected'));
//             option.classList.add('selected');
//             // resultDiv.textContent = `Selected Option: ${option.textContent}`;
//           });
//         });

function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

window.onscroll = function () {
  progressBarScroll();
};
// let web = 0;
// let mobile = 0; 
// let data = 0;
// let cyper = 0;
// function selectedOp(option,questionId){
//   console.log("hehe")
//     const options = document.querySelectorAll(`#${questionId} .option`);
//     options.forEach(o => o.classList.remove('selected', 'removed'));
//     option.classList.add('selected', 'removed');
// }
// function selectOption(option) {
//   const optionsContainer = option.parentElement;
//   const options = optionsContainer.querySelectorAll('.option');
//   // const resultDiv = document.getElementById('result');
//   const questionId = optionsContainer.getAttribute('data-options');

//   options.forEach(o => o.classList.remove('selected', 'removed'));
//   option.classList.add('selected', 'removed');
//   // resultDiv.textContent = `Selected Option for ${questionId}: ${option.textContent}`;
// }

const selectedOptions = {};

  function selectOption(option) {
    const optionsContainer = option.parentElement;
    const questionId = optionsContainer.getAttribute('data-options');
    const resultDiv = document.getElementById('result');

    if (selectedOptions[questionId]) {
      // If an option is already selected for this question, remove the selection
      selectedOptions[questionId].classList.remove('selected', 'removed');
    }

    // Set the new selected option for this question
    selectedOptions[questionId] = option;

    // Update the resultDiv with the selected option information
    // resultDiv.textContent = `Selected Option for ${questionId}: ${option.textContent}`;

    // Apply the 'selected' and 'removed' classes to the selected option
    option.classList.add('selected', 'removed');
  }
const ans = [
  {A:"Web-development mobile-development",B:"Software-development algorithm-design",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"Software-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"},
  {A:"Web-development",B:"mobile-development",C:"Data-science",D:"Cybersecurity network-engineering"}
]
const p1 = "Web-development";
const p2 = "mobile-development";
const p3 = "Software-development";
const p4 = "algorithm-design";
const p5 = "Data-science";
const p6 = "Cybersecurity";
const p7 = "network-engineering";
let v1 =0;
let v2 =0;
let v3 =0;
let v4 =0;
let v5 =0;
let v6 =0;
let v7 =0;
let flag = false;
function calc(){
  let answers = document.querySelectorAll(".selected");
  let ansLetter = [];
  let anspath = [];
  answers.forEach( a =>{
    ansLetter.push(a.innerText.charAt(0))
  })

  for(let i = 0 ; i<20 ; i++){
    if(ansLetter[i]==='A'){
      ansLetter[i] = ans[i].A;
    }
    else if(ansLetter[i]==='B'){
      ansLetter[i] = ans[i].B;
    }
    else if(ansLetter[i]==='C'){
      ansLetter[i] = ans[i].C;
    }
    else if(ansLetter[i]==='D'){
      // console.log(ans[i].D)
      ansLetter[i] = ans[i].D;
    }
  }
  // console.log(ansLetter)
  ansLetter.forEach(e =>{
    if(e.includes(p1)){
      v1++;
    }
    if(e.includes(p2)){
      v2++;
    }
    if(e.includes(p3)){
      v3++;
    }
    if(e.includes(p4)){
      v4++;
    }
    if(e.includes(p5)){
      v5++;
    }
    if(e.includes(p6)){
      v6++;
    }
    if(e.includes(p7)){
      v7++;
    }
    
  })
  // console.log(v1,v2,v3,v4,v5,v6,v7)
  // console.log(Math.max(v5,v6,v7))
  let counter = 0;
  
//   r.forEach(e=>{
//     if(e===Math.max(r)){
//       counter++
//     }
//     if(counter>=2){
//       flag=true;
      
//     }
//   })
  
// console.log(r,p)
let r =[v1,v2,v3,v4,v5,v6,v7]
const max =Math.max(...r);
// console.log(getAllIndexes(r,max))
let p =[p1,p2,p3,p4,p5,p6,p7]
// console.log(r)
let recPaths = []
// console.log(r)
// console.log(getAllIndexes(r,max))
getAllIndexes(r,max).forEach(e=>{
  recPaths.push(p[e]);
})
// console.log(ind)

if(recPaths.length===1){
  return recPaths[0]
}
else{
  let resultPath = ""
  for(let i = 0; i<recPaths.length; i++){
    if(i!==recPaths.length-1){
      resultPath = resultPath+recPaths[i]+",";
    }
    else{
      resultPath = resultPath+recPaths[i];
    }
    
    
  }
  return resultPath;
}

// console.log(recPaths)
}


function getAllIndexes(arr, value) {
  let indexes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      indexes.push(i);
    }
  }
  return indexes;
}


const express = require('express');
const qRouter = express.Router();

qRouter.use("/quiz-end",(req,res)=>{
  
  res.render("quiz-end",{path:calc()})
})

const a = document.getElementById("subt");

a.addEventListener("click",submit)

function submit(){

  fetch(`/quiz-end`,{
    method:"POST",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({path:calc()})
  });

}
