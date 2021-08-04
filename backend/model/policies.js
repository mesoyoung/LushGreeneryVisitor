const db = require('./databaseConfig.js');

var policiesDB = {
    addPolicy: function (fk_org_id, fk_category_id, details) {
        var conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    console.log("Doing adding policies!")
                    const sql = `INSERT INTO plans(fk_org_id, fk_category_id, details) values (?,?,?)`;
                    conn.query(sql, [fk_org_id, fk_category_id, details], function (err, result) {
                        conn.end()
                        if (err) {
                            console.log(err)
                            return reject(err);
                        } else {
                            console.log(result.id + " rows are affected");
                            return resolve(result);
                        }
                    })
                }
            });
        })
    },
    //adding policy

    deletePolicy: function (plan_id) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection()
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    conn.end();
                    return reject(err)
                } else {
                    console.log("Connected! Doing delete :O")
                    const sql = `DELETE FROM plans WHERE plan_id = ?`;
                    conn.query(sql, [plan_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            console.log('plan_id ' + plan_id + ' deleted');
                            return resolve(result);
                        }
                    })
                }
            })
        })

    },
    //deleting policies

    updatePolicy: function (fk_category_id, fk_org_id, details, plan_id, callback) {
        var conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    return reject(err)
                } else {
                    console.log("Connected! Getting policy " + plan_id);
                    var sql = `select * from plans where plan_id = ?`
                    conn.query(sql, [plan_id], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null)
                        } else {
                            if (fk_category_id == undefined) fk_category_id = result[0].fk_category_id;
                            if (fk_org_id == undefined) fk_org_id = result[0].fk_org_id;
                            if (details == undefined) details = result[0].details;

                            let sql = `Update plans set fk_category_id=?, fk_org_id=?, details=? where plan_id = ?`
                            conn.query(sql, [fk_category_id, fk_org_id, details, plan_id], function (err, result) {
                                conn.end()

                                if (err) {
                                    console.log(err);
                                    return reject(err);
                                }
                                else {
                                    console.log(result.affectedRows + " rows are affected");
                                    return resolve(result)
                                }
                            })
                        }
                    })
                }
            })
        })
    },
    //updating policies

    getAllPoliciesAdmin: function () {
        var conn = db.getConnection()
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    console.log("Connected! Getting all policies");
                    var sql = 'SELECT details FROM plans'
                    conn.query(sql, function (err, result) {
                        conn.end();
                        if (err) {
                            return reject(err)
                        } else {
                            return resolve(result)
                        }
                    })
                }
            })
        })
        /**/
    },
    getAllPoliciesByCat: function (fk_category_id) {
        var conn = db.getConnection()
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    console.log("Connected! Getting all policies by category");
                    var sql = `SELECT details FROM plans WHERE fk_category_id = ?`
                    conn.query(sql, [fk_category_id], function (err, result) {
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
    //Admin

    getAllPoliciesByOrg: function (fk_org_id) {
        var conn = db.getConnection()
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    console.log("Connected! Getting all policies by organisation");
                    var sql = `SELECT details FROM plans WHERE fk_org_id = ?`
                    conn.query(sql, [fk_org_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            return resolve(result)
                        }
                    })
                }
            })
        })

    },
    //show all policies for admins

    //Get policy through selection
    //policyCount
    updateCount: function (plan_id, added_by_user) {
        let conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log("Connected! Getting plans by " + plan_id);
                    let sql = `select * from plans where plan_id = ?`
                    conn.query(sql, [plan_id], function (err, result) {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            if (added_by_user == undefined) added_by_user = result[0].added_by_user;
                            let sql = `update plans set added_by_user = ? where plan_id = ?`;
                            conn.query(sql, [added_by_user, plan_id], function (err, result) {
                                conn.end();
                                if (err) {
                                    console.log(err)
                                    return reject(err)
                                } else {
                                    console.log(result.affectedRows + " rows are affected.")
                                    return resolve(result);
                                }
                            })
                        }
                    })
                }
            })
        })

    }
}

module.exports = policiesDB;