

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}
export const addElipsis = (str, limit) => {
    return str.length ? limit && str.length > limit ? str.substring(0, limit) + '...' : str : str;
}
export const getType = (value, body) => {
    if(value.params){
        return { params: body }
    }else if (value.query){
        if(typeof body === 'object'){
            return { query: body.id || body._id }
        } else {
            return { query: body }
        }
    }
    return {};
}