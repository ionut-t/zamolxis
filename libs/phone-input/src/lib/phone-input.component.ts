import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AsyncPipe, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    DoCheck,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    LOCALE_ID,
    OnDestroy,
    Optional,
    Output,
    Self,
    signal,
    ViewChild
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormGroupDirective,
    NG_VALIDATORS,
    NgControl,
    NgForm,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    Validator,
    Validators
} from '@angular/forms';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import {
    MAT_FORM_FIELD,
    MatFormField,
    MatFormFieldControl
} from '@angular/material/form-field';
import {
    CountryCode,
    findPhoneNumbersInText,
    isValidNumber,
    parsePhoneNumberFromString,
    PhoneNumber
} from 'libphonenumber-js';
import { asyncScheduler, map, startWith, Subject, switchMap, tap } from 'rxjs';
import { ZxCountries } from './countries';
import { CountryFlagPipe } from './country-flag.pipe';
import { FlagDirective } from './flag.directive';
import { OnlyDigitsDirective } from './only-digits.directive';
import { phoneInputValidator } from './phone-input.validator';

@Directive({
    selector: '[zxValidator]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: ZxValidatorDirective,
            multi: true
        }
    ]
})
class ZxValidatorDirective implements Validator {
    countryCode!: CountryCode;

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.hasValidator(Validators.required) && !control.value)
            return null;

        return control.value && isValidNumber(control.value, this.countryCode)
            ? null
            : { zxInvalidPhone: 'Phone number is invalid' };
    }
}

