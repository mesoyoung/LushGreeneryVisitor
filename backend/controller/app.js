var express = require('express');
var app = express();
var policy = require('../model/policies.js');
var visitor = require('../model/visitor.js')
const users = require('../model/user.js')
var organisation = require('../model/organisations.js')

var urlencodedParser = express.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(express.json());

//Policies

// start educating the app object what to spot and what to build
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//     console.log(req.headers)
//     next();
// })

//Getting policy for admin
app.get('/plans/', function (req, res) {
    policy.getAllPoliciesAdmin()
        .then(function (result) {
            res.status(200).send(result);
        })
        .catch(function (error) {
            res.send(500).send(error)
        })
})

//Getting policies for I want to
app.get('/plans/:fk_category_id/plan_category', function (req, res) {
    var id = req.params.fk_category_id;
    policy.getAllPoliciesByCat(id)
        .then(function (result) {
            res.status(200).send(result)
        })
        .catch(function (error) {
            res.send(500).send(error)
        })
})

//Getting policies by organisations
app.get('/plans/:fk_org_id/organisations', function (req, res) {
    var id = req.params.fk_org_id;
    policy.getAllPoliciesByOrg(id)
        .then(function (result) {
            res.status(200).send(result)
        })
        .catch(function (error) {
            res.send(500).send(error)
        })
})

//Deleting policies
app.delete('/plans/:plan_id', function (req, res) {
    var id = req.params.plan_id
    policy.deletePolicy(id)
        .then(function (result) {
            res.status(204).send()
        })
        .catch(function (error) {
            res.send(500).send(error)
        })
});
//End of Policies

//Users//
app.post('/users', function (req, res) {
    let fullname = req.body.fullname
    let username = req.body.username
    let email = req.body.registered_email
    let fk_org_id = req.body.fk_org_id

    users.userRegister(fullname, username, fk_org_id, email)
        .then(function (result) {
            res.status(200).send(result);
        })
        .catch(function (error) {
            if (error = 'ER_BAD_FIELD_ERROR') {
                res.status(422).send("Unprocessable Entity");
            }
            res.status(500).send("Unknown Error");
        })
});

//Register for advisors
app.post('/advisors', function (req, res) {
    let fullname = req.body.fullname
    let username = req.body.username
    let email = req.body.required_email
    let password = req.body.user_password
    let fk_org_id = req.body.fk_org_id
    let contact_type = req.body.user_contact_type;
    let details = req.body.contact_details
    let rep_code = req.body.rep_code;

    users.userRegister(fullname, username, fk_org_id, email).then(function (result) {
        users.addUsersContacts(result.insertId, contact_type, details).then(function (result) {
            res.status(200)
        })
            .catch(function (error) {
                res.status(500).send(error)
            })
        res.status(200).send(result);
    }).then(function (result) {
        users.addRepcode(result.insertId, rep_code).then(function () {
            res.send(500);
        }).catch(function (error) {
            res.status(200).send(error)
        })
    }).catch(function (error) {
        if (error = 'ER_BAD_FIELD_ERROR') {
            res.status(422).send("Unprocessable Entity");
        }
        res.status(500).send("Unknown Error");
    })
});

//Update password
app.put('/users/:id/user_password', function (res, req) {
    let password = req.body.password
})

//Getting users by Org
app.get('/users/:fk_org_id/organisations', function (req, res) {
    let id = req.params.fk_org_id;

    users.getUserByOrg(id).then(function (result) {
        res.status(200).send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    })
})

//Get all users
app.get('/users/', function (req, res) {
    users.getAllUser().then(function (result) {
        res.status(200).send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    })

})
//Updating users
app.put('/users/:userid', (req, res) => {

    let userid = req.params.userid;
    let fullname = req.body.fullname;
    let email = req.body.registered_email;
    users.updateProfile(userid, fullname, email).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        if (error = 'ER_BAD_FIELD_ERROR') {
            res.status(422).send("Unprocessable Entity");
        }
        res.status(500).send("Unknown Error");
    })

})

//Updating financial advisors
app.put('/advisors/:userid', (req, res) => {

    let userid = req.params.userid;
    let fullname = req.body.fullname;
    let email = req.body.registered_email;
    let contact_type = req.body.user_contact_type;
    let contact_details = req.body.contact_details;

    users.updateProfile(userid, fullname, email).then((result) => {
        users.updateContact(contact_type, contact_details).then((result) => {
            res.send(200)
        }).catch((error) => {
            res.status(500)
        })
        res.status(200).send(result)
    }).catch((error) => {
        if (error = 'ER_BAD_FIELD_ERROR') {
            res.status(422).send("Unprocessable Entity");
        }
        res.status(500).send("Unknown Error");
    })

})

//End of Users

//Visitor

//Get Visitor Data
app.get('/visitors/', function (req, res) {
    visitor.getVisitorData().then(function (result) {
        res.status(200).send(result);
    }).catch(function (error) {
        res.status(500).send(error);
    })
});

//Get Feedbacks
app.get('/feedbacks/', function (req, res) {
    visitor.getFeedback().then(function (result) {
        res.status(200).send(JSON.stringify(result));
    }).catch(function (error) {
        res.status(500).send(error);

    })
});

//Post visitor data
app.post('/visitors/', function (req, res) {
    let fullname = req.body.fullname;
    let email = req.body.email;
    let fk_plan_id = req.body.fk_plan_id;
    let feedback = req.body.feedback
    let details = req.body.contact_details
    let contact_type = req.body.visitor_contact_type

    if (feedback == null || feedback == '') {
        feedback = '';
    }
    if (contact_type == null || contact_type == '') {
        contact_type = 'Not Applicable'
    }

    visitor.inputVisitorData(fullname, email, fk_plan_id, feedback).then(function (result) {
        res.status(200).send("visitorID : " + result.insertId);
        console.log(result);
        //Input contact
        visitor.inputVisitorContacts(result.insertId, contact_type, details)
            .then(function (result) {
                res.status(200);
                console.log(result);
                return;
            })
        return;
    })
        .catch(function (error) {
            res.status(500).send(error);
            return;
        })
});
//Move to middleware and add next
//Add loop for contact types here

/* ORGANISATION */
// get all organisations
app.get('/organisations/', function (req, res) {
    organisation.getAllOrganisations()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send('Server Error');
        })
})

// get specific organisation
app.get('/organisations/:org_id', function (req, res) {
    var org_id = req.params.org_id;
    organisation.getSingleOrganisation(org_id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send('Server Error');
        })
})

// add organisation
app.post('/organisations', function (req, res) {
    var org_name = req.body.org_name;
    organisation.addOrganisation(org_name)
        .then((result) => {
            res.status(201).send({ "org_id: ": + result.insertId });
        })
        .catch((err) => {
            res.status(500).send('Server Error');
        })
})

// update organisation
app.put('/organisations/:org_id', function (req, res) {
    var org_id = req.params.org_id;
    var org_name = req.body.org_name;
    organisation.updateOrganisation(org_name, org_id)
        .then((result) => {
            res.status(200).send({ 'Updated org_id: ': + org_id })
        })
        .catch((err) => {
            res.status(500).send('Server Error');
        })
})

// delete organisation
app.delete('/organisations/:org_id', function (req, res) {
    var org_id = req.params.org_id;
    organisation.deleteOrganisation(org_id)
        .then((result) => {
            res.status(204).send();
        })
        .catch((err) => {
            res.status(500).send('Server Error');
        })
})

module.exports = app;