import axios from 'axios';


export function setJwt(jwt){
    axios.defaults.headers.common["x-auth-token"] = jwt;
  }

export default {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    patch : axios.patch,
    delete : axios.delete,
    setJwt
}