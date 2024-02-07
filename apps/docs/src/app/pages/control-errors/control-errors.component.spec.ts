import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ControlErrorsComponent } from './control-errors.component';

describe('ControlErrorsComponent', () => {
    let component: ControlErrorsComponent;
    let fixture: ComponentFixture<ControlErrorsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ControlErrorsComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ControlErrorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
