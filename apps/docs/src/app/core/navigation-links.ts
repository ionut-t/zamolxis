export type NavigationLink = {
    path: string;
    label: string;
};

export const RoutePath = {
    ControlErrors: 'control-errors'
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export const NAVIGATION_LINKS: NavigationLink[] = [
    { path: RoutePath.ControlErrors, label: 'Control Errors' }
].sort((a, b) => a.label.localeCompare(b.label));
