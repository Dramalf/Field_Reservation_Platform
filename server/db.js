const mysql = require('mysql')
const config = {
    database: 'field_reservation_sys',
    user: 'root',
    password:'不告诉你'
}


const pool = mysql.createPool(config)
exports.db = (sql, sqlParams) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (!err) {
                conn.query(sql, sqlParams, (e, results) => {
                    if (!e) {
                     //   console.log(results)
                        resolve(results)
                        conn.destroy()
                    } else {
                        console.log('sql',e)
                        reject(e)
                    }
                })
            } else {
                console.log('conn err', err)
                reject(err)
            }
                
        })
    })
}