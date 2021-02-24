export default function userInfo (state = { host: '' }, action){
    switch (action.type) {
        case "GET_HOST":
            return ({host: action.data })
        default:
            return state
    } 
}