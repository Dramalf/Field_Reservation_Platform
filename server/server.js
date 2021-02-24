const express = require('express')
const app = express()
const {db}=require('./db')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use((request,response,next)=>{
	console.log('有人请求服务器1了');
	console.log('请求来自于',request.get('Host'));
	console.log('请求的地址',request.url);
	next() 
})
let xcDateInfo = []
let zcDateInfo = []
let dcDateInfo = []
let curDateInfo =[]
const myDate = new Date()
const day = myDate.getDay()
const date = myDate.getDate()
const getWeekDay = day => {
    switch (day) {
        case 1:
            return '星期一'
        case 2:
            return '星期二'
        case 3:
            return '星期三'
        case 4:
            return '星期四'
        case 5:
            return '星期五'
        case 6:
            return '星期六' 
        case 0:
            return '星期日'
    }
}
class dateObj {
    constructor(weekDay, date,fieldName,day) {
        this.id = date,    
        this.day = weekDay,
        this.fieldName = fieldName,
        this.reservationState=-1,//-1无人预约/0仍有空闲/1无空闲
        this.reservationInfo = [
        {
            period: '10:00~12:00',
            state: 1,//-1教学时间，不可预约；0已被预约；1可预约
            details: {
                host: '',
                userid: '',
                event: ''
            }
        },
        {
            period: '12:00~14:00',
            state: 1,//-1教学时间，不可预约；0已被预约；1可预约
            details: {
                host: '',
                userid: '',
                event: ''
            }
        },
        {
            period: '14:00~16:00',
            state: 1,//-1教学时间，不可预约；0已被预约；1可预约
            details: {
                host: '',
                userid: '',
                event: ''
            }
        }]
    }
}
   
for (var i = 0; i < 7; i++) {
    const wd = getWeekDay((day * 1 + i) % 7)
    xcDateInfo = [...xcDateInfo, new dateObj(wd, date + i,'xc',day*1+i)]
    zcDateInfo = [...zcDateInfo, new dateObj(wd, date + i, 'zc',day*1+i)]
    dcDateInfo = [...dcDateInfo, new dateObj(wd, date + i,'dc',day*1+i)]
}

getChosedField = (cf) => {
    switch (cf) {
        case 'xc': 
            return xcDateInfo
        case 'zc':
            return zcDateInfo
        default:
            return dcDateInfo

    }
} 
function getFieldName(state) {
    switch (state) {
        case 'xc':
        return '西操'
        case 'zc':
            return '中操'
        case 'dc':
            return '东操'

    }
}
//notice
let notice=[]

/*dateObj {
    id: 19,
    day: '星期五',
    fieldName: 'xc',
    reservationState: -1,
    reservationInfo: [ [Object], [Object], [Object] ]
*/
app.post('/login', (req, res) => {
    const { userId } = req.body
    let host = '计算机学院'
    if (userId.length > 2)
        host='光电学院'
    res.send(host)
    // { userId: 'u213', username: '马聆风', remember: true }

})



app.post('/choose-field', (request, response) => {
    const { chosedField } = request.body
    curDateInfo = getChosedField(chosedField)
    const data = {
        dateInfo: curDateInfo,
        cf:chosedField
    }
    let str = JSON.stringify(data);
	response.send(str) 
})
 
app.post('/reservation', (request, response) => {
    console.log(request.body)
    const{period,event,host,dateid,chosedField,day}=request.body
    curDateInfo = getChosedField(chosedField)
    let errMsg=''
    curDateInfo.map(dateObj => {
        if (dateObj.id === dateid) {
            let state = 0
            
            dateObj.reservationInfo.map(rezObj => {
                if (rezObj.period === period) {
                    if (rezObj.state === 0) {
                        errMsg = `该时段已被${rezObj.details.host}预定，请勿重复预定`
                    }
                    else {
                        rezObj.state = 0
                        rezObj.details.host = host
                        rezObj.details.event = event
                        const msg=`${host} 预定了 ${getFieldName(chosedField)} ${dateid}号${day}${period}场次`
                        const sql = 'insert into notice set ?';
                        const sqlParams={msg:msg,event:event}
                        db(sql,sqlParams)
                            .then(res => {
                        })
                        notice = [
                            {
                                msg: msg,
                                event: event
                            },
                            ...notice]
                       
                    }
                    
                }
                state+= rezObj.state
            })
            dateObj.reservationState = state ? 0 : 1
        }
    })

    const data = {
         dateInfo: curDateInfo,
        cf: chosedField,
         errMsg:errMsg
     }
     let str =JSON.stringify(data);
  
    response.send(str) 
})
 

app.get('/field-info',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*')

    const { fieldName } = request.query
    curDateInfo=getChosedField(fieldName)
    data = {
        dateInfo:curDateInfo
       }
     let str = JSON.stringify(data);
 
	response.send(str)
})


app.get('/notice',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*')
  //  console.log(xcDateInfo)
    const { fieldName } = request.query
    curDateInfo=getChosedField(fieldName)
    const sql = 'select * from notice';
    db(sql, null)
         .then(res => {
            data = {
                dateInfo: curDateInfo,
                notice:res
               }
             let str = JSON.stringify(data);
             response.send(str)
     })
	
})

app.listen(5000,(err)=>{
	if(!err) console.log('服务器1启动成功了,请求学生信息地址为：http://localhost:5000/students');
})
