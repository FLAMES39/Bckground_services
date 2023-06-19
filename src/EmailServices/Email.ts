import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'
import { sqlConfig } from '../config'
import ejs, { Template } from 'ejs'
import { sendMail } from '../Helpers/SendMail'


//config setting for the dotenv file
dotenv.config({path:path.resolve(__dirname,'../../.env') })

interface iusers {
    userid: string
    name: string,
    password: string,
    email: string,
    role: string
}

 export const sendEmail= async ()=>{
    //connect to database 
    const pool= await  mssql.connect(sqlConfig)
    //select the user
    let users:iusers[]=   (await (await pool.request()).query('SELECT * FROM Users WHERE emailSent =0')).recordset
    // console.log(users);
    //after selecting a user you now loop through the unsent email user and send the email

    for(let user of users){
        //send email

    ejs.renderFile('Template/email.ejs',{name:user.name}, async (err,html)=>{
            
        //1st create a messageOptions

           try {
            let messageOptions={
                from: 'mashadachris85@gmail.com', 
                to: "christianabiodun2020@gmail.com", 
                subject: "WELCOME MAIL✔", 
                html,
                attachments: [
                    {   // utf-8 string as an attachment
                        // filename: 'text1.txt',
                        // content: 'hello world!'
                        path:__dirname+'/email.pdf'
                    }]
                
            } 
           console.log(html);
           
            
            //send mail now
            await sendMail(messageOptions)
           } catch (error:any) {
            
           }
            
        })
      
    }
    }