import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ZxControlErrorProps } from './component';

const ANIMATION_TIME = 250;

@Component({
    selector: 'zx-control-error-message',
    standalone: true,
    template: `<p>{{ message }}</p>`,
    styleUrl: 'control-error-message.component.scss',
    animations: [
        trigger('zxErrorAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0)', opacity: 0 }),
                animate(
                    `${ANIMATION_TIME}ms  cubic-bezier(0.4, 0.0, 1, 1)`,
                    style({ transform: 'scale(1)', opacity: 1 })
                )
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)', opacity: 1 }),
                animate(
                    `${ANIMATION_TIME}ms cubic-bezier(0.4, 0.0, 1, 1)`,
                    style({ transform: 'scale(0)', opacity: 0 })
                )
            ])
        ])
    ],
    host: {
        class: 'zx-control-error-message',
        '[style.width.px]': 'width',
        '[@zxErrorAnimation]': ''
    }
})
export class ZxControlErrorMessage implements ZxControlErrorProps {
    message = '';
    width: number | undefined;
}
