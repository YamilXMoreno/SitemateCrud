const { body } = require('express-validator');

// Validation rules for adding or updating an issue
const issuesValidationRules = () => {
    return [
        body('issueId')
            .isInt({ gt: 0 })
            .withMessage('Issue ID must be a positive integer')
            .notEmpty()
            .withMessage('Issue ID is required'),
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 3 })
            .withMessage('Title must be at least 3 characters long'),
        body('description')
            .notEmpty()
            .withMessage('Description is required')
            .isLength({ min: 10 })
            .withMessage('Description must be at least 10 characters long')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    issuesValidationRules,
    validate
};
