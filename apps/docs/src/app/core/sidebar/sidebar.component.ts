import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Layout } from '../layout';
import { NAVIGATION_LINKS } from '../navigation-links';

@Component({
    selector: 'docs-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        RouterLink,
        RouterLinkActive
    ]
})
export class SidebarComponent {
    readonly navigationLinks = NAVIGATION_LINKS;

    readonly isHandset$: Observable<boolean> = inject(Layout).isHandset$;
    readonly title = inject(Title).getTitle().split(' | ')[1];
}
