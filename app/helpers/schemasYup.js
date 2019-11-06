const yup = require('yup');
const { regexAlphanumeric, regexCurrency } = require('../helpers/regex');

exports.schemaSignUpYup = yup.object().shape({
  name: yup.string().required('name is required'),
  lastName: yup.string().required('lastName is required'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'Must be at least 8 chars long')
    .matches(regexAlphanumeric, 'email is not valid or does not belong to the wolox domain'),
  userName: yup.string().required('userName is required'),
  preferredCurrency: yup
    .string()
    .required('preferred currency is required')
    .matches(regexCurrency, 'preferred currency not valid')
});

exports.schemaSignInYup = yup.object().shape({
  userName: yup.string().required('userName is required'),
  password: yup.string().required('password is required')
});

exports.validateTokenMiddleware = yup.object().shape({
  Authorization: yup.string().required('Authorization is required')
});

exports.schemaAddCryptoCurrencyYup = yup.object().shape({
  name: yup.string().required('name is required'),
  cryptoId: yup.string().required('crypto currency id is required')
});
