import axios from 'axios';
import { API_NOTIFICATION, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const url = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000';
const axiosInstance = axios.create({
    baseURL: url,
    timeout: 10000,
})
axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(processError(error));
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)
const processResponse = (response) => {
    if(response.status === 200){
        return { isSuccess: true, data: response.data }
    } else{
        return {isFailure: true, status: response.status, msg: response.msg, code: response.code}
    }
}
const processError = (error)=>{
    if(error.response){
        return {
            isError: true,
            msg: error.response.data?.message || API_NOTIFICATION.responsefaliure.message,
            status: error.response,
            details: error.response.data?.details || null,
        }
    } else if(error.request) {
        return {
            isError: true,
            msg: API_NOTIFICATION.requestFaliure.message,
            code: "",
        }
    } else {
        return {isError: true, msg: API_NOTIFICATION.networkError.message, code: ""}
    }

}
const API = {};

for(const [key, value] of Object.entries(SERVICE_URLS)){
    API[key]=(body, showUploadProgress, showDownloadProgress)=>{
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            },
            TYPE: getType(value,body),

            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    }
}
export {API}