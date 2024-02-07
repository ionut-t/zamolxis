import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    inject,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ZX_CONTROL_ERROR_COMPONENT } from './component';
import { ZxControlErrors } from './control-errors.directive';

const provideMockIntersectionObserver = (intersectionRatio: number) => {
    class MockIntersectionObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        root = null;
        rootMargin = '';
        thresholds = [1];
        disconnect = jest.fn();
        takeRecords = jest.fn();

        constructor(callback: IntersectionObserverCallback) {
            const intersectionObserverEntry = {
                intersectionRatio
            } as IntersectionObserverEntry;
            callback([intersectionObserverEntry], this);
        }
    }

    window.IntersectionObserver = MockIntersectionObserver;
};

@Component({
    selector: 'zx-error',
    template: ` <div>{{ message }}</div> `
})
class ErrorComponent {
    width: number | undefined;
    message = '';
}

@Component({
    selector: 'zx-test-host',
    template: `
        <input
            name="testInput"
            [formControl]="control"
            zxControlErrors
            #zxControlErrors="zxControlErrors"
        />
        <button (click)="zxControlErrors.checkForErrors()">Submit</button>
    `
})
class TestHostComponent {
    control = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
}

describe('ZxControlErrorsDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        provideMockIntersectionObserver(1);

        TestBed.overrideProvider(ZX_CONTROL_ERROR_COMPONENT, {
            useValue: ErrorComponent
        });

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                ZxControlErrors,
                NoopAnimationsModule
            ],
            declarations: [TestHostComponent]
        }).compileComponents();

        inject(
            [OverlayContainer],
            (overlayContainer: OverlayContainer) =>
                (overlayContainerElement =
                    overlayContainer.getContainerElement())
        )();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should display error message when input is invalid', fakeAsync(() => {
        hostComponent.control.setValue('1');
        hostComponent.control.markAsDirty();

        tick(400);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe(
            'This field cannot have less than 3 characters'
        );
    }));

    it('should display error message when the manual trigger is used', fakeAsync(() => {
        const btn = fixture.debugElement.query(By.css('button'));
        btn.triggerEventHandler('click');

        tick(400);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe(
            'This field is required'
        );
    }));

    it('should not display an error message if the input is not in the viewport', fakeAsync(() => {
        provideMockIntersectionObserver(0);
        hostComponent.control.setValue('1');
        hostComponent.control.markAsDirty();

        tick(400);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should remove error message when input becomes valid', fakeAsync(() => {
        hostComponent.control.setValue('1');
        hostComponent.control.markAsDirty();

        tick(400);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe(
            'This field cannot have less than 3 characters'
        );

        hostComponent.control.setValue('123');
        hostComponent.control.markAsDirty();

        tick(400);
        fixture.detectChanges();

        expect(overlayContainerElement.textContent).toBe('');
    }));
});
