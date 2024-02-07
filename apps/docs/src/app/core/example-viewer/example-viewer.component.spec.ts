import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleViewerComponent } from './example-viewer.component';

describe('ExampleViewerComponent', () => {
    let component: ExampleViewerComponent;
    let fixture: ComponentFixture<ExampleViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExampleViewerComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ExampleViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
