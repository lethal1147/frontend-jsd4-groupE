export const validate = (values) => {
    const errors = {};

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const regexEmail = /^(?=.*[a-z])[a-z0-9._%+-]+@(?:gmail|hotmail|yahoo)\.[a-z]{2,}$/i;
    const currentDate = new Date();
    const birthDate = new Date(values.birthDate);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (!values.firstName) {
        errors.firstName = "First Name is required!";
    }

    if (!values.lastName) {
        errors.lastName = "Last name is required!";
    }

    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (!regexPassword.test(values.password)) {
        errors.password =
            "Password must contain at least one uppercase letter, one lowercase letter, and six numbers";
    }

    if (!values.confirmpassword) {
        errors.confirmpassword = "Confirm Password is required";
    } else if (values.password !== values.confirmpassword) {
        errors.confirmpassword = "Confirm password should be the same as the password";
    }

    if (!values.birthDate) {
        errors.birthDate = "Birthdate is required";
    } else if (birthDate > currentDate) {
        errors.birthDate = "Birthdate cannot refer to a future date";
    } else if (age < 7) {
        errors.birthDate = "Age must be more than 7 years";
    }

    if (!values.gender) {
        errors.gender = "Gender is required";
    }

    if (!values.height) {
        errors.height = "Height is required";
    } else if (values.height <= 0) {
        errors.height = "Height must be a positive number";
    }

    if (!values.weight) {
        errors.weight = "Weight is required";
    } else if (values.weight <= 0) {
        errors.weight = "Weight must be a positive number";
    }

    return errors;
};