import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiPropertyNameComponent } from './api-property-name.component';

describe('ApiPropertyNameComponent', () => {
    let component: ApiPropertyNameComponent;
    let fixture: ComponentFixture<ApiPropertyNameComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApiPropertyNameComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ApiPropertyNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
