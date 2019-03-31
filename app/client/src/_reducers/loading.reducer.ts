import { loadingConstants } from '../_constants/loading.constants';

export function loading(state: any = {}, action: any) {
    switch (action.type) {
        case loadingConstants.BUTTON:
            return {
                type: 'button',
                state: action.state
            };
        case loadingConstants.PAGE:
            return {
                type: 'page',
                state: action.state
            };
        case loadingConstants.CLEAR:
            return {};
        default:
            return state
    }
}