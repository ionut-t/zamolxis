import { Component } from '@angular/core';

@Component({
    selector: 'docs-api-property-card',
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
        `
    ]
})
export class ApiPropertyCardComponent {}
