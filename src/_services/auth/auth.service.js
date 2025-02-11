import basePath from '../../_helpers/basePath'
export const userService = {
    login,
    register
}

async function login(userName,password){
    debugger
const requestOption = {
    method: "POST",
    headers :{'content-Type' : 'application/json'},
    body: JSON.stringify({userName,password})
}
const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Login',requestOption);
const res = await handleResponse(response)
return res;
}
async function register(model){
    const requestOption = {
        method: "POST",
        headers :{'content-Type' : 'application/json'},
        body: JSON.stringify(model)
    }
    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Save/',requestOption);
    const res = await handleResponse(response)
    return res;
}

function handleResponse(response){
return response.text().then(txt =>{
const data = JSON.parse(txt);
if(!response.ok){
    const error = (data && data.message) || response.statusText ;
return Promise.reject(error);
}
return data;
})
}