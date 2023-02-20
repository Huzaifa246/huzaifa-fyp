export const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const reducer = (state, action) => {
    // if(action.type === "USER"){
    //     return action.payload;
    // }

    // return state;
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
}