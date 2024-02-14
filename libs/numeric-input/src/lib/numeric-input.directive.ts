import { FocusMonitor } from '@angular/cdk/a11y';
import {
    BooleanInput,
    coerceBooleanProperty,
    NumberInput
} from '@angular/cdk/coercion';
import { formatNumber } from '@angular/common';
import {
    computed,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    LOCALE_ID,
    Optional,
    Output,
    Self,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ControlValueAccessor,
    FormControl,
    NgControl,
    Validators
} from '@angular/forms';
import {
    MAT_FORM_FIELD,
    MatFormField,
    MatFormFieldControl
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { ZX_NUMERIC_INPUT_CONFIG, ZxNumericInputConfig } from './config';
import {
    getLocaleSeparators,
    isAllowedKey,
    isDeleteOrBackspace,
    isEditKey,
    isModifierKey,
    isNil,
    parseValue,
    stripNonNumericCharacters
} from './utils';

@Directive({
    selector: 'input[zxNumericInput]',
    standalone: true,
    providers: [{ provide: MatFormFieldControl, useExisting: ZxNumericInput }],
    host: {
        class: 'mat-mdc-input-element mat-mdc-form-field-input-control mdc-text-field__input',
        '[class.floating]': 'shouldLabelFloat',
        '[id]': 'id',
        '[attr.inputMode]': '"decimal"',
        '[attr.aria-invalid]': 'empty ? null : errorState',
        '[attr.aria-required]': 'required',
        '[attr.id]': 'id',
        '[disabled]': 'disabled',
        '[required]': 'required'
    },
    exportAs: 'zxNumericInput'
})
export class ZxNumericInput
    implements ControlValueAccessor, MatFormFieldControl<number>
{
    static nextId = 0;

    readonly control = new FormControl<number | null>(null);

    private _inputValue = '';
    private _digitsInfo = '1.0-3';
    private readonly _usedLocale = signal(this._localeId);

    controlType = 'numeric-input';
    touched = false;

    /**
     * Applies locale-dictated formatting to a number,
     * including rules for digit grouping (e.g., thousands separators),
     * the choice of decimal mark (period or comma), and potentially other region-specific adjustments.
     *
     * It uses the {@link https://angular.io/api/common/formatNumber formatNumber} function
     * from the Angular `@angular/common` package for formatting the displayed value, which is also
     * used by the `DecimalPipe`.
     *
     * It accepts a string that represents the format of the number. If not provided, it defaults to `1.0-3`
     * (one integer digit, zero to three fractional digits).
     *
     * See {@link https://angular.io/api/common/DecimalPipe#digitsinfo Angular documentation}
     * for more details about formatting the input value.
     *
     * The value emitted by the `valueChange` event is always a number, regardless of the format.
     * If the value is truncated it will be rounded using the "to-nearest" method. This behaviour can be
     * disabled by setting the `disableDecimalRounding` input to `true`.
     */
    @Input('zxNumericInput') set digitsInfo(value: string) {
        if (value) {
            this._digitsInfo = value;
        }
    }

    /**
     * Sets the locale rules for formatting the displayed value.
     * If not supplied, the value of LOCALE_ID will be used by default.
     *
     * See {@link https://angular.io/guide/i18n-common-locale-id Angular documentation for setting the app locale}.
     */
    @Input() set locale(value: string) {
        this._usedLocale.set(value);
    }

    /**
     * Disables the rounding of the value decimal.
     * If set to `true`, the input value will not be rounded when the displayed value is truncated.
     * Default is `false`.
     */
    @Input({ transform: coerceBooleanProperty })
    set disableDecimalRounding(disableDecimalRounding: boolean) {
        this._disableRounding = disableDecimalRounding;
    }

    // Implemented as part of MatFormFieldControl
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.ngControl?.control?.disabled ?? false);
    }

    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.control.disable() : this.control.enable();
        this.stateChanges.next();
    }
    private _disabled = false;

    // Implemented as part of MatFormFieldControl
    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder = '';

    // Implemented as part of MatFormFieldControl
    @Input()
    get required(): boolean {
        return (
            this._required ??
            this.ngControl?.control?.hasValidator(Validators.required) ??
            false
        );
    }
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required: boolean | undefined;

    // Implemented as part of MatFormFieldControl
    @Input('aria-describedby') userAriaDescribedBy = '';

    // Implemented as part of MatFormFieldControl
    @Input()
    get value(): number | null {
        if (this.control.invalid) return null;

        return this.control.value;
    }
    set value(value: NumberInput) {
        if (this.value === value) return;

        if (!isNil(value)) {
            this._inputValue = String(value);
            const parsedValue = parseValue(
                this._inputValue,
                this._digitsInfo,
                this._disableRounding
            );

            this.control.setValue(parsedValue);
            this._formatValue(Number(value));
        } else {
            this.control.setValue(null);
        }

        this.stateChanges.next();
    }

    @Output() valueChange = new EventEmitter<number | null>();

    // Implemented as part of MatFormFieldControl
    get empty() {
        return isNil(this.control.value);
    }

    // Implemented as part of MatFormFieldControl
    get errorState(): boolean {
        return (
            (this.ngControl?.touched ?? false) &&
            (this.ngControl?.invalid ?? false)
        );
    }

    // Implemented as part of MatFormFieldControl
    focused = false;
    id = `zx-numeric-input-${ZxNumericInput.nextId++}`;

    // Implemented as part of MatFormFieldControl
    // eslint-disable-next-line
    onContainerClick(_event: MouseEvent): void {}

    // Implemented as part of MatFormFieldControl
    // eslint-disable-next-line
    setDescribedByIds(_ids: string[]): void {}

    // Implemented as part of MatFormFieldControl
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    // Implemented as part of MatFormFieldControl
    readonly stateChanges = new Subject<void>();

    private readonly _localeSeparators = computed(() =>
        getLocaleSeparators(this._usedLocale())
    );
    private readonly _thousandsSeparator = computed(() =>
        this._localeSeparators().thousandsSeparator === '.'
            ? ' '
            : this._localeSeparators().thousandsSeparator
    );
    private readonly _decimalSeparator = computed(
        () => this._localeSeparators().decimalSeparator
    );

    private _disableRounding = false;

    private get _host() {
        return this._elementRef.nativeElement;
    }

    constructor(
        @Optional() @Self() public readonly ngControl: NgControl,
        @Optional()
        @Inject(MAT_FORM_FIELD)
        public readonly _formField: MatFormField,
        private readonly _elementRef: ElementRef<HTMLInputElement>,
        private readonly _focusMonitor: FocusMonitor,
        @Inject(LOCALE_ID) private readonly _localeId: string,
        @Optional()
        @Inject(ZX_NUMERIC_INPUT_CONFIG)
        readonly _config: ZxNumericInputConfig
    ) {
        if (this.ngControl !== null) {
            this.ngControl.valueAccessor = this;
        }

        this._focusMonitor
            .monitor(this._host)
            .pipe(takeUntilDestroyed())
            .subscribe(focusOrigin => {
                this.focused = !!focusOrigin;
                this.stateChanges.next();

                if (this.focused) {
                    this._unFormatValue();
                } else {
                    this.touched = true;
                    this.focused = false;
                    this.onTouched();
                    this._formatValue(this.control.value);
                }
            });

        if (this._host.type !== 'text') {
            throw new Error(
                'The input type must be "text" for the zxNumericInput directive to work properly.'
            );
        }

        if (_config?.locale) {
            this._usedLocale.set(_config.locale);
        }

        if (!isNil(_config?.disableDecimalRounding)) {
            this._disableRounding = _config.disableDecimalRounding;
        }

        if (_config?.digitsInfo) {
            this._digitsInfo = _config.digitsInfo;
        }
    }

    // eslint-disable-next-line
    onChange = (_value: number | null) => {};

    // eslint-disable-next-line
    onTouched = () => {};

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: number | null): void {
        this.value = value;
        if (!isNil(value)) {
            this._formatValue(value);
        }
    }

    @HostListener('input', ['$event.target.value'])
    private _onInput(value: string) {
        const normalizedValue = value
            // Remove thousands separator
            .replace(new RegExp('\\' + this._thousandsSeparator(), 'g'), '')
            // Replace decimal separator with dot
            .replace(new RegExp('\\' + this._decimalSeparator()), '.');

        this.value = stripNonNumericCharacters(normalizedValue);
        this._updateValue();
    }

    @HostListener('keydown', ['$event'])
    private _onKeyPressed(event: KeyboardEvent) {
        if (event.key === '.' && this._inputValue.includes('.')) {
            event.preventDefault();
        }

        this._handleMinusSign(event);

        this._handleAllowedKeys(event);

        if (event.key === 'ArrowDown') {
            this._increment(event, -1);
        } else if (event.key === 'ArrowUp') {
            this._increment(event, 1);
        }
    }

    private _handleAllowedKeys(event: KeyboardEvent) {
        if (
            (isModifierKey(event) && isEditKey(event)) ||
            isDeleteOrBackspace(event) ||
            isAllowedKey(event)
        ) {
            return;
        } else {
            event.preventDefault();
        }
    }

    // Handling the minus sign
    private _handleMinusSign(event: KeyboardEvent) {
        if (event.key === '-') {
            const cursorPosition = this._host.selectionStart;
            const currentValue = this._host.value;

            // Toggle minus sign only if at the beginning or if no value is entered yet
            // Prevent inserting "-" anywhere else
            if (cursorPosition !== 0 || currentValue.includes('-')) {
                event.preventDefault();
            }

            // Allow users to add "-" at the beginning if it's not already there
            if (!currentValue.startsWith('-') && cursorPosition === 0) {
                this._host.value = '-' + currentValue;
                this.value = this._host.value;
                this._updateValue();
                event.preventDefault();
            }
        }
    }

    private _formatValue(value: number | null | undefined) {
        if (Number.isFinite(value)) {
            const thousandsSeparator = getLocaleSeparators(
                this._usedLocale()
            ).thousandsSeparator;

            this._host.value = formatNumber(
                value!,
                this._usedLocale(),
                this._digitsInfo
            ).replace(
                new RegExp('\\' + thousandsSeparator, 'g'),
                this._thousandsSeparator()
            );
        } else {
            this._host.value = '';
        }
    }

    private _unFormatValue() {
        let value = this._host.value;

        if (value.includes(this._decimalSeparator())) {
            value = value.replace(
                new RegExp('\\' + this._decimalSeparator()),
                '.'
            );
        }

        this._inputValue = stripNonNumericCharacters(value);

        if (value) {
            this._host.value = this._inputValue;
        } else {
            this._host.value = '';
        }
    }

    private _increment(event: KeyboardEvent, increment: -1 | 1) {
        event.preventDefault();
        this._host.value = String((this.control.value ?? 0) + increment);
        this.value = this._host.value;
        this._updateValue();
    }

    private _updateValue() {
        this.valueChange.emit(this.value);
        this.onChange(this.value);
    }
}
