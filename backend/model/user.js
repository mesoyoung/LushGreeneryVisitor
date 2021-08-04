const { use } = require('../controller/app.js');
var db = require('./databaseConfig.js');
const bcrypt = require('bcryptjs');

var userDB = {
    //Financial Advisor
    getAllUser: function () {
        return new Promise((resolve, reject) => {
            let conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    conn.end()
                    return reject(err);
                } else {
                    const sql = 'Select users.username, roles.role_name, organisations.org_name, rep_code.rep_code from users inner join roles on users.fk_role_id = roles.role_id inner join organisations on users.fk_org_id = organisations.org_id inner join rep_code on users.user_id = rep_code.fk_user_id where users.fk_role_id = 2';
                    conn.query(sql, function (err, result) {
                        conn.end()
                        if (err) {
                            console.log(err)
                            return reject(err);
                        } else {
                            return resolve(result);
                        }
                    })
                }
            })
        })
    },
    //Getting all Secondary Admins for Master Admin

    getUserByOrg: function (fk_org_id) {
        let conn = db.getConnection()
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log('Getting users by organisations');
                    const sql = 'Select users.fullname, users.username, roles.role_name, organisations.org_name from users inner join organisations on users.fk_org_id = organisations.org_id inner join roles on users.fk_role_id = roles.role_id where users.fk_org_id = ? and users.approval_status = "Approved"'
                    conn.query(sql, [fk_org_id], function (err, result) {
                        conn.end()
                        if (err) {
                            console.log(err);
                            return reject(err)
                        } else {
                            return resolve(result)
                        }
                    })
                }
            })
        })
    },
    //Getting all Financial Advisors for Secondary Admin

    updateUserStatus: function (user_id, approval_status) {
        return new Promise((resolve, reject) => {
            let conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err)
                } else {
                    console.log('Getting users by organisations');
                    const sql = `Update users set approval_status = ? where user_id = ?`;
                    conn.query(sql, [approval_status, user_id], function (err, result) {
                        conn.end()
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            return resolve(result);
                        }
                    })
                }
            })
        })

    },
    //Approve/Reject users

    userRegister: function (fullname, username, fk_org_id, registered_email) {
        var conn = db.getConnection();
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    conn.end();
                    return reject(err);
                } else {
                    console.log("Posting user into database");
                    let sql = "insert into user(fullname, username, fk_org_id, registered_email) values(?,?,?,?)"
                    conn.query(sql, [fullname, username, fk_org_id, registered_email], function (error, result) {
                        conn.end();
                        if (error) {
                            console.log(error);
                            return reject(error);
                        } else {
                            console.log
                            return resolve(result)
                        }
                    })
                }
            })
        })
    },

    addUsersContacts: function (userid, user_contact_type, details) {
        return new Promise(function (resolve, reject) {
            const conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log("Database have " + err + " error.");
                    return resolve(err)
                } else {
                    console.log("Inputing contact to the database");
                    const sql = `insert into user_contact(fk_user_id, user_contact_type, contact_details) values(?,?,?)`;
                    conn.query(sql, [userid, user_contact_type, details], function (error, result) {
                        conn.end()
                        if (error) {
                            console.log(error);
                            return reject(error);
                        } else {
                            console.log("Posting is successful!");
                            return resolve(result);
                        }
                    })
                }
            })
        })
    },

    addPassword: function (fk_user_id, password) {
        const conn = db.getConnection()
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (err) {
                    conn.end();
                    console.log(err);
                    return reject(err);
                } else {
                    const sql = "insert into user_password(fk_user_id, user_password) value(?,?)";
                    conn.query(sql, [password, fk_user_id], function (error, result) {
                        conn.end();
                        if (error) {
                            console.log(error);
                            return reject(error);
                        } else {
                            console.log("Posting successful!");
                            return resolve(result);
                        }
                    })
                }
            })
        })
    },

    updateProfile: function (user_id, fullname, registered_email) {
        var conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    conn.end()
                    console.log(err);
                    return reject(err);
                } else {
                    let sql = `Get fullname, registered_email from users where user_id = ?`
                    conn.query(sql, function (error, result) {
                        if (error) {
                            conn.end();
                            console.log(error)
                            return reject(error);
                        } else {
                            if (fullname == undefined) fullname = result[0].fullname;
                            if (registered_email == undefined) registered_email = result[0].registered_email;
                            if (user_id == undefined) user_id = result[0].user_id;

                            const sql = `Update users set fullname = ?, registered_email = ? where user_id = ?`;
                            conn.query(sql, [fullname, registered_email, user_id], function (error, result) {
                                conn.end();
                                if (error) {

                                    console.log(error);
                                    return reject(error);
                                } else {
                                    console.log("Update is successful!")
                                    return resolve(result);
                                }
                            })
                        }
                    })
                }
            })
        })
    },

    updatePassword: function (user_id, password) {
        var conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    conn.end()
                    console.log(err);
                    return reject(err);
                } else {
                    let sql = `Get user_password from user_password where fk_user_id = ?`
                    conn.query(sql, user_id, function (error, result) {
                        if (error) {
                            conn.end();
                            console.log(error)
                            return reject(error);
                        } else {
                            if (user_id == undefined) user_id = result[0].fk_user_id;
                            if (password == undefined) password = result[0].user_password;
                            let sql = `Update user_password set user_password = ? where fk_user_id = ?`;
                            conn.query(sql, [password, user_id], function (error, result) {
                                if (error) {
                                    conn.end();
                                    console.log(error);
                                    return reject(error);
                                } else {
                                    return resolve(result);
                                }
                            })
                        }
                    })
                }
            })
        })
    },

    updateContact: function (userid, user_contact_type, details) {
        var conn = db.getConnection();
        return new Promise((reject, resolve) => {
            conn.connect((err) => {
                if (err) {
                    conn.end();
                    console.log(err)
                    return reject(err);
                } else {
                    let sql = `get user_contact_type, contact_details from user_contact where fk_user_id = ?`
                    conn.query(sql, userid, (error, result) => {
                        if (error) {
                            conn.end();
                            console.log(error);
                            return reject(error);
                        } else {
                            if (userid == null) userid = result[0].fk_user_id
                            if (user_contact_type == null) user_contact_type = result[0].user_contact_type
                            if (details == null) details = result[0].contact_details;
                            let sql = `update user_contact set contact_details = ? where user_contact_type = ? and fk_user_id = ? `
                            conn.query(sql, [details, userid, user_contact_type], (error, result) => {
                                if (error) {
                                    conn.end();
                                    console.log(error);
                                    return reject(error);
                                } else {
                                    console.log("Updating is a success!")
                                    return resolve(result)
                                }
                            })
                        }
                    })

                }
            })
        })
    },

}
module.exports = userDB;