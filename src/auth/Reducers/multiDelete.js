import {multiDeleteConstant} from '../Constants/multiDelete';

const initState = []
export const multiDelete = (state = initState, action)=> {
    if(action.type === multiDeleteConstant.DELETE_CATEGOROES_CONSTANT) {
        return [action.idsArray, action.idsArray.length]
    }
    else {
        return state
    }
}