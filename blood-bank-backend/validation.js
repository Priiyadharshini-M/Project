const validateName = (name,key) => {
    if(key == 1)
    {
        return name.match(/^[a-zA-Z ]+$/) ? true : `Hospital name should contain only alphabets and space`
    }
    else if(key == 2)
    {
        return name.match(/^[a-zA-Z ]+$/) ? true : `Camp name should contain only alphabets and space`
    }
}
const validateDate = (date,key) => {
    if(key == 1)
    {
        return Date(Date.now()) >= Date(date) ? true : `The date has been expired from today`
    }
    else if(key == 2)
    {
        return Date(Date.now()) >= Date(date) ? true : `The date has been expired from today`
    }
}
module.exports = {
    validateName,
    validateDate
}