import { Component } from '@angular/core';

@Component({
    selector: 'docs-example-container',
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                margin: 1rem 0;
                border: 1px solid #e9ecef;
                padding: 1rem;
                border-radius: 4px;
                background-color: #fff;
            }
        `
    ]
})
export class ExampleContainerComponent {}
