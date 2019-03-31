import { alertConstants } from '../_constants/alert.constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message: string, hideAlert = false) {
    return { type: alertConstants.SUCCESS, message, hideAlert };
}

function error(message: string, hideAlert = false) {
    return { type: alertConstants.ERROR, message, hideAlert };
}

function clear() {
    return { type: alertConstants.CLEAR };
}