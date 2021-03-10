import axios from "axios";

export default () => {
    return axios.create({
        baseURL: `http://10.69.72.99:7002/pingo/`,
        timeout: 30000,
        headers: {
            "content-type": "application/json",
        },
    });
};
