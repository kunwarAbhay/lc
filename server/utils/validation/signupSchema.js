const yup = require("yup");

const signupSchema = yup.object({
    email: yup
        .string()
        .email("Invalid Email Address")
        .required("Email is required"),
    password: yup
        .string("Invalid password")
        .min(8, "Password should be at least 8 characters")
        .max(128, "Password should be at most 128 characters")
        .required("Password not provided"),
    username: yup
        .string("Invalid username")
        .min(3, "Invalid username")
        .max(30, "Invalid username")
        .required("Username is required"),
});

module.exports = signupSchema;
