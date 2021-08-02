import { httpRequest, id, url } from "./Host"

export const getNews=()=>{
    var config={
        url:`${url}/new/${id}`,
        method:'get',

    }
    return(httpRequest(config))
}

export const createNew=(config)=>{
    var configs={
        url:`${url}/new/`,
        method:'post',
        data:config,
        
            headers: {
              "content-type": "multipart/form-data",
            },
        
    }
    return(httpRequest(configs))
}

export const deleteNew=(idD)=>{
    var config={
        url:`${url}/new/${idD}`,
        method:'delete',


    }
    return(httpRequest(config))
}
export const editNew=(configs, idT)=>{
    var config= {
        url: `${url}/new/${idT}/`,
        method: 'put',
        data: configs
    }
    return (httpRequest(config))
}

export const getEvents=()=>{
    var config={
        url:`${url}/event/${id}`,
        method:'get',
    }
    return(httpRequest(config))
}

export const createEvent=(config)=>{
    var configs={
        url:`${url}/event/`,
        method:'post',
        data:config,
        
            headers: {
              "content-type": "multipart/form-data",
            },
        
    }
    return(httpRequest(configs))
}

export const deleteEvent=(idD)=>{
    var config={
        url:`${url}/event/${idD}`,
        method:'delete',


    }
    return(httpRequest(config))
}
export const editEvent=(configs, idT)=>{
    var config= {
        url: `${url}/event/${idT}/`,
        method: 'put',
        data: configs
    }
    return (httpRequest(config))
}
