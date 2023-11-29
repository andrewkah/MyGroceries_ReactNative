import config from "../config"

export const userLogin = async (data) => {
    try {
        const result = await config("/auth/signin", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data
    }
}