const nodemailer=require('nodemailer')


let sentOtp=(email,otp)=>{
    return new Promise((resolve,reject)=>{
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true,
        tls: { 
          rejectUnauthorized: false
        }, // Usually true if connecting to port 465
        auth: {
          user: "anandhus186@gmail.com", // Your email address
          pass: "uroonmvdysyvrhoy", // Password (for gmail, your app password)
        },
      });
  
           var mailOptions={
            from: "anandhus186@gmail.com",
            to: email,
            subject: "Schooler Email verification",
            html: `
            <h1>Verify Your Email For Schooler</h1>
              <h3>use this code to verify your email</h3>
              <h2>${otp}</h2>
            `,
          }
    console.log(email,'dfdfdfdfdfd')
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

