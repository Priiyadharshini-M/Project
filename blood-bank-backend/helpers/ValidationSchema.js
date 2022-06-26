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
    enddate : joi.date()
                 .greater(new Date(Date.now()))
                 .required()


})

const userValidation = joi.object({
    username : joi.string()
                  .min(3)
                  .max(25)
                  .pattern(new RegExp('^[a-zA-Z ]+$'))
                  .required(),
    userContact : joi.string()
                     .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))  
                     .required(),
    userPassword : joi.string()
                      .min(6)
                      .max(15)
                      .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                      .required(),
    confirmUserPassword : joi.ref('userPassword'),
    userEmail : joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required()
    
})

const donarValidation = joi.object({
    username : joi.string()
                  .min(3)
                  .max(25)
                  .pattern(new RegExp('^[a-zA-Z ]+$'))
                  .required(),
    userContact : joi.string()
                     .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))  
                     .required(),
    password : joi.string()
                  .min(6)
                  .max(15)
                  .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
                  .required(),
    confirmUserPassword : joi.ref('password'),
    userEmail : joi.string()
                   .email()
                   .lowercase()
                   .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
                   .required(),
    city : joi.string()
              .lowercase()
              .pattern(new RegExp('^[a-zA-Z ]+$'))
              .required(),
    bloodGroup : joi.string()
                    .lowercase()
                    .pattern(new RegExp('(A|B|AB|O)[+-]'))
                    .required(),
    gender : joi.string()
                .pattern(new RegExp('male|female|other'))
                .required(),
    email : joi.string()
               .email()
               .lowercase()
               .pattern(new RegExp('^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$'))
               .required(),
    allergies : joi.string()
                   .pattern(new RegExp('^[a-zA-Z ]+$'))
    
})

module.exports = { bloodCampValidation, userValidation }