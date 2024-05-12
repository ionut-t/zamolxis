# Numeric Input

## Installation

Note: Designed to be used inside `<mat-form-field>` [component from Angular Material](https://material.angular.io/components/form-field/overview).

```bash
npm install @zamolxis/numeric-input
```

## Overview

A directive designed to format numeric input fields to adhere to 
locale-specific formatting rules, such as digit grouping (thousands separators), 
decimal mark usage (period or comma), and potentially other region-specific adjustments and to return a number value.

It uses the [formatNumber](https://angular.io/api/common/formatNumber) function
from the Angular `@angular/common` package for formatting the displayed value, which is also
used by the `DecimalPipe`.

Although the input type needs to be a type `text` to allow for locale-specific formatting, the emitted value
will always be a number.
If the value is truncated it will be rounded using the "to-nearest" method. This behaviour can be
disabled by setting the `disableDecimalRounding` input to `true`.

## Features

- Locale-specific numeric formatting.
- Configurable decimal precision.
- Optional disabling of decimal rounding.
- Seamless integration with Angular Material form fields.
- Implements `ControlValueAccessor` for use with Angular forms.

## Usage

To use the `ZxNumericInput` directive, add the `zxNumericInput` attribute to a standard `<input>`
element and ensure it is a child of an Angular Material form field component.

```html

<mat-form-field>
    <mat-label>Price</mat-label>
    <span matTextPrefix>£</span>
    <input zxNumericInput formControlName="price" />
</mat-form-field>
```

## API Reference

```typescript
import { ZxNumericInput } from '@zamolxis/numeric-input';
```

Selector: `zxNumericInput`

Exported as: `zxNumericInput`

### Properties

- `@Input('zxNumericInput') digitsInfo: string`

  It accepts a string that represents the format of the number. If not provided, it defaults to `1.0-3`
  (one integer digit, zero to three fractional digits).
  See [Angular documentation for more details about formatting the input value](https://angular.io/api/common/formatNumber).

- `@Input() locale: string | undefined`

  Applies locale-dictated formatting to a number,
  including rules for digit grouping (e.g., thousands separators),
  the choice of decimal mark (period or comma), and potentially other region-specific adjustments.
  If not provided, the value of LOCALE_ID will be used (en-US by default).
  [See Angular documentation for setting the app locale](https://angular.io/api/core/LOCALE_ID).

- `@Input({ transform: booleanAttribute }) disableDecimalRounding: boolean`

  Disables the rounding of the value decimal. If set to `true`, the input value will not be rounded when the displayed value is truncated.
  Default is `false`.

- `@Output() valueChange: EventEmitter<number | null>`

It is possible to configure the `digitsInfo`, `locale` and `disableDecimalRounding` properties at the application (or
component) level using the `ZX_NUMERIC_INPUT_CONFIG` injection token, as shown below.

```typescript
import localeFr from '@angular/common/locales/fr';
import { ZX_NUMERIC_INPUT_CONFIG } from '@zamolxis/numeric-input';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: ZX_NUMERIC_INPUT_CONFIG,
            useValue: {
                digitsInfo: '1.2-2',
                locale: 'fr-FR',
                disableDecimalRounding: true
            }
        }
    ]
};
````

