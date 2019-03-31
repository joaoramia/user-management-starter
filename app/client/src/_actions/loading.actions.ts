import { loadingConstants } from '../_constants/loading.constants';

export const loadingActions = {
    button,
    page,
    clear
};

function button(state = false) {
    return { type: loadingConstants.BUTTON, state };
}

function page(state = false) {
    return { type: loadingConstants.PAGE, state };
}

function clear() {
    return { type: loadingConstants.CLEAR };
}