import {deleteCategoriesConstant} from '../Constants/deleteCattegoriesConstat';

export const deleteCategoriesAction = (idsArray)=> {
    return {
        type: deleteCategoriesConstant.DELETE_CATEGOROES_CONSTANT,
        idsArray: idsArray
    }
}