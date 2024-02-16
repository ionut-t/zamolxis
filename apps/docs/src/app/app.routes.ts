import { Route } from '@angular/router';
import { RouteLabel, RoutePath } from './core/navigation-links';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home.component').then(c => c.HomeComponent),
        title: 'Zamolxis'
    },
    {
        path: RoutePath.ControlErrors,
        loadComponent: () =>
            import('./pages/control-errors/control-errors.component').then(
                c => c.ControlErrorsComponent
            ),
        title: `Zamolxis | ${RouteLabel.ControlErrors}`
    },
    {
        path: RoutePath.NumericInput,
        loadComponent: () =>
            import('./pages/numeric-input/numeric-input.component').then(
                c => c.NumericInputComponent
            ),
        title: `Zamolxis | ${RouteLabel.NumericInput}`
    }
];
