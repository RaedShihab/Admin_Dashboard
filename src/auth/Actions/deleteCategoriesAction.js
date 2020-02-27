import {deleteCategoriesConstant} from '../Constants/deleteCattegoriesConstat';

export const deleteCategoriesAction = (idsArray, checked)=> {
    return {
        type: deleteCategoriesConstant.DELETE_CATEGOROES_CONSTANT,
        idsArray: idsArray,
        checked: checked
    }
}