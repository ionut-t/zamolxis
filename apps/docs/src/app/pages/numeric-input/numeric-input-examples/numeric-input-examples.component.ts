import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ZxNumericInput } from '@zamolxis/numeric-input';

@Component({
    selector: 'docs-numeric-input-examples',
    standalone: true,
    imports: [MatFormFieldModule, ZxNumericInput],
    templateUrl: './numeric-input-examples.component.html',
    styleUrl: './numeric-input-examples.component.scss'
})
export class NumericInputExamplesComponent {
    value = 1000.2688;
}
