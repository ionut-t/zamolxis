import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ControlErrorsPropertiesComponent } from './control-errors-properties.component';

describe('ControlErrorsPropertiesComponent', () => {
    let component: ControlErrorsPropertiesComponent;
    let fixture: ComponentFixture<ControlErrorsPropertiesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ControlErrorsPropertiesComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ControlErrorsPropertiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
