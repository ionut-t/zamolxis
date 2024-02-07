import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleContainerComponent } from './example-container.component';

describe('ExampleContainerComponent', () => {
    let component: ExampleContainerComponent;
    let fixture: ComponentFixture<ExampleContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExampleContainerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ExampleContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
