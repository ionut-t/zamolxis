import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiPropertyCardComponent } from './api-property-card.component';

describe('ApiPropertyCardComponent', () => {
    let component: ApiPropertyCardComponent;
    let fixture: ComponentFixture<ApiPropertyCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApiPropertyCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ApiPropertyCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
