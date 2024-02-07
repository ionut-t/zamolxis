import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ZxControlErrorMessage } from './control-error-message.component';

describe('ZxControlErrorMessage', () => {
    let component: ZxControlErrorMessage;
    let fixture: ComponentFixture<ZxControlErrorMessage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ZxControlErrorMessage, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ZxControlErrorMessage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
