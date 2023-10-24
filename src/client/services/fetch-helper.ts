import Swal from "sweetalert2";

type VALID_METHODS = "GET" | "POST" | "PUT" | "DELETE";

export const GET = <T =any>(url: string) => fetcher<T>(url);
export const POST = <T =any>(url: string, data: any) => fetcher<T>(url, 'POST', data);
export const PUT = <T =any>(url: string, data: any) => fetcher<T>(url, 'PUT', data);
export const DELETE = <T =any>(url: string) => fetcher<T>(url, 'DELETE');



export async function fetcher<T= any>(url: string, method: VALID_METHODS = "GET", data?: any) {
    return new Promise<T>(async (resolve, reject) => {

        const fetchOptions: RequestInit = {
            method
        }
        
        if (method === 'POST' || method === "PUT") {
            fetchOptions['headers'] = {
                'Content-Type': "application/json"
            }
            
            fetchOptions['body'] = JSON.stringify(data);
        }
        
        try {
            const res = await fetch(url, fetchOptions);
            const data = await res.json();
            
            if (res.ok) {
                resolve(data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Uh oh!",
                text: error.message
            })
        }
    });
}