import { InjectionToken } from '@angular/core';

export type ZxControlErrorsConfig = {
    offsetY?: number;
    debounceTime?: number;
};

export const ZX_CONTROL_ERRORS_CONFIG =
    new InjectionToken<ZxControlErrorsConfig>('ZX_CONTROL_ERRORS_CONFIG');
