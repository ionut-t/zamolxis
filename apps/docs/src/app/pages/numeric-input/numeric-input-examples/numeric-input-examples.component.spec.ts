import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NumericInputExamplesComponent } from './numeric-input-examples.component';

describe('NumericInputExamplesComponent', () => {
    let component: NumericInputExamplesComponent;
    let fixture: ComponentFixture<NumericInputExamplesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NumericInputExamplesComponent, NoopAnimationsModule]
        }).compileComponents();

        registerLocaleData(localeFr, 'fr-FR');
        fixture = TestBed.createComponent(NumericInputExamplesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
