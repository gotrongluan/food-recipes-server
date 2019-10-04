const wrapResponse = data => {
    return data !== undefined ? {
        errorCode: 0,
        data: data,
    } : {
        errorCode: 0
    };
};

module.exports = wrapResponse;