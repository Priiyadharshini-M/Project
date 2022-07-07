const joi = require('@hapi/joi')

const bloodCampValidation = joi.object({
    hospitalName : joi.string()
                       .min(3)
                       .max(25)
                       .pattern(new RegExp('^[a-zA-Z ]+$'))
                       .required(),
    campName : joi.string()
                   .min(3)
                   .max(25)
                   .pattern(new RegExp('^[a-zA-Z ]+$'))
                   .required(),
    address : joi.string()
                 .required(),
    startDate : joi.date()
                   .required(),  
    endDate : joi.date()
                 .greater(new Date(Date.now()))
                 .required()


})

const userValidation = joi.object({
    userName : joi.string()
                  .min(3)
                  .max(25)
                  .pattern(new RegExp('^[a-zA-Z ]+$'))
                  .required(),
    userContact : joi.string()
                     .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))  
                     .required(),
    userPassword : joi.string()
                      .min(6)
                      .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                      .required(),
    confirmUserPassword : joi.ref('userPassword'),
    userEmail : joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required(),
    userAddress : joi.string()
    
})

const donorValidation = joi.object({
    userName : joi.string()
                  .min(3)
                  .max(25)
                  .pattern(new RegExp('^[a-zA-Z ]+$'))
                  .required(),
    contact : joi.string()
                 .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))  
                 .required(),
    password : joi.string()
                  .min(6)
                  .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                  .required(),
    confirmPassword : joi.ref('password'),
    email : joi.string()
               .email()
               .lowercase()
               .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
               .required(),
    city : joi.string()
              .lowercase()
              .pattern(new RegExp('^[a-zA-Z ]+$'))
              .required(),
    bloodGroup : joi.string()
                    .pattern(new RegExp('(A|B|AB|O)[+-]'))
                    .required(),
    gender : joi.string()
                .pattern(new RegExp('male|female|other'))
                .required(),
    allergies : joi.string()
                   .required(),
    disease : joi.string()
                 .required(),
    age : joi.number()
             .greater(18)
             .required(),
    address : joi.string(),
    lastDonateDate : joi.string()
                        .required()

    
})

const adminValidation = joi.object({
    adminName : joi.string()
                  .min(3)
                  .max(30)
                  .pattern(new RegExp('^[a-zA-Z ]+$')),
    adminEmail : joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required(),

    adminPassword : joi.string()
                      .min(8)
                      .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                      .required()     
})

module.exports = { bloodCampValidation, userValidation, donorValidation, adminValidation }