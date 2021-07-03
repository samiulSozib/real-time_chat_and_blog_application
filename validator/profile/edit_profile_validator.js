const {body}=require('express-validator')

module.exports=[
    body('name')
    .not().isEmpty()
    .withMessage('Name can not be empty')
]