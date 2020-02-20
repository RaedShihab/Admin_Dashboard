import {deleteCategoriesConstant} from '../Constants/deleteCattegoriesConstat';

const initState = []
export const deleteCategories = (state = initState, action)=> {
    if(action.type === deleteCategoriesConstant.DELETE_CATEGOROES_CONSTANT) {
        return action.idsArray
    }
    else {
        return state
    }
}