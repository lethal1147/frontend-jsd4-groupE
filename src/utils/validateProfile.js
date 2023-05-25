export const validateProfile = (values) => {
    const errors = {};

    const regexEmail =
        /^(?=.*[a-z])[a-z0-9._%+-]+@(?:gmail|hotmail|yahoo)\.[a-z]{2,}$/i;
    const currentDate = new Date();
    const birthDate = new Date(values.birthDate);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    const requiredFields = ["firstName", "lastName", "email", "birthDate", "gender", "height", "weight"];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`;
        }
    });

    if (values.email && !regexEmail.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }

    if (values.birthDate) {
        if (birthDate > currentDate) {
            errors.birthDate = "Birthdate cannot refer to a future date";
        } else if (age < 7) {
            errors.birthDate = "Age must be more than 7 years";
        }
    }

    if (values.height && values.height <= 0) {
        errors.height = "Height must be a positive number";
    }

    if (values.weight && values.weight <= 0) {
        errors.weight = "Weight must be a positive number";
    }

    return errors;
};