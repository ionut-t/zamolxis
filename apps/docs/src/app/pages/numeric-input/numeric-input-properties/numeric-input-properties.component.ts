import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import {
    ApiPropertyCardComponent,
    ApiPropertyDescriptionComponent,
    ApiPropertyNameComponent
} from '../../../core/api-property-card';
import { CodeSnippetComponent } from '../../../core/code-snippet';
import { ExampleContainerComponent } from '../../../core/example-container';

@Component({
    selector: 'docs-numeric-input-properties',
    standalone: true,
    imports: [
        CommonModule,
        ApiPropertyCardComponent,
        ApiPropertyDescriptionComponent,
        ApiPropertyNameComponent,
        ExampleContainerComponent,
        CodeSnippetComponent,
        MatAnchor
    ],
    templateUrl: './numeric-input-properties.component.html',
    styleUrl: './numeric-input-properties.component.scss'
})
export class NumericInputPropertiesComponent {
    config = `
import localeFr from '@angular/common/locales/fr';
import { ZX_NUMERIC_INPUT_CONFIG } from '@zamolxis/numeric-input';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: ZX_NUMERIC_INPUT_CONFIG,
            useValue: {
                digitsInfo: '1.2-2',
                locale: 'fr-FR',
                disableDecimalRounding: true
            }
        }
    ]
};`;
}
