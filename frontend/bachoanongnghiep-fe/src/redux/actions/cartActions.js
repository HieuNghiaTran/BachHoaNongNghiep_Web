


export const addCart = (data) => {

    return {
        type: 'ADD_CART',
        data: data
    }
    
}

export const updateCart = (data) => {
    return {
        type: 'UPDATE_CART',
        data:data
    }
}

export const deleteCart = (data) => {
    return {
        type: 'DELETE_CART',
        data:data
    }
}
export const downItem = (data) => {
    return {
        type: 'DOWN_ITEM',
        data:data
    }
}