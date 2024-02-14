import { InjectionToken } from '@angular/core';

export type ZxNumericInputConfig = {
    digitsInfo?: string;
    locale?: string;
    disableDecimalRounding?: boolean;
};

export const ZX_NUMERIC_INPUT_CONFIG = new InjectionToken<ZxNumericInputConfig>(
    'ZX_NUMERIC_INPUT_CONFIG'
);
