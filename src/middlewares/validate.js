export const validate = (schema, object) => {
    const {value , error} = schema.validate(object); 
    if (error) {
        return {status: false, message: error?.message};
    }
    return {status: true, value: value};
};