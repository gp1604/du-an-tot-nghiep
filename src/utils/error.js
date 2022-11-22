import { toast } from "react-toastify"

export const showError = (error) => {
    console.log(error.response.data)
    if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
            autoClose: 2000
        })
    }
    else if (error.response.data.error) {
        toast.error(`${error.response.data.error}`, {
            autoClose: 2000
        })
    }
    else if (error.response.data.error && error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
            autoClose: 2000
        })
    }
    else {
        toast.error('Error', {
            autoClose: 2000
        })
    }
}

export const showError2 = (error) => {
    console.log(error.response.data)
    if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
            autoClose: 2000
        })
    }
    else if (error.response.data.error) {
        toast.error(`${error.response.data.error}`, {
            autoClose: 2000
        })
    }
    else if (error.response.data.error && error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
            autoClose: 2000
        })
    }
    else {
        toast.error('Lỗi ' + error.response.data, {
            autoClose: 2000
        })
    }
} 