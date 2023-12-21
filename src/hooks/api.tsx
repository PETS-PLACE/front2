import axios from "axios";

export const endPoint = axios.create({
  baseURL: "http://localhost:8080"
});

/**
 * Realiza requisições para o backend
 * @param method método da requisição
 * @param url URL de destino
 * @param data dados que devem ser enviados
 */
export async function useApi<T = unknown>(method:'get'|'post'|'put'|'delete'|'options', url:string, data?:any, headers?:any) {
  try {
    const response = await endPoint.request({
      method,
      //possibilita o uso de query string no método get, como por exemplo .../?name='Maria'
      url: url + ((method == 'get')?('?'+data):('')),
      data,
      headers,
    })

    if(response.status === 200){
      return response.data
    }

    else{
      throw new Error(response.statusText)
    }
    
  } catch (error:any) {
    const messageErros = error?.response?.data?.message

    if(Array.isArray(messageErros)){
      alert(messageErros[0])
    }

    else{
      alert(messageErros)
    }
  }
}