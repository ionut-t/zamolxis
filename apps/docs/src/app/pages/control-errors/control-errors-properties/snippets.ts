const Config = `export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: ZX_CONTROL_ERRORS_CONFIG,
            useValue: { offsetY: 8, debounceTime: 300 }
        }
    ]
};`;

const CheckForErrors = `
<input placeholder="Email"
       zxControlErrors
       #zxControlErrors="zxControlErrors"
       [formControl]="emailCtrl" />

<button mat-raised-button color="primary" (click)="zxControlErrors.checkForErrors()">
    Check for errors
</button>
`;

export default { Config, CheckForErrors };
