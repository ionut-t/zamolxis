import { Component } from '@angular/core';

@Component({
    selector: 'docs-api-property-name',
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                font-size: 16px;
                padding: var(--size-lg);
                border-bottom: 1px solid #ccc;
                background-color: #f2f0f0;
            }
        `
    ]
})
export class ApiPropertyNameComponent {}
