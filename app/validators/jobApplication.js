const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const create = Joi.object({
    fullName: Joi.string().required().error(commonService.getValidationMessage),
    email: Joi.string().required().error(commonService.getValidationMessage),
    mobile: Joi.string().required().error(commonService.getValidationMessage),
    yearOfGraduation: Joi.string().required().error(commonService.getValidationMessage),
    gender: Joi.string().required().error(commonService.getValidationMessage),
    experience: Joi.string().required().error(commonService.getValidationMessage),
    expectedCTC: Joi.string().optional().allow('',null).error(commonService.getValidationMessage),
    noticePeriod: Joi.string().required().error(commonService.getValidationMessage),
    skillSet: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
    vacany: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    currentLocation: Joi.string().required().error(commonService.getValidationMessage),
    resume: Joi.object({
      url: Joi.string().required().error(commonService.getValidationMessage),
      downloadUrl: Joi.string().required().error(commonService.getValidationMessage),
      mimeType: Joi.string().required().error(commonService.getValidationMessage),
    }),
    career: Joi.string().required().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

// const update = Joi.object({
//   name: Joi.string().optional().error(commonService.getValidationMessage),
//   description: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
// }).error(commonService.getValidationMessage);

async function validateFunc(schemaName, dataToValidate) {
  try {
    const { error, value } = schemaName.validate(dataToValidate);
    return {
      error: error ? commonService.convertJoiErrors(error.details) : '',
      validatedData: value,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

module.exports = {
  validateJobApplicationCreate: async (dataToValidate) => validateFunc(create, dataToValidate),
//   validateRoleUpdate: async (dataToValidate) => validateFunc(update, dataToValidate),
};
