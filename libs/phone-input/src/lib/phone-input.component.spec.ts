import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZxPhoneInput } from './phone-input.component';

describe('PhoneInputComponent', () => {
    let component: ZxPhoneInput;
    let fixture: ComponentFixture<ZxPhoneInput>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ZxPhoneInput]
        }).compileComponents();

        fixture = TestBed.createComponent(ZxPhoneInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
