const reducer = (camps = [], action) => {
    switch (action.type) {
        case "ADD_CAMPS":
            return [action.camps.data, ...camps]
        case "VIEW_CAMPS":
            return action.camps
        case "UPDATE_CAMPS":
            return camps.map((camp) =>
                camp._id === action.camps.data._id ? action.camps.data : camps)
        case "DELETE_CAMPS":
            return camps.filter((camp) =>
                camp._id !== action.id)
        default:
            return camps
    }
}

export default reducer