import { formatNumber } from '@angular/common';

const round = (value: number, decimals: number) => {
    const n = (value + 'e' + decimals) as unknown as number;

    return Number(Math.round(n) + 'e-' + decimals);
};

export const stripNonNumericCharacters = (value: string) =>
    value.replace(/[^\d.-]/g, '');

export const parseValue = (
    value: string,
    digitsInfo: string | undefined,
    noRounding: boolean
) => {
    const parsed =
        value !== null && value !== '' && Number.isFinite(Number(value))
            ? Number(value)
            : null;

    if (noRounding || !parsed) return parsed;

    if (digitsInfo) {
        const maxFractionDigits = Number(digitsInfo[digitsInfo.length - 1]);

        return round(parsed, maxFractionDigits);
    }

    return parsed;
};

export const isNil = (value: unknown): value is null | undefined =>
    value === null || value === undefined;

export const getLocaleSeparators = (
    localeId: string
): {
    decimalSeparator: string;
    thousandsSeparator: string;
} => {
    const formattedNumber = formatNumber(1000.1, localeId, '1.0-1');
    const decimalSeparator = formattedNumber.charAt(formattedNumber.length - 2);
    const thousandsSeparator = formattedNumber.charAt(1);

    return { decimalSeparator, thousandsSeparator };
};

const ALLOWED_KEYS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    '-',
    'Escape',
    'Tab',
    'Backspace',
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'Delete',
    'Home',
    'End',
    'Meta'
];

export const isAllowedKey = (event: KeyboardEvent) =>
    ALLOWED_KEYS.includes(event.key);

/**
 * Handles both Ctrl and Cmd keys for macOS
 */
export const isModifierKey = (event: KeyboardEvent) =>
    event.ctrlKey || event.metaKey;

/**
 * For copy, cut, paste, select all
 */
export const isEditKey = (event: KeyboardEvent) =>
    ['c', 'x', 'v', 'a'].includes(event.key.toLowerCase());

export const isDeleteOrBackspace = (event: KeyboardEvent) =>
    event.key === 'Delete' || event.key === '-';
