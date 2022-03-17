import MysqlJson from 'mysql-json'

const mysqlJson = new MysqlJson({
    host            : 'mariadb',
    user            : 'root',
    password        : process.env.MARIADB_ROOT_PASSWORD,
    database        : process.env.MARIADB_DATABASE
})

console.log({
    host            : process.env.HOST_DB,
    user            : 'root',
    password        : process.env.MARIADB_ROOT_PASSWORD,
    database        : process.env.MARIADB_DATABASE
})

export const createTable = (name, schema) => {
    return new Promise((acc, rej) => {
        try {
            mysqlJson.query(`CREATE TABLE IF NOT EXISTS ${name} (${schema})`, function(err, response) {
                if (err) return rej(err);
                acc(response);
            })
        }
        catch(err) {
            rej(err)
        }
    })
}

export const deleteTable = (name) => {
    return new Promise((acc, rej) => {
        try {
            mysqlJson.query(`CREATE TABLE IF NOT EXISTS ${name} (${schema})`, function(err, response) {
                if (err) return rej(err);
                acc(response);
            })
        }
        catch(err) {
            rej(err)
        }
    })
}

export const query = (query) => {
    return new Promise((acc, rej) => {
        try {
            mysqlJson.query(query, function(err, response) {
                if (err) return rej(err);
                acc(response);
            })
        }
        catch(err) {
            rej(err)
        }
    })
}