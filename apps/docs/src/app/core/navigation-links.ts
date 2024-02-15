export type NavigationLink = {
    path: string;
    label: string;
};

export const RoutePath = {
    ControlErrors: 'control-errors',
    NumericInput: 'numeric-input'
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export const RouteLabel = {
    ControlErrors: 'Control Errors',
    NumericInput: 'Numeric Input'
} as const;

export type RouteLabel = (typeof RouteLabel)[keyof typeof RouteLabel];

export const NAVIGATION_LINKS: NavigationLink[] = [
    { path: RoutePath.ControlErrors, label: RouteLabel.ControlErrors },
    { path: RoutePath.NumericInput, label: RouteLabel.NumericInput }
].sort((a, b) => a.label.localeCompare(b.label));
