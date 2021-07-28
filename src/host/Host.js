import axios from "axios"

export const url="http://maktab2.herokuapp.com"
export const id="3"
export const httpRequest=(config)=>{
    return(axios({
        ...config
    }))
}