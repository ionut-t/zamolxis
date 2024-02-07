import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ZxControlErrors } from '@zamolxis/control-errors';
import { CodeSnippetComponent } from '../../core/code-snippet';
import { ExampleContainerComponent } from '../../core/example-container';
import { ExampleViewerComponent } from '../../core/example-viewer';
import { ControlErrorsPropertiesComponent } from './control-errors-properties/control-errors-properties.component';
import { ExampleControlErrorsComponent } from './example-control-errors/example-control-errors.component';
import Snippets from './snippets';

@Component({
    selector: 'docs-control-errors',
    standalone: true,
    imports: [
        MatInputModule,
        ZxControlErrors,
        ExampleControlErrorsComponent,
        CodeSnippetComponent,
        ExampleViewerComponent,
        CodeSnippetComponent,
        ControlErrorsPropertiesComponent,
        ExampleContainerComponent
    ],
    templateUrl: './control-errors.component.html',
    styleUrl: './control-errors.component.scss'
})
export class ControlErrorsComponent {
    readonly Snippets = Snippets;
}
