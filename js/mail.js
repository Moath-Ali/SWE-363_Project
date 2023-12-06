const e = require('express');
const nodeMailer = require('nodemailer');


const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.email',
  service: 'gamil',
  auth:{
    user: 'devpath23@gmail.com',
    pass: 'dejajndgrjbleqdz'
  }
});




let mailOptions ={
  from: "talsumari@gmail.com",
  to: "devpath23@gmail.com",
  subject: document.getElementById("Subject").value,
  text: document.getElementById("message").value
}

const btn = document.getElementById("sub");
btn.addEventListener("click",transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error);
  }
  else{
    console.log('Email sent: '+info.response);
  }
}))
