import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'control-errors' },
    {
        path: 'control-errors',
        loadComponent: () =>
            import('./pages/control-errors/control-errors.component').then(
                c => c.ControlErrorsComponent
            ),
        title: 'Zamolxis | Control Errors'
    }
];
