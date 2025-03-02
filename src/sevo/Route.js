export class Route {
    constructor({ pattern = null, name = null, handler = null }) {
        this.pattern = pattern;
        this.name = name;
        this.handler = handler;
    }

    compare(route) {
        if (route.name === this.name && route.pattern === this.pattern) {
            return true;
        }
        return false;
    }
}
