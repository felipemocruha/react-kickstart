const initialState = {
    snackbarIsOpen: false,
    snackbarMessage: ""
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_SNACKBAR":
            return { ...state, snackbarIsOpen: true }
        case "CLOSE_SNACKBAR":
            return { ...state, snackbarIsOpen: false, snackbarMessage: "" }
        case "SET_SNACKBAR_MESSAGE":
            return { ...state, snackbarMessage: action.payload }
        default:
            return state
    }
}

export default appReducer