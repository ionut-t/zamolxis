import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ZxControlErrors } from '@zamolxis/control-errors';
import {
    ApiPropertyCardComponent,
    ApiPropertyDescriptionComponent,
    ApiPropertyNameComponent
} from '../../../core/api-property-card';
import { CodeSnippetComponent } from '../../../core/code-snippet';
import { ExampleContainerComponent } from '../../../core/example-container';
import { ExampleViewerComponent } from '../../../core/example-viewer';
import { ExampleControlErrorsComponent } from '../example-control-errors/example-control-errors.component';
import Snippets from './snippets';

@Component({
    selector: 'docs-control-errors-properties',
    standalone: true,
    imports: [
        ApiPropertyCardComponent,
        ApiPropertyNameComponent,
        ApiPropertyDescriptionComponent,
        ExampleControlErrorsComponent,
        ExampleViewerComponent,
        ReactiveFormsModule,
        ZxControlErrors,
        MatInputModule,
        MatButton,
        ExampleContainerComponent,
        CodeSnippetComponent
    ],
    templateUrl: './control-errors-properties.component.html',
    styleUrl: './control-errors-properties.component.scss'
})
export class ControlErrorsPropertiesComponent {
    readonly Snippets = Snippets;

    readonly emailCtrl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
}
