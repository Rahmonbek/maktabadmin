import axios from "axios"

export const url="http://62.209.143.146:8003"
// export const id=2
export const httpRequest=(config)=>{
    return(axios({
        ...config
    }))
}