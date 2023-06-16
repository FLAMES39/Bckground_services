import nodemailer from 'nodemailer'
import mssql from 'mssql'
import ejs from 'ejs'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../.env') })

interface user{
    name:string,
    email:string
}

//create configaraations
let ConfigOptions={
    host:"smtp.gmail.com",
    port:587,
    services:"gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

const fetchUserFromDatabase = async ()=>{
    try {
        
    //first configure sql connection
    const config ={
        user:process.env.DB_USER as string,
        password:process.env.DB_PWD as string,
        server:process.env.DB_SERVER as string,
        database:process.env.DB_NAME as string
    }
    //connect to the database
     await mssql.connect(config);
     //Stored procedure or query to fetch the user data
      const query = 'SELECT name, email FROM Users WHERE IsDelete=0';
      //execute the query and get the result
      const userInfo=await mssql.query(query);
      //close the mssql connection
    //   await sql.close();
      //return the fetched user data
      return userInfo.recordset;

    } catch (error:any) {
        console.log(error);
        throw error;
        
        
    }
}



ejs.renderFile('Template/email.ejs',{name:"Christian",message:"Don't miss out on the latest updates and offers. Click the button below to stay connected:"},
async (err, html)=>{
try {

    const users= await fetchUserFromDatabase();
    for (let user of users){
        const{name,email}= user
    }



    console.log(html);
    let messageOptions={
        from: 'mashadachris85@gmail.com', 
        to: "christianabiodun2020@gmail.com", 
        subject: "Hello ✔", 
        html,
        attachments: [
            {   // utf-8 string as an attachment
                // filename: 'text1.txt',
                // content: 'hello world!'
                path:__dirname+'/email.pdf'
            }]
    }
   
        //create transporter
        let transporter= nodemailer.createTransport(ConfigOptions)
        //transport or send email
        await transporter.sendMail(messageOptions)


} catch (error:any) {
    console.log(error);  
    
}
    
    
})





//send the message


// async function sendMail(mailopts:any){
//     //create transporter
//     let transporter=nodemailer.createTransport(ConfigOptions);
//     //transport email
//     await transporter.sendMail(mailopts)
// }

// sendMail(messageOptions)



console.log("running...")