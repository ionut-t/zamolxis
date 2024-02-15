import { Component } from '@angular/core';
import { CodeSnippetComponent } from '../../core/code-snippet';
import { ExampleContainerComponent } from '../../core/example-container';
import { ExampleViewerComponent } from '../../core/example-viewer';
import { NumericInputExamplesComponent } from './numeric-input-examples/numeric-input-examples.component';
import { NumericInputPropertiesComponent } from './numeric-input-properties/numeric-input-properties.component';
import Snippets from './snippets';

@Component({
    selector: 'docs-numeric-input',
    standalone: true,
    imports: [
        CodeSnippetComponent,
        ExampleContainerComponent,
        ExampleViewerComponent,
        NumericInputExamplesComponent,
        NumericInputPropertiesComponent
    ],
    templateUrl: './numeric-input.component.html',
    styleUrl: './numeric-input.component.scss'
})
export class NumericInputComponent {
    readonly Snippets = Snippets;
}
