import { formatNumber } from '@angular/common';
import { InjectionToken } from '@angular/core';

export type ZxControlErrorsDictionary = {
    [key: string]: (args: Record<string, unknown>) => string;
};

const formatNo = (value: number) => formatNumber(value, 'En-gb', '.0-2');

export const ZX_CONTROL_ERRORS_DICTIONARY: ZxControlErrorsDictionary = {
    required: () => 'This field is required',
    minlength: ({ requiredLength }) =>
        `This field cannot have less than ${requiredLength} characters`,
    maxlength: ({ requiredLength }) =>
        `This field cannot have more than ${requiredLength} characters`,
    max: ({ max }) =>
        `This field cannot be higher than ${
            typeof max === 'number' ? formatNo(max) : max
        }`,
    min: ({ min }) =>
        `This field cannot be lower than ${
            typeof min === 'number' ? formatNo(min) : min
        }`,
    email: () => 'Please enter a valid email'
};

export const ZX_CONTROL_ERRORS = new InjectionToken('ZX_CONTROL_ERRORS', {
    providedIn: 'root',
    factory: () => ZX_CONTROL_ERRORS_DICTIONARY
});
