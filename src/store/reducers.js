import textAlginType from './types';

const initState = [
    'left'
]
export const reducer = (state = initState, action)=> {
    if(action.type === textAlginType) {
        return ['right']
    }

    else {
        return state
    }
}