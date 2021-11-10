
import axios, { AxiosError, AxiosResponse }  from 'axios';
import { toast } from 'react-toastify';
import { history } from './../../index';

const sleep=()=>new Promise(reslove=> setTimeout(reslove,500));

axios.defaults.baseURL="http://localhost:5000/api/"

const responseBody=(res:AxiosResponse)=>res.data;

axios.interceptors.response.use( async res=>{
    await sleep();
    return res;
},(error:AxiosError)=>{
    const{data,status}=error.response!;

switch (status) {
        case 400:
            if(data.errors){
                const modelStateErros:string[]=[];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErros.push(data.errors[key]);
                    }
                }
                throw modelStateErros.flat();
            }

        toast.error(data.title)
        break;
        case 401:
        toast.error(data.title)
        break;
         case 500:
             history.push({
                 pathname:"/server-error",
                 state:{er:data}
             })
        // toast.error(data.title)
        break;
    default:
        break;
}

    return Promise.reject(error.response);
})

const requests={
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
}

const Catalog={
    list:()=>requests.get('products'),
    details:(id:number)=>requests.get(`products/${id}`)
}

const TestErrors={
    get400Error:()=>requests.get('buggy/bad-request'),
    get401Error:()=>requests.get('buggy/unauthorised'),
    get404Error:()=>requests.get('buggy/not-found'),
    get500Error:()=>requests.get('buggy/server-error'),
    getValidationError:()=>requests.get('buggy/validation-error'),
}

const agent={
    Catalog,
    TestErrors
}

export default agent;