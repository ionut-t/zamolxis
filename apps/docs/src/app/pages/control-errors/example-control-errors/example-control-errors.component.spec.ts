import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleControlErrorsComponent } from './example-control-errors.component';

describe('ExampleControlErrorsComponent', () => {
    let component: ExampleControlErrorsComponent;
    let fixture: ComponentFixture<ExampleControlErrorsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExampleControlErrorsComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ExampleControlErrorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
