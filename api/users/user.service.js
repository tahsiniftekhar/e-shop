const pool = require("../../config/database")

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            `select username from users where username = ?`,
            [data.username],
            (error, results) => {
                if (results.length === 0){
                    pool.query(
                        `insert into users(username, password) values(?,?)`,
                        [
                            data.username,
                            data.password
                        ],
                        (error, results) => {
                            if (error){
                                return callBack(error)
                            }
                            return callBack(null, results)
                        }
                    )
                }else{
                    return callBack(null, "username already exists!")
                }
            }
        )
    },

    getUsers:callBack => {
        pool.query(
            `select id, username from users`,
            [],
            (error, results) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getUserByUsername: (username, callBack) => {
        pool.query(
            `select * from users where username = ?`,
            [username],
            (error, results) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },

    getUserById: (id, callBack) => {
        pool.query(
            `select id,username from users where id = ?`,
            [id],
            (error, results) => {
                if (error){
                    return callBack(error)
                }
                console.log(results)
                return callBack(null, results[0])
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update users set username=?, password=? where id=?`,
            [
                data.username,
                data.password,
                data.id
            ],
            (error, results) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    deleteUser: (id, callBack) => {
        pool.query(
            `delete from users where id=?`,
            [id],
            (error, results) => {
                if (error){
                    return callBack(error)
                }
                console.log(results)
                return callBack(null, results)
                
            }
        )
    },

}