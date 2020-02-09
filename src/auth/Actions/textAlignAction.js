import {textAlignConstant} from '../Constants/textAlignConstant';

export const TextAlignAction = (align)=> {
    console.log('action')
    return {
        type: textAlignConstant.TEXT_ALIGN_CNSTANT,
        align: align,
    }
}