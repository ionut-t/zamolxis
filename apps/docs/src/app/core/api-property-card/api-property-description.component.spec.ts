import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiPropertyDescriptionComponent } from './api-property-description.component';

describe('ApiPropertyDescriptionComponent', () => {
    let component: ApiPropertyDescriptionComponent;
    let fixture: ComponentFixture<ApiPropertyDescriptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApiPropertyDescriptionComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ApiPropertyDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
