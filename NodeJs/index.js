const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'EmployeeDB',
    multipleStatements:true,

});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Database Connection successful...');
    else
    console.log('Database connection failed '+ JSON.stringify(err))
});


app.listen(3000,()=>{
    console.log('express server is at port number 3000')
});


app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
         if(!err)
         res.send(rows);
         else
         console.log('Error in Retriving Employees' + JSON.stringify(err));
        });

});


app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
   })
});


app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE  FROM employee WHERE EmpID=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('DELETE EMPLOYEE SUCCESSFUL..');
        else
        console.log(err);
   })
});



app.post('/employees',(req,res)=>{
    let emp = req.body;
    console.log(emp);

    var sql = 'INSERT INTO  employee (Name, EmpCode, Salary) VALUES (?, ?, ?);'
    mysqlConnection.query(sql,[emp.Name,emp.EmpCode,emp.Salary],(err,rows)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);  
   }) 
}); 
       

app.put('/employees/:id',(req,res)=>{
    let emp = req.body;
    console.log(emp);
    var sql = 'UPDATE employee SET Name = ?, EmpCode =? ,Salary = ? WHERE EmpID=?'
    mysqlConnection.query(sql,[emp.Name,emp.EmpCode,emp.Salary,req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);  
   })      
}); 
   