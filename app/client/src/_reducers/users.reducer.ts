import { userConstants } from '../_constants/user.constants';

export function users(state: any = {}, action: any) {
    switch (action.type) {
    // Get All
    case userConstants.GETALL_REQUEST:
        return {
            ...state
        };
    case userConstants.GETALL_SUCCESS:
        return {
            ...state,
            items: action.users
        };
    case userConstants.GETALL_FAILURE:
        return { 
            ...state,
            error: action.error
        };

    // Get By ID
    case userConstants.GETBYID_REQUEST:
        return {
            ...state
        };
    case userConstants.GETBYID_SUCCESS:
        return {
            ...state,
            user: action.user
        };
    case userConstants.GETBYID_FAILURE:
        return { 
            ...state,
            error: action.error
        };

    // Update
    case userConstants.UPDATE_REQUEST:
        return {
            ...state
        };
    case userConstants.UPDATE_SUCCESS:
        return {
            ...state,
            user: action.user
        };
    case userConstants.UPDATE_FAILURE:
        return { 
            ...state,
            error: action.error
        };
    
    // Delete
    case userConstants.DELETE_REQUEST:
        return {
            ...state
        };
    case userConstants.DELETE_SUCCESS:
        const { items } = state;
        return {
            state,
            items: (items || []).filter((item: any) => item.id !== action.id)
        };
    case userConstants.DELETE_FAILURE:
        return { 
            ...state,
            error: action.error
        };

    // Delete
    case userConstants.CLEAN:
        return {
            ...state,
            user: null,
            items: null
        };
    default:
        return state
    }
}