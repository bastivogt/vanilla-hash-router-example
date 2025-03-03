export class RoutesManager {
    constructor() {
        this._routes = [];
    }

    hasRoute(pattern) {
        for (const item of this._routes) {
            if (item.pattern === pattern) {
                return true;
            }
        }
        return false;
    }

    addRoute(route) {
        if (!this.hasRoute(route.pattern)) {
            this._routes.push(route);
            return true;
        }
        return false;
    }

    getMatchTokens() {
        return this._routes.map((route) => {
            return route.pattern.replace(/\/:.*/g, "");
        });
    }

    getRoute(pattern) {
        const matchTokens = this.getMatchTokens();
        const index = matchTokens.findIndex((item) => {
            console.log(item);
            if (
                item === "/" &&
                pattern.startsWith(item) &&
                pattern.length < 2
            ) {
                return true;
            }
            return pattern.startsWith(item) && item !== "/";
        });

        const routePatternSplitted = this._routes[index].pattern.split("/");
        const matchTokenSplitted = matchTokens[index].split("/");
        const patternSplitted = pattern.split("/");
        const paramsPattern = routePatternSplitted.slice(
            matchTokenSplitted.length,
            routePatternSplitted.length
        );
        const params = patternSplitted.slice(
            matchTokenSplitted.length,
            routePatternSplitted.length
        );
        const paramsObj = {};
        for (const prop in paramsPattern) {
            paramsObj[paramsPattern[prop].slice(1)] = params[prop];
        }

        return {
            route: this._routes[index],
            matchToken: matchTokens[index],
            params: paramsObj,
        };
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