@Component({
    selector: 'zx-phone-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        NgStyle,
        AsyncPipe,
        NgIf,
        CountryFlagPipe,
        OnlyDigitsDirective,
        NgOptimizedImage,
        FlagDirective
    ],
    templateUrl: './phone-input.component.html',
    styleUrl: './phone-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MatFormFieldControl, useExisting: ZxPhoneInput }],
    hostDirectives: [ZxValidatorDirective],
    host: {
        '[class.floating]': 'shouldLabelFloat',
        '[id]': 'id',
        '[attr.aria-invalid]': 'empty ? null : errorState',
        '[attr.aria-required]': 'required',
        '[attr.id]': 'id',
        '[disabled]': 'disabled',
        '[required]': 'required'
    }
})
export class ZxPhoneInput
    implements
        ControlValueAccessor,
        MatFormFieldControl<string>,
        DoCheck,
        OnDestroy
{
    static nextId = 0;
    _selectedCode = signal<CountryCode>(
        this._localeId.split('-')[1] as CountryCode
    );

    readonly phoneForm = this._fb.group(
        {
            code: new FormControl<CountryCode | ''>(
                this._selectedCode(),
                Validators.required
            ),
            phone: ['']
        },
        { validators: phoneInputValidator }
    );
    touched = false;
    controlType = 'phone-input';
    readonly _showFlag = signal(true);
    readonly countries$ = this.phoneForm.controls.code.valueChanges.pipe(
        tap(value => this._showFlag.set(!!value)),
        startWith(''),
        switchMap(value =>
            this._countries.countries$.pipe(
                map(countries =>
                    countries.filter(country =>
                        country.name
                            .toLowerCase()
                            .includes(value!.toLowerCase())
                    )
                )
            )
        )
    );
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() blur = new EventEmitter<FocusEvent>();
    @ViewChild('phoneInput') private readonly _phoneInput!: HTMLInputElement;
    private _phoneNumber: PhoneNumber | undefined;

    private _placeholder = '';

    private _required: boolean | undefined;

    private _disabled = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.phoneForm.disable() : this.phoneForm.enable();
        this.stateChanges.next();
    }

    get empty() {
        const {
            value: { code, phone }
        } = this.phoneForm;

        return !code && !phone;
    }

    errorState = false;

    focused = false;
    readonly id = `zx-phone-input-${ZxPhoneInput.nextId++}`;

    onContainerClick(event: Event) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this._focusMonitor.focusVia(this._phoneInput, 'program');
        }
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    get required(): boolean {
        return (
            this._required ??
            this.ngControl?.control?.hasValidator(Validators.required) ??
            false
        );
    }

    @Input()
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    setDescribedByIds(ids: string[]) {
        const controlElement = this._elementRef.nativeElement.querySelector(
            '.zx-phone-input-container'
        )!;
        controlElement?.setAttribute('aria-describedby', ids.join(' '));
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty || !!this._selectedCode();
    }

    stateChanges = new Subject<void>();
    @Input('aria-describedby') userAriaDescribedBy = '';

    @Input()
    get value(): string | null {
        if (this.phoneForm.valid) {
            return this.phoneForm.value.phone!;
        }

        return null;
    }

    set value(_phone: string | null) {
        this.stateChanges.next();
    }

    get errors() {
        return this.phoneForm.errors;
    }

    constructor(
        private readonly _countries: ZxCountries,
        private readonly _fb: NonNullableFormBuilder,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _elementRef: ElementRef<HTMLElement>,
        @Inject(LOCALE_ID) private readonly _localeId: string,
        @Optional()
        @Inject(MAT_FORM_FIELD)
        public readonly _formField: MatFormField,
        @Optional()
        @Self()
        public readonly ngControl: NgControl,
        @Optional() private readonly _parentForm: NgForm,
        @Optional() private readonly _parentFormGroup: FormGroupDirective,
        private readonly _validator: ZxValidatorDirective
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }

        this.phoneForm.controls.code.setValue(
            this._localeId.split('-')[1] as CountryCode
        );
        this._validator.countryCode = this._selectedCode();
    }

    ngDoCheck() {
        if (this.ngControl) {
            this._updateErrorState();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    onChange = (_: string | null) => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouched = () => {};

    onFocusIn() {
        if (!this.focused) {
            this.focused = true;
            this.stateChanges.next();
        }
    }

    onFocusOut(event: FocusEvent) {
        if (
            !this._elementRef.nativeElement.contains(
                event.relatedTarget as Element
            )
        ) {
            this.touched = true;
            this.focused = false;
            this.onTouched();
            this.stateChanges.next();
        }

        this.blur.emit(event);
    }

    autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement) {
        if (!control.errors && nextElement) {
            this._focusMonitor.focusVia(nextElement, 'program');
        }
    }

    registerOnChange(fn: (value: string | null) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    writeValue(value: string | null) {
        let formValue: { phone: string; code: CountryCode };

        if (value) {
            const number = findPhoneNumbersInText(value)[0]?.number;

            formValue = {
                phone: (number?.nationalNumber as string) || value,
                code: number?.country || this._selectedCode()
            };

            if (number?.country) {
                this._selectedCode.set(number.country);
                this._validator.countryCode = number.country;
            }

            this._showFlag.set(true);
        } else {
            this.phoneForm.get('phone')!.reset();

            formValue = { phone: '', code: this._selectedCode() };
        }

        this.value = formValue.phone;
        this.phoneForm.setValue(formValue);

        this.formatPhoneNumber();
    }

    _handleInput(control: AbstractControl, nextElement?: HTMLInputElement) {
        // console.log('=>(phone-input.component.ts:327) control', control.errors);
        this.autoFocusNext(control, nextElement);
        // this.onChange(this.value);
        this.stateChanges.next();
    }

    formatPhoneNumber() {
        const inputValue = this.phoneForm.controls.phone.value;
        const phoneNumber = parsePhoneNumberFromString(
            inputValue,
            this._selectedCode()
        );

        this._phoneNumber = phoneNumber;

        if (phoneNumber) {
            const value = phoneNumber.formatInternational();
            this.phoneForm.controls.phone.setValue(value);
            this.onChange(value);
        } else {
            this.onChange(inputValue);
        }
    }

    onInput() {
        this._showFlag.set(false);
    }

    optionSelected(event: MatAutocompleteSelectedEvent) {
        this._selectedCode.set(event.option.value);
        this._validator.countryCode = event.option.value;
        this.phoneForm.controls.code.setValue(event.option.value);

        if (this._phoneNumber && this._phoneNumber.isValid()) {
            const phoneNumber = parsePhoneNumberFromString(
                this._phoneNumber.nationalNumber.toString(),
                this._selectedCode()
            );

            this.phoneForm.patchValue({
                phone: phoneNumber?.formatInternational(),
                code: event.option.value
            });
        }

        this._focusMonitor.focusVia(this._phoneInput, 'program');
    }

    onFocusInCode() {
        this.phoneForm.controls.code.reset('');
    }

    onFocusOutCode() {
        asyncScheduler.schedule(() => {
            this.phoneForm.controls.code.setValue(this._selectedCode());

            this._focusMonitor.focusVia(this._phoneInput, 'program');
            this.phoneForm.updateValueAndValidity();
        }, 250);
    }

    private _updateErrorState() {
        const parent = this._parentFormGroup || this._parentForm;

        const oldState = this.errorState;
        const newState =
            (this.ngControl?.invalid || this.phoneForm.invalid) &&
            (this.touched || !!parent?.submitted);

        if (oldState !== newState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
