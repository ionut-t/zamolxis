import { AbstractControl } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneInputValidator = (group: AbstractControl) => {
    const code = group.get('code');
    const phone = group.get('phone');

    if (!phone?.value) return null;

    const errors = { zxPhoneNumber: { valid: false } };

    const phoneNumber = parsePhoneNumberFromString(phone!.value, code!.value);

    if (phoneNumber) {
        if (phoneNumber.isValid()) return null;

        phone.setErrors(errors);

        return errors;
    }

    group.setErrors(errors);

    return errors;
};
