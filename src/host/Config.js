import { httpRequest, id, url } from "./Host"

export const getNews=()=>{
    var config={
        url:`${url}/new/${id}`,
        method:'get',

    }
    return(httpRequest(config))
}

export const createNew=(config)=>{
    var config={
        url:`${url}/new`,
        method:'post',
        data:config

    }
    return(httpRequest(config))
}

export const deleteNew=(idD)=>{
    var config={
        url:`${url}/new/${idD}`,
        method:'delete',


    }
    return(httpRequest(config))
}