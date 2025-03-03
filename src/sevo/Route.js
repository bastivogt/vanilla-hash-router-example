export class Route {
    constructor({ pattern = null, handler = null }) {
        this.pattern = pattern;
        this.handler = handler;
    }

    compare(route) {
        if (route.pattern === this.pattern) {
            return true;
        }
        return false;
    }
}
