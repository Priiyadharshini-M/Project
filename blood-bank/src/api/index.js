export const url = "http://localhost:3070"

export const setHeaders = () => {
    const header = {
        headers:{
            token : localStorage.getItem("token")
            // console.log("token from headers: "+)
        }
    }

    return header
}