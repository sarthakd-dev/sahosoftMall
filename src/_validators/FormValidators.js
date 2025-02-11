import validator from 'validator';

class FormValidator {
    debugger
    constructor(validations) {
        this.validations = validations;
    }

    validate(state, col) {
        debugger
        let validation = this.valid();
        this.validations.forEach(rule => {

            if (!validation[rule.field].isInvalid) {
                let field_value = null;
                if (col === "" ) {
                    field_value = state[rule.field].toString();
                } else {
                    field_value = state[col][rule.field].toString();
                }

                const args = rule.args || [];
                const validation_method = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

                if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                    validation[rule.field] = { isInvalid: true, message: rule.message };
                    validation.isValid = false;
                }
            }
        });
        return validation;
    }

    valid() {
        this.debugger
        const validation = {};

        this.validations.forEach(rule => (
            validation[rule.field] = { isInvalid: false, message: '' }
        ));

        return { isValid: true, ...validation }
    }
}

export default FormValidator;