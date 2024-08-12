import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'
import { sqlConfig } from '../config'
import ejs, { Template } from 'ejs'
import { sendMail } from '../Helpers/SendMail'


//config setting for the dotenv file
dotenv.config({path:path.resolve(__dirname,'../../.env') })

// interface iusers {
//     userid: string
//     name: string,
//     password: string,
//     email: string,
//     role: string
// }
interface landlords{
    lordLordid:number
    name:string
    email:string
    propertyDocs:string
    approved:number
    password:string
    role:string
    IsDeleded:number
    emailSent:number
    userid:number
    Ptopertyid:number
}


interface iCompanies{
    CompanyID:number
    Name:string
    Description:string
    Industry:string
    Logo:string
    ContactInfo:string
    Email:string
    Password:string
}


interface iusers {
    UserID: number,
    Name: string,
    Password: string,
    Email: string,
    Role: string,
    emailSent:number,
    IsDeleted:number
    bio:string
}




 export const SendMail= async ()=>{
    //connect to database 
    const pool= await  mssql.connect(sqlConfig)
    //select the user
    let users:iusers[]=   (await (await pool.request()).query('SELECT * FROM Users WHERE emailSent =0')).recordset
    // let Landlords:iCompanies[]=   (await (await pool.request()).query('SELECT * FROM landlords WHERE emailSent =0')).recordset

    //console.log(users);
    //after selecting a user you now loop through the unsent email user and send the email

    for(let user of users){
        //send email

    ejs.renderFile('Template/email.ejs',{Name:user.Name}, async (err,html)=>{
            
        //1st create a messageOptions

           try {
            let messageOptions={
                from: process.env.EMAIL, 
                to: user.Email, 
                subject: "WELCOME MAIL✔", 
                html,
                
            }  
        //  console.log(html);
           //send mail now
          await sendMail(messageOptions)
          //update emailsent to one to avoid sending multiple emails to the same user
          await pool.request().query(`UPDATE Users SET emailSent=1 WHERE UserID='${user.UserID}'`)
        //   console.log(user.userid);
          
           
            
           } catch (error:any) {
            console.error('error sending email:',error)
           }
            
        })
      
    }
    }