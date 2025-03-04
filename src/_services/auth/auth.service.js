import basePath from '../../_helpers/basePath'
export const userService = {
    login,
    register,

    save,
    update,
    getAll,
    getById,
    delete: _delete
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

// copy of the above function register with a name save
async function save(model){
    const requestOption = {
        method: "POST",
        headers :{'content-Type' : 'application/json'},
        body: JSON.stringify(model),
        header : auth.header(false)
    }
    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Save/',requestOption);
    const res = await handleResponse(response)
    return res;
}
//make a copy of the above function with name Update    
async function update(model){
    const requestOption = {
        method: "POST",
        headers :{'content-Type' : 'application/json'},
        body: JSON.stringify(model),
        header : auth.header(false)
    }
    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Update/',requestOption);
    const res = await handleResponse(response)
    return res;
}
//make a copy of the above function with name getAll
async function getAll(){
    const requestOption = {
        method: "GET",
        headers : auth.header(false)
    }
    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/GetAll/',requestOption);
    const res = await handleResponse(response)
    return res;
}
//make a copy of the above function with name getById
async function getById(id){
    const requestOption = {
        method: "GET",
        headers : auth.header(false)
    }
    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/GetById/'+id,requestOption);
    const res = await handleResponse(response)
    return res;
}
//make a copy of the above function with name delete
async function _delete(id){
    const requestOption = {
        method: "POST",
        headers : auth.header(false),
        body: JSON.stringify(model),
        headers :{'content-Type' : 'application/json'},
    }
    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Delete/'+id,requestOption);
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