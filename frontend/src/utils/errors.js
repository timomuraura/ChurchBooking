const createError = (err, GET_ERRORS) => {
    const message = "Oops something went wrong. Please try again.";

    if (err.response) {
        if (err.response.data) {
            if (err.response.data.error) {
                return {
                    type: GET_ERRORS,
                    payload: err.response.data.error
                }
            } else {
                return {
                    type: GET_ERRORS,
                    payload: message
                }
            }
        } else {
            return {
                type: GET_ERRORS,
                payload: message
            }
        }
    } else {
        return {
            type: GET_ERRORS,
            payload: message
        }
    }
}

export default createError;