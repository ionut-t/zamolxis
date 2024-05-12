import { Directive, ElementRef, HostListener } from '@angular/core';

export const ALLOWED_KEYS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    'Tab',
    'Backspace',
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'Delete',
    'Home',
    'End'
];

const ALLOWED_IN_COMBINATION = ['a', 'A', 'c', 'C', 'v', 'V', 'x', 'X'];

@Directive({
    selector: '[zxOnlyDigits]',
    standalone: true
})
export class OnlyDigitsDirective {
    private get _host(): HTMLInputElement {
        return this._elementRef.nativeElement;
    }

    constructor(private readonly _elementRef: ElementRef<HTMLInputElement>) {}

    @HostListener('keydown', ['$event'])
    onTyping(event: KeyboardEvent) {
        if (event.key === 'ArrowDown' && Number(this._host.value) === 0) {
            event.preventDefault();
        }

        const isNotAllowedKey = !ALLOWED_KEYS.includes(event.key);
        const isAllowedInCombination = ALLOWED_IN_COMBINATION.includes(
            event.key
        );

        if ((event.ctrlKey || event.metaKey) && isAllowedInCombination) {
            return;
        }

        if (isNotAllowedKey) {
            event.preventDefault();
        }
    }
}
