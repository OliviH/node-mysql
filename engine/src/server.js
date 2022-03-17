import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message:'welcome',date: new Date().toISOString()})
})

import { query } from './test_db.mjs'

app.get('/test', (req, res) => {
    const data = {}
    let step = ''
    step = 'create'
    query(`CREATE TABLE IF NOT EXISTS tasks (
            task_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            start_date VARCHAR(255),
            due_date VARCHAR(255),
            stats INT DEFAULT 0,
            priority INT DEFAULT 0,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        )  ENGINE=MyISAM DEFAULT CHARSET=utf8;`)
        .then(resp=>{
            data[step]={resp}
            step = 'insert'
            return query(`INSERT INTO tasks(title) VALUES ('Première'), ('Deuxième');`)
        })
        .then(resp=>{
            data[step]={resp}
            step = 'select'
            return query(`SELECT * FROM tasks;`)
        })
        .then(resp=>{
            data[step]={resp}
            step = 'drop'
            return query(`DROP TABLE tasks;`)
        })
        .then(resp=>{
            data[step]={resp}

            res.json({
                message: 'done',
                data,
                date: new Date().toISOString()
            })
        })
        .catch(error=> {
            console.error(error)
            res.json({
                message: 'error',
                error,
                date: new Date().toISOString()
            })
        })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log("DATE", new Date().toISOString())
    console.log("*********************")
    console.log("ENV")
    console.log("MARIADB_ROOT_PASSWORD", process.env.MARIADB_ROOT_PASSWORD)
    console.log("MARIADB_DATABASE", process.env.MARIADB_DATABASE)
    console.log("https://medium.com/mariadb/json-tables-with-mariadb-578238cec0c6")
    console.log("https://dev.to/frasnym/how-to-create-dockerized-nodejs-with-mysql-database-1o44")
    console.log("https://github.com/mysqljs/mysql")
    console.log("https://github.com/QTree-app/mysql-json")
})
