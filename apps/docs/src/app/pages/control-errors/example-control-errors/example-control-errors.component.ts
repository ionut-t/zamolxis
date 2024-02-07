import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ZxControlErrors } from '@zamolxis/control-errors';

@Component({
    selector: 'docs-example-control-errors',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, ZxControlErrors],
    template: `
        <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput [formControl]="control" zxControlErrors />
        </mat-form-field>
    `,
    styles: [
        `
            :host {
                display: block;
                margin: 22px;
            }
        `
    ]
})
export class ExampleControlErrorsComponent {
    readonly control = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
}
