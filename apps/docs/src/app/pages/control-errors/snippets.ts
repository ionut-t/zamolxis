const ControlErrors = {
    html: `
<mat-form-field>
    <mat-label>Name</mat-label>
    <input matInput zxControlErrors [formControl]="control" />
</mat-form-field>
`,
    ts: `
    import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ZxControlErrors } from '@zamolxis/control-errors';

@Component({
    selector: 'example-control-errors',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, ZxControlErrors],
    templateUrl: 'example-control-errors.component.html',
})
export class ExampleControlErrorsComponent {
    readonly control = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
}`
};

const ErrorsConfig = `
const CONTROL_ERRORS_DICTIONARY: ZxControlErrorsDictionary = {
    required: () => 'This field is required',
    minlength: ({ requiredLength }) =>
        \`This field must have at least \${requiredLength} characters\`,
    maxlength: ({ requiredLength }) =>
        \`This field cannot have more than \${requiredLength} characters\`,
    max: ({ max }) => \`The value cannot be higher than \${max}\`,
    min: ({ min }) => \`The value cannot be lower than \${min}\`,
    email: () => 'Please enter a valid email address'
};

export const appConfig: ApplicationConfig = {
    providers: [
        ...,
        { provide: ZX_CONTROL_ERRORS, useValue: CONTROL_ERRORS_DICTIONARY }
    ]
};`;

const CustomError = `
<input placeholder="Email"
       formControlName="email"
       [zxControlErrors]="{ email: 'You need to enter a valid email address'}" />`;

const CustomErrorComponent = `
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { ZX_CONTROL_ERROR_COMPONENT, ZxControlErrorProps } from '@zamolxis/control-errors';

@Component({
    selector: 'example-error',
    standalone: true,
    template: '<p>{{ message }}</p>',
    animations: [
        trigger('errorAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0)', opacity: 0 }),
                animate('250ms cubic-bezier(0.4, 0.0, 1, 1)', style({ transform: 'scale(1)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)', opacity: 1 }),
                animate('250ms cubic-bezier(0.4, 0.0, 1, 1)', style({ transform: 'scale(0)', opacity: 0 }))
            ])
        ])
    ]
})
export class ExampleErrorComponent implements ZxControlErrorProps  {
    @HostBinding('@errorAnimation')
    message = '';
    @HostBinding('style.width.px')
    width: number | undefined;
}

export const appConfig: ApplicationConfig = {
    providers: [
        ...,
        { ZX_CONTROL_ERROR_COMPONENT, useValue: ExampleErrorComponent }
    ]
}`;

export default {
    ControlErrors,
    ErrorsConfig,
    CustomError,
    CustomErrorComponent
};
