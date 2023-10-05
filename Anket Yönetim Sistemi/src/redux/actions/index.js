import { ADD_FORM_ELEMENT, EDIT_FORM_ELEMENT, REMOVE_FORM_ELEMENT } from "../constants"

export const addFormElement = (formElement) => {
    return {
        type: ADD_FORM_ELEMENT,
        payload: formElement
    }
}

export const removeFormElement = (id) => {
    return {
        type: REMOVE_FORM_ELEMENT,
        payload: id
    }
}

export const editFormElement = (element) => {
    return {
        type: EDIT_FORM_ELEMENT,
        payload: element
    }
}