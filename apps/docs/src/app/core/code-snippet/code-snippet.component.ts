import { Component, Input } from '@angular/core';
import { HighlightJsDirective } from 'ngx-highlight-js';

@Component({
    selector: 'docs-code-snippet',
    standalone: true,
    imports: [HighlightJsDirective],
    template: `
        @defer {
        <div highlight-js [lang]="language">
            {{ snippet }}
        </div>
        }
    `,
    styles: [
        `
            :host {
                display: block;
                overflow-y: auto;
            }
        `
    ]
})
export class CodeSnippetComponent {
    @Input() snippet = '';
    @Input() language: 'typescript' | 'html' | 'css' | 'bash' = 'typescript';
}
