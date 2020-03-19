import {multiDeleteConstant} from '../Constants/multiDelete';

export const multiDelete = (idsArray, checked)=> {
    return {
        type: multiDeleteConstant.DELETE_CATEGOROES_CONSTANT,
        idsArray: idsArray,
        checked: checked
    }
}