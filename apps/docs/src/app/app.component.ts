import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './core/sidebar/sidebar.component';

@Component({
    standalone: true,
    imports: [RouterModule, SidebarComponent],
    selector: 'docs-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {}
