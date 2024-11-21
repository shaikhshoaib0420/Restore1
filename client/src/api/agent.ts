import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";

axios.defaults.baseURL = "http://localhost:5202/api/";
axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

const wait = () => new Promise(resolve => setTimeout(resolve, 2000));
axios.interceptors.response.use(async (response: AxiosResponse) => {
    await wait();
    return response;
}, (error: any) => {
    const {data, status} = error.response as AxiosResponse;
    switch(status) {
        case 401: 
            toast.error("Unauthorized");
            break;
        case 404:
            router.navigate('/not-found')
            toast.error("Not Found");
            break;
        case 400: 
            if(data.errors) {
                const modelState: string[] = [];
                for(const err in data.errors) {
                    modelState.push(data.errors[err]);
                }
                throw modelState.flat();
            }
            toast.error("Bad Request");
            break;
        case 500: 
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            toast.error("No Relatable Error");
            break;
        
    }
    console.log("error caught in interceptor");
    return Promise.reject(error.response);
});

const responseBody = (res: AxiosResponse) => res.data; 

const request = {
    get : (url: string) => axios.get(url).then(responseBody),
    post: (data: any, url: string) => axios.post(url, data).then(responseBody),
    put: (url: string, data: any) => axios.put(url, data).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const catalog = {
    getProducts: () => request.get("product"),
    setProduct: (product: any, id: number) => request.post({}, `product/${id}`) ,
    getProduct: (id: number) => request.get(`product/${id}`)
};

const testErrors = {
    get400Error: () => request.get("buggy/bad-request"),
    get404Error: () => request.get("buggy/not-found"),
    get401Error: () => request.get("buggy/unauthorized"),
    get500Error: () => request.get("buggy/server-error"),
    get400ValidationError: () => request.get("buggy/validation-error"),
}

const Basket = {
    getBasketItems: () => request.get("Basket"),
    addBasketItem: (productId: number, quantity = 1) => request.post({}, `Basket?productId=${productId}&quantity=${quantity}`),
    removeItem: (productId: number, quantity = 1) => request.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    catalog,
    testErrors,
    Basket
};

export default agent;

