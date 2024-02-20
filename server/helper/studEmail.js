const nodemailer=require('nodemailer')


let studEmail=(email,password)=>{
    return new Promise((resolve,reject)=>{
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 465,
        secure: true,
        tls: { 
          rejectUnauthorized: false
        }, 
        auth: {
          user: process.env.NODEMAILER_EMAIL, 
          pass: process.env.APP_PASSWORD, 
        },
      });
  
           var mailOptions={
            from:process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Schooler Student Login Details",
            html: `
            <h2>Login Email: ${email} </h2>
              <h2>Login password: ${password}</h2>
              <h3>Use above email and password for login</h3>
            `,
          }
  
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("email sent error ", error)
              reject(error)
            } else {
              console.log("email sent successfull")
              resolve(otp)
            }
          });
    
    })
}

module.exports=studEmail;

