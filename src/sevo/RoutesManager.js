export class RoutesManager {
    constructor() {
        this._routes = [];
    }

    hasRoute(route) {
        for (const item of this._routes) {
            if (item.compare(route)) {
                return true;
            }
        }
        return false;
    }

    addRoute(route) {
        if (!this.hasRoute(route)) {
            this._routes.push(route);
            return true;
        }
        return false;
    }

    getRouteByName(name) {
        for (const route of this._routes) {
            if (route.name === name) {
                return route;
            }
        }
        return false;
    }

    getRouteByPattern(pattern) {
        for (const route of this._routes) {
            if (route.pattern === pattern) {
                return route;
            }
        }
        return false;
    }
}
