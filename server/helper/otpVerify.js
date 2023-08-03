const nodemailer=require('nodemailer')


let sentOtp=(email,otp)=>{
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
            subject: "Schooler Email verification",
            html: `
            <h1>Verify Your Email For Schooler</h1>
              <h3>use this code to verify your email</h3>
              <h2>${otp}</h2>
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
module.exports=sentOtp;

