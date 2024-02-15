import { Route } from '@angular/router';
import { RoutePath } from './core/navigation-links';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: RoutePath.ControlErrors },
    {
        path: RoutePath.ControlErrors,
        loadComponent: () =>
            import('./pages/control-errors/control-errors.component').then(
                c => c.ControlErrorsComponent
            ),
        title: 'Zamolxis | Control Errors'
    }
];
