export const initialState = {
    user: null,
    meetid: null
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case 'SET_MEETID':
            return {
                ...state,
                meetid: action.payload
            };


        default:
            return state;
    }
};

export default reducer;