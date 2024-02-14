import { Component, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ZxNumericInput } from './numeric-input.directive';

const createKeyDownEvent = (value: string, cancelable = true) => {
    return new KeyboardEvent('keydown', { key: value, cancelable });
};

const fakeKeyDownEvent = (inputEl: HTMLInputElement, value: string) => {
    let result = '';
    for (const char of value) {
        const event = createKeyDownEvent(char);
        inputEl.dispatchEvent(event);

        // Special handling for the minus sign: only allow it at the beginning
        if (char === '-' && result.length === 0) {
            result = char + result;
        } else if (!event.defaultPrevented && char !== '-') {
            result += char;
        }
    }

    inputEl.value = result;
    inputEl.dispatchEvent(new Event('input'));
};

@Component({
    template: `
        <mat-form-field>
            <input
                [zxNumericInput]="format"
                [formControl]="ctrl"
                [disableDecimalRounding]="noRounding"
            />
        </mat-form-field>
    `
})
class TestWithFormControlComponent {
    ctrl = new FormControl(10);
    format = '0.2-2';
    noRounding = false;

    @ViewChild(ZxNumericInput) directive!: ZxNumericInput;
}

@Component({
    template: `
        <mat-form-field>
            <input zxNumericInput (valueChange)="valueChange($event)" />
        </mat-form-field>
    `
})
class TestSimpleComponent {
    value: number | null = 0;

    valueChange(value: number | null) {
        this.value = value;
    }
}

const mountComponent = async <T>(
    testComponent: Type<T>,
    imports: unknown[] = []
) => {
    await TestBed.configureTestingModule({
        declarations: [testComponent],
        imports: [
            ZxNumericInput,
            MatFormFieldModule,
            NoopAnimationsModule,
            ...imports
        ]
    }).compileComponents();

    const fixture = TestBed.createComponent(testComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    return { fixture, component, input };
};

describe('ZxNumericInput', () => {
    describe('With form control', () => {
        let fixture: ComponentFixture<TestWithFormControlComponent>;
        let component: TestWithFormControlComponent;
        let input: HTMLInputElement;

        beforeEach(async () => {
            const setUp = await mountComponent(TestWithFormControlComponent, [
                ReactiveFormsModule
            ]);
            fixture = setUp.fixture;
            component = setUp.component;
            input = setUp.input;
        });

        it('should create an instance', () => {
            expect(component).toBeTruthy();
            expect(component.directive).toBeTruthy();
        });

        it('should format the input value as a string and return the control value as number', () => {
            fakeKeyDownEvent(input, '1,000.10');

            expect(input.value).toBe('1,000.10');

            expect(component.ctrl.value).toBe(1000.1);
        });

        it('should return an integer', () => {
            component.format = '0.0-0';
            fixture.detectChanges();

            fakeKeyDownEvent(input, '10.35');

            expect(component.ctrl.value).toBe(10);
        });

        it('should return a number with 3 decimals (rounded)', () => {
            component.format = '0.0-3';
            fixture.detectChanges();

            fakeKeyDownEvent(input, '10.3546343');

            expect(component.ctrl.value).toBe(10.355);
        });

        it('should return a number with all decimals entered', () => {
            component.noRounding = true;
            fixture.detectChanges();

            fakeKeyDownEvent(input, '10.3546343');

            expect(component.ctrl.value).toBe(10.3546343);
        });

        it('should increment and decrement by 1', () => {
            input.dispatchEvent(createKeyDownEvent('ArrowUp'));
            expect(component.ctrl.value).toBe(11);

            input.dispatchEvent(createKeyDownEvent('ArrowDown'));
            expect(component.ctrl.value).toBe(10);
        });
    });

    describe('With no form control', () => {
        let component: TestSimpleComponent;
        let input: HTMLInputElement;

        beforeEach(async () => {
            const setUp = await mountComponent(TestSimpleComponent);
            component = setUp.component;
            input = setUp.input;
        });

        it('should emit when the value changes', () => {
            fakeKeyDownEvent(input, '-233');
            expect(component.value).toBe(-233);
        });

        it('should emit only acceptable values', () => {
            fakeKeyDownEvent(input, '-12/4k- 4.3/2');
            expect(component.value).toBe(-1244.32);
        });
    });
});
