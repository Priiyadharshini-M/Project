let Donor = require('../models/Donor')

const viewDonors = async(req,res) => {
    let donor
    try{
        donor = await Donor.find()
        return res.status(200).json({ donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No donors found" })
}

const addDonor = async(req,res)=>
{

    let donor
    try{
        const result = await donorValidation.validateAsync(req.body,{abortEarly : false})
        donor = await Donor.findOne({email : result.email})
        if(donor) 
           throw "This mail id has already been registered for donor"
        donor = new Donor(result)
        await user.save()
        return res.status(201).json({message : "Succesfully registered",donor})
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            errors.push(error)
        })
        return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 
}
const loginDonor = async(req,res,next) => {
    let donor
    try{
        // const loginResult = await loginValidationSchema.validateAsync(req.body,{abortEarly : false})
        donor = await Donor.findOne({email : req.body.email})
        if(donor == null) 
           throw "No account exists with this email id"
        if(! (donor.password === req.body.password))
            throw "Incorrect Password"
        return res.status(201).json({message : "Succesfully logged in",donor})
    }
    catch(err){
        return res.status(404).json({errorMessage : err})
    }
}
const viewDonor = async(req,res) => {
    let donor
    try{
        donor = await Donor.findById(req.params.id)
        return res.status(200).json({ donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No Donor found" })
}

const deleteDonor = async(req,res) => {
    let donor
    try{
        donor = await Donor.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message:"Deleted",donor })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(400).json({ message : "Can't delete donor",donor })
}

const updateDonor = async(req,res)=>
{

    let donor
    console.log("req body : ",req.body)
    try{
        const result = await donorValidation.validateAsync(req.body,{abortEarly : false})
        console.log("result : ",result)
        donor = new Donor(result)
        await donor.save()
        return res.status(201).json({message : "Succesfully updated profile",donor})
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            console.log(error)
            errors.push(error)
        })
        if(err) return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 

    // let donor
    // const {userName,address,city,password,bloodGroup,gender,age,email,lastDonateDate,allergies,disease}=req.body
    // const contact=Number(req.body.contact)
    // try{
    // donor=await Donor.findById(req.params.id,{
    //     userName,
    //     address,
    //     city,
    //     password,
    //     confirmPassword,
    //     bloodGroup,
    //     gender,
    //     age,
    //     contact,
    //     email,
    //     lastDonateDate,
    //     allergies,
    //     disease

    // })

    // donor = await donor.save()
    // return res.status(200).json({ message : 'Donor details updated',donor })}

    // catch(err) {
    //     return res.status(404).json({ message : err.message })
    // }
    // return res.status(400).json({ message : "Can't update Donor" })
}

const viewSpecificDonors = async(req,res) => {
    let donor
    try{
        donor = await Donor.find({ bloodGroup: req.params.bloodGroup, city:req.params.city })
        return res.status(200).json({ donor:donor.userName })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No donors found" })
}
module.exports = { addDonor, viewDonor, viewDonors, deleteDonor, updateDonor, viewSpecificDonors, loginDonor }