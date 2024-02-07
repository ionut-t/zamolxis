import { Component } from '@angular/core';

@Component({
    selector: 'docs-api-property-description',
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                padding: var(--size-lg);
            }
        `
    ]
})
export class ApiPropertyDescriptionComponent {}
