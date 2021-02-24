export default function dateInfo (state = {}, action){
    switch (action.type) {
        case "UPDATE_TABLE":
            return ({...action.data})
        default:
            return state
    } 
}