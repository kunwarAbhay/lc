const yup = require("yup")

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Invalid Email Address")
        .required("Email is required"),
    password: yup
        .string("Invalid password")
        .min(8, "Password should be at least 8 characters")
        .max(128, "Password should be at most 128 characters")
        .required("Password not provided"),
});

module.exports = loginSchema;
