import { Pipe, PipeTransform } from '@angular/core';
import { getFlag } from './get-flag';

@Pipe({
    name: 'countryFlag',
    standalone: true
})
export class CountryFlagPipe implements PipeTransform {
    transform(countryCode: string): string {
        return getFlag(countryCode);
    }
}
