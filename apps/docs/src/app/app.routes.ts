import { Route } from '@angular/router';
import { RouteLabel, RoutePath } from './core/navigation-links';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: RoutePath.ControlErrors },
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
