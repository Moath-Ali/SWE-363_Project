 async function sendMail(){
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("Subject").value,
    message: document.getElementById("message").value
  }
  // if(parms.email !== "" && parms.name !== "" &&parms.subject !== ""&&parms.message !== ""){
    try{
      await emailjs.send("service_wohqpst","template_a9uq6vv",parms)
    }
    catch(error){
      console.error(error);
      alert('Failed to send email');
    }
  
  // }
  
}
