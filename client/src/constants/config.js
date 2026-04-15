
export const API_NOTIFICATION={
    loading: {
        title: 'Loading',
        message: 'Please wait while we load the data.'
    },
    success: {
        title: 'Success',
        message: 'Data loaded successfully.'
    },
    responsefaliure:{
        title: 'Error',
        message: 'An error occurred while fetching the server data.'
    },
    requestFaliure:{
        title: 'Error',
        message: 'An error occurred while sending the request to the server.'
    },
    networkError:{
        title: 'Error',
        message: 'A network error occurred. Please check your internet connection.'
    }
}
//api service call
//Sample Request
//NEED SERVICE CALL: { url: '/signup: ', method: 'POST' } 
export const SERVICE_URLS ={
    userSignup: {url:'/signup', method: 'POST'},
    userLogin: {url:'/login', method: 'POST'},
    uploadFile: {url:'/file/upload', method: 'POST'},
    createPost: {url: '/create', method: 'POST'},
    getAllposts: {url: '/posts', method: 'GET', params: true},
    getPostById: {url: '/post', method: 'GET', query: true},
    updatePost: {url: '/update', method: 'PUT', query: true},
    deletePost: {url: '/delete', method: 'DELETE', query: true},
    newComment: {url: '/comment/new', method: 'POST'},
    getAllcomments: {url: '/comments', method: 'GET', query: true},
    deleteComment: {url: '/comment/delete', method: 'DELETE', query: true}
}
