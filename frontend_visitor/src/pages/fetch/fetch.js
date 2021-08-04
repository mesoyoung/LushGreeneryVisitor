
//Policies
function getPolicyData(){
    let status;
    return fetch(
        "http://localhost:3030/plans"
    ).then((response)=>{
        status = response.status
        return response.json();
    }).then((json)=>{
        if (status > 200) throw json;
        const array = [json, details]
    }).catch((error)=> console.error(error));
}

function postVisitorInput(fullname, email, planid, feedback, contact_type, details){
    const plan = parseInt(planid)
    let status;
    return fetch(
        "http://localhost:3030/visitors",
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                planid: plan,
                feedback: feedback,
                contact_type: contact_type,
                details: details
            })
        }
    ).then((response)=>{
        status = response.status;
        return response.json
    }).then((json)=>{
        if(status>200) throw json
        return json
    }).catch((error)=>console.error(error))
}