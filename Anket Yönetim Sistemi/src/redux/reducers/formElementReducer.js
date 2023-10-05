import { ADD_FORM_ELEMENT, EDIT_FORM_ELEMENT, REMOVE_FORM_ELEMENT } from "../constants"

const formElementReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_FORM_ELEMENT:
            return [...state, action.payload]
        case REMOVE_FORM_ELEMENT:
            return state.filter(element => (element.id !== action.payload))
        case EDIT_FORM_ELEMENT:
            const newState = []
            state.forEach(element => {
                if (element.id === action.payload.id) {
                    element = action.payload
                }   
                newState.push(element)
            })
            return newState
        default:
            return state
    }
}

export default formElementReducer