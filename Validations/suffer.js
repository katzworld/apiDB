const yup = require('yup')
const sufferSchema = yup.object(
    {
        suffer: yup.string().required(),
        lifetime_plotas: yup.string().required(),
        plota: yup.string().required(),
        check: yup.string().required(),
    })

module.exports = sufferSchema 