class Route {
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

const routes = [
    new Route({ pattern: "/", name: "page:index" }),
    new Route({ pattern: "/about", name: "page:about" }),
    new Route({ pattern: "/contact/test/:name", name: "page:contact:detail" }),
    new Route({ pattern: "/person/:name/:age", name: "person:detail" }),
];

function getCompareablePatternTokens() {
    return routes.map((route) => {
        return route.pattern.replace(/\/:.*/g, "");
    });
}

function getDynRouteByPattern(pattern) {
    const comparePatterns = getCompareablePatternTokens();
    console.log(comparePatterns);
    const index = comparePatterns.findIndex((item) => {
        return pattern.startsWith(item) && item !== "/";
    });
    console.log(index);
    return routes[index];
}

//const route = getDynRouteByPattern("/person/detail/Ute/44");
//const route = getDynRouteByPattern("/contact/test/Seppel");
const route = getDynRouteByPattern("/about");
// const str = routes[3].pattern.replace(/\/:.*/g, "");
// console.log(str);
console.log(route);
