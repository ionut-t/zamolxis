import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NumericInputComponent } from './numeric-input.component';

describe('NumericInputComponent', () => {
    let component: NumericInputComponent;
    let fixture: ComponentFixture<NumericInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NumericInputComponent, NoopAnimationsModule]
        }).compileComponents();

        registerLocaleData(localeFr, 'fr-FR');

        fixture = TestBed.createComponent(NumericInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
