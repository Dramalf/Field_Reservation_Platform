const express = require('express')
const { db } = require('./db')
const app=express()
app.get('/getUser', (req,resp)=> {
    const sql = 'select * from t_user';
    db(sql, null)
        .then(res => {
        resp.send(res)
    })
})
app.get('/addUser', (req,resp)=> {
    const sql = 'insert into t_user set ?';
    const sqlParams={phone:'13780',name:'猪猪'}
    db(sql,sqlParams)
        .then(res => {
        resp.send(res)
    })
})
app.get('/modifyUser', (req,resp)=> {
    const sql='UPDATE t_user SET phone=? WHERE name = ?'
    const sqlParams=['hh','马聆风']
    db(sql, sqlParams)
       .then(res => {
            resp.send(res)
    })
})
app.listen(8080,(err)=>{
	if(!err) console.log('服务器1启动成功了,请求学生信息地址为：http://localhost:8080/students');
})
