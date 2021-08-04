const { use } = require('../controller/app.js');
var db = require('./databaseConfig.js');

var organisationDB = {

    // get all organisation
    getAllOrganisations: function () {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    conn.end()
                    return reject(err);
                } else {
                    console.log('Getting all organisations');
                    const sql = `SELECT * FROM organisations`;
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

    // get specific organisation
    getSingleOrganisation: function (org_id) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    conn.end()
                    return reject(err);
                } else {
                    console.log('Getting organisation ' + org_id);
                    const sql = `SELECT * FROM organisations WHERE org_id = ?`;
                    conn.query(sql, [org_id], function (err, result) {
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

    // add organisation
    addOrganisation: function (org_name) {
        return new Promise(function (resolve, reject) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err)
                    conn.end();
                    return reject(err);
                } else {
                    console.log('Adding new organisation');
                    let sql = `INSERT INTO organisations (org_name) VALUES (?)`;
                    conn.query(sql, [org_name], function (err, result) {
                        if (err) {
                            console.log(err);
                            conn.end();
                            return reject(err);
                        } else {
                            return resolve(result)
                        }
                    })
                }
            })
        })
    },

    // update organisation
    updateOrganisation: function (org_name, org_id) {
        var conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    conn.end();
                    console.log(err);
                    return reject(err);
                } else {
                    console.log('Updating organisation name');
                    let sql = `UPDATE organisations SET org_name = ? WHERE org_id = ?`;
                    conn.query(sql, [org_name, org_id], function (err, result) {
                        if (err) {
                            conn.end();
                            console.log(err);
                            return reject(err);
                        } else {
                            console.log('Updated org_id: ' + org_id)
                            return resolve(result);
                        }
                    })
                }
            })
        })
    },

    // delete organisation
    deleteOrganisation: function (org_id) {
        var conn = db.getConnection();
        return new Promise((resolve, reject) => {
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    console.log("Deleting an organisation.")
                    let sql = `DELETE FROM organisations WHERE org_id = ?`;
                    conn.query(sql, [org_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else {
                            console.log('org_id ' + org_id + ' deleted');
                            return resolve(result);
                        }
                    })
                }
            })
        })
    },
}

module.exports = organisationDB;