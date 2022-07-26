let Donor = require('../models/Donor')
const { donorValidation } = require('../validation/ValidationSchema')
const { sendToken } = require('../util/JwtToken')
const bcryptjs = require('bcryptjs');

//view all donors
const viewDonors = async (req, res) => {
    let donor
    try {
        donor = await Donor.find()
        if(donor.length <= 0){
            throw "No donors found"
        }
        return res.status(200).json({ donor })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//register donor
const addDonor = async (req, res) => {
    let donor
    try {
        let options = { abortEarly: false }
        const result = await donorValidation.validateAsync(req.body, options)
        const { userName, address, city, contact, bloodGroup, gender, age, password, email, lastDonateDate, allergies, disease } = result
        donor = await Donor.findOne({ email: result.email })
        if (donor)
            throw "This mail id has already been registered for Donor"
        const hashedPassword = await bcryptjs.hash(password, 10)
        donor = new Donor({
            userName,
            address,
            city,
            contact,
            bloodGroup,
            gender,
            age,
            password: hashedPassword,
            email,
            lastDonateDate,
            allergies,
            disease
        })
        await donor.save()
        return res.status(200).json({ donor })
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            return res.status(400).json(errors)
        }
        return res.status(400).json({ errorMessage: err })
    }
}

//login donor
const loginDonor = async (req, res, next) => {
    let donor
    try {
        donor = await Donor.findOne({ email: req.body.email })
        if (donor == null)
            throw "No account exists with this email id"
        if (!bcryptjs.compareSync(req.body.password, donor.password))
            throw "Incorrect Password"
        const result = sendToken(donor)
        return res.status(200).cookie("donorToken", result.token, result).json({accessToken: result.token})
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//view particular donor
const viewDonor = async (req, res) => {
    let donor
    try {
        donor = await Donor.findById(req.params.id)
        return res.status(200).json({ donor })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//delete donor profile
const deleteDonor = async (req, res) => {
    let donor
    try {
        donor = await Donor.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Deleted", donor })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//update donor
const updateDonor = async (req, res) => {

    let donor
    try {
        if (req.params.id.length == 24)
            donor = await Donor.findById(req.params.id)
        else throw `Invalid Object Id`
        if (donor != null) {
            const updateResult = await donorValidation.validateAsync(req.body, { abortEarly: false })
            const { userName, address, city, password, bloodGroup, gender, age, contact, email, lastDonateDate, allergies, disease } = updateResult
            const hashedPassword = await bcryptjs.hash(password, 10)
            donor = await Donor.findByIdAndUpdate(req.params.id, {
                password: hashedPassword,
                userName,
                address,
                city,
                bloodGroup,
                gender,
                age,
                contact,
                email,
                lastDonateDate,
                allergies,
                disease
            })
            await donor.save()
            return res.status(200).json({ message: "Successfully updated profile", donor })
        }
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            if (err) return res.status(400).json(errors)
        }
        return res.status(400).json({ errorMessage: err })
    }
}

//filter donors using blood group and city
const viewSpecificDonors = async (req, res) => {
    let donor
    try {
        donor = await Donor.find({ bloodGroup: req.body.bloodGroup, city: req.body.city })
        if(donor.length <= 0){
        throw "No donors found" }
        return res.status(200).json({ donor })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//to get count of all blood groups
const donorCount = async (req, res) => {
    let donor
    try {
        donor = await Donor.aggregate([{ "$group": { _id: "$bloodGroup", count: { $sum: 1 } } }])
        return res.status(200).json({ donor })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}
module.exports = { addDonor, viewDonor, viewDonors, deleteDonor, updateDonor, viewSpecificDonors, loginDonor, donorCount }