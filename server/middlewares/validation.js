const validateBody = (schema) => async (req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(body);
        next();
    } catch (e) {
        res.status(400).json({
            status: false,
            errors: e.errors,
            msg: "validation error",
        });
    }
};

module.exports = validateBody;
