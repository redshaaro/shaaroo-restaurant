export const fetchdata = async (url: string, method: string, data: Record<string, any> = {}, headers: Record<string, any> = {}) => {
    const requestOptions: RequestInit = {
        method: method,
        body: method !== "GET" && method !== "HEAD" ? JSON.stringify(data) : null,
        headers: new Headers({
            'Content-Type': 'application/json',
            ...headers,   
          })

    }
    try {
        const res = await fetch(url, requestOptions);
        if (!res.ok) throw new Error("Request error")

        return await res.json()




    } catch (err) {
        console.log(err)
        throw err


    }




}