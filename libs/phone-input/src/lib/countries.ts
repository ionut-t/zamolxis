import { Observable } from 'rxjs';

export abstract class ZxCountries<T = { name: string; alpha2Code: string }> {
    countries$!: Observable<T[]>;
}
