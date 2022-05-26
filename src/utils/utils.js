// Custom validation wrapper for yup validation
// can be used to get input validation error
export function yupInputValidate(schema) {
  return (data) =>
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        return { isValid: true, errors: {} };
      })
      .catch((error) => {
        let errors = {};
        error.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        return { isValid: false, errors };
      });
}
