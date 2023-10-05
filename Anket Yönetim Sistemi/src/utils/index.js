import { v4 as uuidv4 } from 'uuid';

export const generateFormType = (type) => {
    const defaultAttr = {isRequired: false}
    switch(type) {
        case "text":
        case "dropdown":
        case "rating":
        case "boolean":
            return {
                id: uuidv4(),
                type,
                ...defaultAttr
            }
        default:
            return {}
    }
}