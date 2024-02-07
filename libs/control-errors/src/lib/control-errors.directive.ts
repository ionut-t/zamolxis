import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
    ComponentRef,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import {
    ZX_CONTROL_ERROR_COMPONENT,
    ZxControlErrorComponentDef,
    ZxControlErrorProps
} from './component';
import { ZX_CONTROL_ERRORS_CONFIG, ZxControlErrorsConfig } from './config';
import { ZX_CONTROL_ERRORS, ZxControlErrorsDictionary } from './errors';
import {
    coerceObjectProperty,
    createOverlayConfig,
    isElementInViewport
} from './utils';

export type ObjectInput = Record<string, string> | string;

@Directive({
    selector: '[zxControlErrors]',
    standalone: true,
    exportAs: 'zxControlErrors',
    host: { '[class]': 'id' }
})
export class ZxControlErrors implements OnInit, OnDestroy {
    static nextId = 0;
    readonly id = `zx-control-errors-${ZxControlErrors.nextId++}`;

    /**
     * You can provide custom error messages for each error type
     * in the following format: Record<string, string>
     * @example <input formControlName="name" [zxControlErrors]="{ required: 'This field is required' }" />
     *
     */
    @Input({
        alias: 'zxControlErrors',
        transform: (value: ObjectInput) => coerceObjectProperty(value)
    })
    customErrors: ObjectInput = {};
    @Input({ transform: (value: NumberInput) => coerceNumberProperty(value) })
    offsetY: number | undefined;
    @Input({ transform: (value: NumberInput) => coerceNumberProperty(value) })
    debounceTime: number | undefined;

    private _componentRef: ComponentRef<ZxControlErrorProps> | null = null;
    private _errorMessage: string | undefined;
    private _overlayRef: OverlayRef | undefined;
    private _offsetY = 12;
    private _delay = 400;
    private readonly _destroy$ = new Subject<void>();

    private get _host(): HTMLInputElement {
        return this._element.nativeElement;
    }

    private get _validationErrors(): ValidationErrors | null {
        return this._ngControl.control?.errors ?? null;
    }

    constructor(
        private readonly _element: ElementRef<HTMLInputElement>,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _overlay: Overlay,
        @Inject(ZX_CONTROL_ERRORS)
        private readonly _errors: ZxControlErrorsDictionary,
        @Self() private readonly _ngControl: NgControl,
        @Inject(ZX_CONTROL_ERROR_COMPONENT)
        private readonly _errorComponent: ZxControlErrorComponentDef,
        @Optional()
        @Inject(ZX_CONTROL_ERRORS_CONFIG)
        private readonly _config: ZxControlErrorsConfig
    ) {}

    ngOnInit() {
        this._offsetY = this.offsetY ?? this._config?.offsetY ?? this._offsetY;
        this._delay =
            this.debounceTime ?? this._config?.debounceTime ?? this._delay;

        if (this._ngControl.control) {
            this._ngControl.control.valueChanges
                .pipe(takeUntil(this._destroy$), debounceTime(this._delay))
                .subscribe(async () => {
                    if (!(await isElementInViewport(this._host))) {
                        return;
                    }

                    if (
                        this._validationErrors &&
                        this._ngControl.control!.dirty
                    ) {
                        this._displayError(this._validationErrors);
                    } else {
                        this._clearError();
                    }
                });
        }
    }

    @HostListener('input')
    _onTyping() {
        this._clearError();
    }

    @HostListener('focus')
    _focus() {
        if (this._validationErrors && this._ngControl.control?.touched) {
            this._displayError(this._validationErrors);
        }
    }

    @HostListener('blur')
    _blur() {
        this._clearError();
    }

    /**
     * Can be used to manually trigger the check for errors.
     * Useful when there's a single input and not part of a form.
     *
     * @example
     * <input formControlName="name" zxControlErrors #zxControlErrors="zxControlErrors" />
     * <button (click)="zxControlErrors.checkForErrors()">Check for errors</button>
     */
    checkForErrors() {
        if (this._validationErrors) {
            this._ngControl.control?.markAsTouched();
            this._focusMonitor.focusVia(this._host, 'program');
        }
    }

    private _clearError() {
        if (this._componentRef) {
            this._componentRef = null;
            this._overlayRef?.detach();
        }
    }

    private _createOverlay() {
        this._overlayRef = this._overlay.create(
            createOverlayConfig({
                overlay: this._overlay,
                element: this._element,
                offsetY: this._offsetY,
                transformOrigin: this.id
            })
        );
    }

    private _displayError(errors: ValidationErrors) {
        const candidateError = Object.keys(errors)[0];

        const errorFn = () => {
            const errFn =
                this._errors[candidateError as keyof ZxControlErrorsDictionary];

            if (errFn) return errFn;

            throw new Error(`
      Please provide a message for '${candidateError}' error

      Example:

            <input [formControl]="control" [zxControlErrors]="{ ${candidateError}: 'Some error message' }"/>
      `);
        };

        this._errorMessage =
            (this.customErrors as Record<string, string>)[candidateError] ??
            errorFn()(errors[candidateError]);

        this._setError(this._errorMessage);
    }

    private _setError(message: string) {
        if (!this._componentRef) {
            this._createOverlay();

            this._componentRef = this._overlayRef!.attach(
                new ComponentPortal(this._errorComponent)
            );
            this._componentRef.instance.width = this._host.offsetWidth;
            this._componentRef.instance.message = message;
        }
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.unsubscribe();
        this._clearError();
    }
}
