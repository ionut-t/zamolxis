import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumericInputPropertiesComponent } from './numeric-input-properties.component';

describe('NumericInputPropertiesComponent', () => {
    let component: NumericInputPropertiesComponent;
    let fixture: ComponentFixture<NumericInputPropertiesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NumericInputPropertiesComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NumericInputPropertiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
