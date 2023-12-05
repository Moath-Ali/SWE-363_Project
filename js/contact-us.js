 function sendMail(){
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("Subject").value,
    message: document.getElementById("message").value
  }
  // if(parms.email !== "" && parms.name !== "" &&parms.subject !== ""&&parms.message !== ""){
    
    emailjs.send("service_wohqpst","template_a9uq6vv",parms).then(function(res){
      console.log("Sent successfully:", res);
      window.location.href = "http://localhost:3000/contact-us-thank-you"
    }, function(error) {
      console.log("Failed to send:", error);
      // Handle errors or show a message to the user
    }
    )
    
    
  
  // }
  
}
