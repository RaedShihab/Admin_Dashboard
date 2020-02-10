import {textAlignConstant} from '../Constants/textAlignConstant';

const initState = [
    'left'
]
export const reducer = (state = initState, action)=> {
    if(action.type === textAlignConstant.TEXT_ALIGN_CNSTANT && action.align === 'left') {
        return ['right']
    }
    if(action.type === textAlignConstant.TEXT_ALIGN_CNSTANT && action.align === 'right') {
        return ['left']
    }
    else {
        return state
    }
}