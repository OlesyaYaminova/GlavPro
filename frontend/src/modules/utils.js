export const getFetchData = (path, method, body) => {
    const myHeaders = new Headers();

    const requestOptions = {
        method: method || "GET",
        headers: myHeaders,
        redirect: "follow",
        ...(body ? {
            body: new URLSearchParams(body)
        } : {}),
    };

    return fetch(`http://backend.test:21080/${path}`, requestOptions)
        .then((response) =>{
            if(response.ok) {
                return response.json()
            }
        })
        .catch((error) => console.error(error));
}