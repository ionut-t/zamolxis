const Examples = {
    html: `
<div>
    <p>Default usage</p>
    <mat-form-field>
        <input zxNumericInput #input1="zxNumericInput" [value]="value" />
        <mat-hint>Input value: {{ input1.value }}</mat-hint>
    </mat-form-field>
</div>

<div>
    <p>With no decimal rounding</p>
    <mat-form-field>
        <input zxNumericInput disableDecimalRounding #input2="zxNumericInput" [value]="value" />
        <mat-hint>Input value: {{ input2.value }}</mat-hint>
    </mat-form-field>
</div>

<div>
    <p>With French locale and digits info "1.2-2"</p>
    <mat-form-field>
        <input zxNumericInput="1.2-2" locale="fr-Fr" #input3="zxNumericInput" [value]="value" />
        <mat-hint>Input value: {{ input3.value }}</mat-hint>
    </mat-form-field>
</div>`,
    ts: `
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ZxNumericInput } from '@zamolxis/numeric-input';

@Component({
    selector: 'numeric-input-examples',
    standalone: true,
    imports: [MatFormFieldModule, ZxNumericInput],
    templateUrl: './numeric-input-examples.component.html'
})
export class NumericInputExamplesComponent {
    value = 1000.2688;
}`
};

export default { Examples };
