import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'


//config setting for the dotenv file
dotenv.config({path:path.resolve(__dirname,'../../.env') })
//confirmation setting for database


export const sqlConfig = {
    server:process.env.DB_SERVER as string,
    user:process.env.DB_USER as string,
    password:process.env.DB_PWD as string,
    database:process.env.DB_NAME as string,

    pool:{
        max:10,
        min:0,
        idleTimeoutMillis: 300000
    },
    options:{
        encrypt: false,
        trustServerCertificate: false
    }

}
//TEST DATABASE CONNECTION
mssql.connect(sqlConfig).then (pool =>{
    if(pool.connected){
        console.log(`Database connected `);
        
    }
})