import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2
} from '@angular/core';
import { getFlag } from './get-flag';

@Directive({
    selector: '[zxFlag]',
    standalone: true
})
export class FlagDirective implements OnInit {
    @Input({ alias: 'zxFlag', required: true }) code = '';

    constructor(
        private readonly _elementRef: ElementRef<HTMLInputElement>,
        private readonly _renderer: Renderer2
    ) {}

    ngOnInit() {
        this._showFlag();
    }

    @HostListener('blur')
    @HostListener('focusout')
    _showFlag() {
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            'background',
            `url(${getFlag(this.code, 'png')}) no-repeat scroll 7px`
        );

        this._renderer.setStyle(
            this._elementRef.nativeElement,
            'color',
            'transparent'
        );
    }

    @HostListener('focus')
    _hideFlag() {
        this._renderer.setStyle(
            this._elementRef.nativeElement,
            'background',
            'inherit'
        );

        this._renderer.setStyle(
            this._elementRef.nativeElement,
            'color',
            'inherit'
        );
    }
}
