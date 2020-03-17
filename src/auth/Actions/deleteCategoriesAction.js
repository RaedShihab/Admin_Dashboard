import {deleteCategoriesConstant} from '../Constants/deleteCattegoriesConstat';

export const deletecategories = (idsArray, checked)=> {
    return {
        type: deleteCategoriesConstant.DELETE_CATEGOROES_CONSTANT,
        idsArray: idsArray,
        checked: checked
    }
}