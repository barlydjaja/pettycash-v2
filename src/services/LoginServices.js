import api from "@/api"
import apiLogin from "@/api/ApiLogin"

export default function(body){
    return apiLogin().post(api.login,body)
}
