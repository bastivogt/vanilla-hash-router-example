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

    getRouteByDynamicPattern(pattern) {
        const inputPatternSpitted = pattern.split("/");
        if (inputPatternSpitted.length <= 2) {
            return this.getRouteByPattern(pattern);
        }
        // start loop
        for (const route of this._routes) {
            const routePatternSpitted = route.pattern.split("/");

            if (routePatternSpitted.length === inputPatternSpitted.length) {
                if (routePatternSpitted[1] === routePatternSpitted[1]) {
                    return route;
                }
            }
            // console.log(inputPatternSpitted);
            // console.log(routePatternSpitted);
        }
        return false;
    }

    get routes() {
        return this._routes;
    }
}
