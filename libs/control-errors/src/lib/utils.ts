import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';

/**
 * Checks if a given html element is visible in the viewport
 */
export const isElementInViewport = (target: HTMLElement): Promise<boolean> => {
    return new Promise(resolve => {
        const observer = new IntersectionObserver(([entry]) => {
            resolve(entry.intersectionRatio === 1);
            observer.disconnect();
        });

        observer.observe(target);
    });
};

export const createOverlayConfig = ({
    overlay,
    element,
    offsetY,
    transformOrigin
}: {
    overlay: Overlay;
    element: ElementRef<HTMLElement>;
    offsetY: number;
    transformOrigin: string;
}) => {
    return new OverlayConfig({
        positionStrategy: overlay
            .position()
            .flexibleConnectedTo(element)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: offsetY
                }
            ])
            .withTransformOriginOn(`.${transformOrigin}`),
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: false,
        panelClass: ['cdk-overlay-connected-position-bounding-box'],
        scrollStrategy: overlay.scrollStrategies.close()
    });
};

export const coerceObjectProperty = (
    value: Record<string, string> | string
): Record<string, string> => {
    return typeof value === 'string' ? {} : value;
};
