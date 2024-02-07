# Control Errors

## Installation

Note: Requires @angular/cdk package.

```bash
npm install @zamolxis/control-errors @angular/cdk
```

## Overview

A modular directive that automatically displays error messages associated with form controls when validation errors occur. It creates an overlay to show the error, positioned relative to the host input element.

```typescript
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
    template: `
    <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput zxControlErrors [formControl]="control" />
    </mat-form-field>
    `,
})
export class ExampleControlErrorsComponent {
    readonly control = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
}
```

You can also provide a custom component that matches your organisation style guide.

```typescript
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
export class ExampleErrorComponent implements ZxControlErrorProps {
    @HostBinding('@errorAnimation')
    message = '';
    @HostBinding('style.width.px')
    width: number | undefined;
}

export const appConfig: ApplicationConfig = {
    providers: [
        { ZX_CONTROL_ERROR_COMPONENT, useValue: ExampleErrorComponent }
    ]
}
```

Additionally, you can provide an errors dictionary to add support for more error messages or extend ZX_CONTROL_ERRORS_DICTIONARY object for matching all the error messages.

```typescript
const CONTROL_ERRORS_DICTIONARY: ZxControlErrorsDictionary = {
    required: () => 'This field is required',
    minlength: ({ requiredLength }) =>
        `This field must have at least ${requiredLength} characters`,
    maxlength: ({ requiredLength }) =>
        `This field cannot have more than ${requiredLength} characters`,
    max: ({ max }) => `The value cannot be higher than ${max}`,
    min: ({ min }) => `The value cannot be lower than ${min}`,
    email: () => 'Please enter a valid email address'
};

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: ZX_CONTROL_ERRORS, useValue: CONTROL_ERRORS_DICTIONARY }
    ]
};
```

You can also provide custom error messages for a specific field as shown below.

```html
<input placeholder="Email"
       formControlName="email"
       [zxControlErrors]="{ email: 'You need to enter a valid email address'}" />
```

## API Reference

```typescript
import { ZxControlErrors } from '@zamolxis/control-errors';
```

Selector: `zxControlErrors`

Exported as: `zxControlErrors`

### Properties

- `@Input('zxControlErrors') customErrors: Record<string, string>`

  Custom errors for the control. The key is the error name, the value is the error message. If not specified, the default errors (from errors dictionary) will be used.

- `@Input({ transform: numberAttribute }) offsetY: number | undefined`

  The offset of the error message component in pixels from the top of the control. If the value is not specified, the error message component will be displayed 12px from the top of the control.

- `@Input({ transform: numberAttribute }) debounceTime: number | undefined`

  The delay in milliseconds for displaying the error message when the user performs an action, such as typing. The default value is 400ms.

It is possible to configure the `offsetY` and `debounceTime` properties at the application (or
component) level using the `ZX_CONTROL_ERRORS_CONFIG` injection token, as shown below.

```typescript
export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: ZX_CONTROL_ERRORS_CONFIG,
            useValue: { offsetY: 8, debounceTime: 300 }
        }
    ]
};
````

### Methods

- `checkForErrors(): void`

  Can be used to manually trigger the check for errors. Useful when there's a single input and not part of a form.

#### Example

```html
<input placeholder="Email"
       zxControlErrors
       #zxControlErrors="zxControlErrors"
       [formControl]="emailCtrl" />

<button mat-raised-button color="primary" (click)="zxControlErrors.checkForErrors()">
    Check for errors
</button>
```
