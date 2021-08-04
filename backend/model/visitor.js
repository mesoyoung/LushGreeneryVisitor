const db = require('./databaseConfig.js');

let visitorDB = {
    getVisitorData: function () {
        const conn = db.getConnection()
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (err) {
                    console.log("Database has " + err + " error.")
                    resolve(err);
                } else {
                    console.log("Database is connected!");
                    const sql = `SELECT visitors.fullname, visitors.email, plans.details, visitor_contact.visitor_contact_type, visitor_contact.contact_details FROM visitors inner join plans on visitors.fk_plan_id = plans.plan_id inner join visitor_contact on visitor_contact.fk_visitor_id = visitors.visitor_id`
                    conn.query(sql, function name(err, result) {
                        conn.end();
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

    getFeedback: function () {
        const conn = db.getConnection()
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (err) {
                    console.log("Database has " + err + "error.");
                    resolve(err);
                } else {
                    console.log("Conneecting to the database...");
                    const sql = `select feedback from visitors`
                    conn.query(sql, function (err, result) {
                        conn.end();
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
    
    //Get visitor data
    getFinancialAdvisor: function () {
        const conn = db.getConnection()
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (err) {
                    console.log("Database has " + err + " error.")
                    return resolve(err);
                } else {
                    console.log("Database is connected!");
                    const sql = `select users.fullname, user_contact.user_contact_type, user_contact.contact_details from users inner join user_contact on users.user_id = user_contact.fk_user_id`
                    conn.query(sql, function (err, result) {
                        conn.end();
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

    //post data
    inputVisitorData: function (fullname, email, fk_plan_id, feedback) {
        const conn = db.getConnection();
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (err) {
                    console.log("Database has " + err + " error.")
                    return resolve(err);
                } else {
                    console.log("Posting visitor data into the database");
                    const sql = `insert into visitors(fullname, email, fk_plan_id, feedback) values(?,?,?,?)`
                    conn.query(sql, [fullname, email, fk_plan_id, feedback], function (err, result) {
                        if (err) {
                            conn.end()
                            console.log(err);
                            return reject(err);
                        } else {

                            console.log("Posting is successful!");
                            return resolve(result);
                        }
                    })
                }
            })
        })
    },

    //Post contacts
    inputVisitorContacts: function (fk_contact_id, visitor_contact_type, details) {
        return new Promise(function (resolve, reject) {
            const conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log("Database have " + err + " error.");
                    return resolve(err)
                } else {
                    console.log("Inputing contact to the database");
                    const sql = `insert into visitor_contact(fk_visitor_id, visitor_contact_type, contact_details) values(?,?,?)`
                    conn.query(sql, [fk_contact_id, visitor_contact_type, details], function (error, result) {
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

}

module.exports = visitorDB;