import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeSnippetComponent } from '../code-snippet';
import { ExampleContainerComponent } from '../example-container';

@Component({
    selector: 'docs-example-viewer',
    standalone: true,
    imports: [MatTabsModule, CodeSnippetComponent, ExampleContainerComponent],
    templateUrl: './example-viewer.component.html',
    styleUrl: './example-viewer.component.scss'
})
export class ExampleViewerComponent {
    @Input() label = '';
    @Input() html = '';
    @Input() ts = '';
    @Input() css = '';
}
