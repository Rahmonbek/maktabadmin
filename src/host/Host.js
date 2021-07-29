import axios from "axios"

export const url="http://maktab2.herokuapp.com"
export const id="2"
export const httpRequest=(config)=>{
    return(axios({
        ...config
    }))
}