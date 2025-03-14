const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const create = Joi.object({
  name: Joi.string().required().error(commonService.getValidationMessage),
  img_url: Joi.string().required().error(commonService.getValidationMessage),
  description: Joi.string().required().error(commonService.getValidationMessage),
  experience: Joi.string().required().error(commonService.getValidationMessage),
  location: Joi.string().required().error(commonService.getValidationMessage),
  responsibilities: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
  skills: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
  qualifications: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const update = Joi.object({
    name: Joi.string().required().error(commonService.getValidationMessage),
    description: Joi.string().required().error(commonService.getValidationMessage),
    experience: Joi.string().required().error(commonService.getValidationMessage),
    location: Joi.string().required().error(commonService.getValidationMessage),
    responsibilities: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
    skills: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
    qualifications: Joi.array().items(Joi.string()).required().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

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
  validateCreateCarrers: async (dataToValidate) => validateFunc(create, dataToValidate),
//   validateCarrersUpdate: async (dataToValidate) => validateFunc(update, dataToValidate),
  validateUpdateCarrers: async (dataToValidate) => validateFunc(update, dataToValidate)
};