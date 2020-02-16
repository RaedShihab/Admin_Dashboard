import {deleteCategoriesConstant} from '../Constants/deleteCattegoriesConstat';

const initState = [
    'deafult'
]
export const deleteCategories = (state = initState, action)=> {
    console.log('reducer', action.idsArray)
    if(action.type === deleteCategoriesConstant.DELETE_CATEGOROES_CONSTANT) {
        console.log('reduscerrr')
        return action.idsArray
    }
    else {
        return state
    }
}