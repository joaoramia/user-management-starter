import { userConstants } from '../_constants/user.constants';

export function users(state: any = {}, action: any) {
    switch (action.type) {
    // Get All
    case userConstants.GETALL_REQUEST:
        return {
            loading: true,
            ...state
        };
    case userConstants.GETALL_SUCCESS:
        return {
            items: action.users,
            ...state
        };
    case userConstants.GETALL_FAILURE:
        return { 
            error: action.error,
            ...state
        };
    
    // Delete
    case userConstants.DELETE_REQUEST:
        return {
            loading: true,
            ...state
        };
    case userConstants.DELETE_SUCCESS:
        const { items } = state;
        return {
            loading: false,
            items: (items || []).filter((item: any) => item.id !== action.id)
        };
    case userConstants.DELETE_FAILURE:
        return { 
            error: action.error,
            ...state
        };

    default:
        return state
    }
}