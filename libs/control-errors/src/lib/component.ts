import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { ZxControlErrorMessage } from './control-error-message.component';

export interface ZxControlErrorProps {
    /**
     * It will be displayed as the error message.
     */
    message: string;
    /**
     * The width will be set by the zxControlError directive.
     */
    width: number | undefined;
}

export type ZxControlErrorComponentDef = ComponentType<ZxControlErrorProps>;

export const ZX_CONTROL_ERROR_COMPONENT =
    new InjectionToken<ZxControlErrorComponentDef>(
        'ZX_CONTROL_ERROR_COMPONENT',
        {
            providedIn: 'root',
            factory: () => ZxControlErrorMessage
        }
    );
