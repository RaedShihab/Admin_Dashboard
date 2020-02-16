import {deleteCategoriesConstant} from '../Constants/deleteCattegoriesConstat';

export const deleteCategoriesAction = (idsArray)=> {
    console.log('action', idsArray)
    return {
        type: deleteCategoriesConstant.DELETE_CATEGOROES_CONSTANT,
        idsArray: idsArray
    }
}