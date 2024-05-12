import { CountryFlagPipe } from './country-flag.pipe';

describe('CountryFlagPipe', () => {
    it('create an instance', () => {
        const pipe = new CountryFlagPipe();
        expect(pipe).toBeTruthy();
    });
});
