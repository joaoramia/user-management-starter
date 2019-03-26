import { alertConstants } from '../_constants/alert.constants';

export function alert(state: any = {}, action: any) {
    switch (action.type) {
    case alertConstants.SUCCESS:
        return {
        type: 'success',
        message: action.message
        };
    case alertConstants.ERROR:
        return {
        type: 'error',
        message: action.message
        };
    case alertConstants.CLEAR:
        return {};
    default:
        return state
    }
}