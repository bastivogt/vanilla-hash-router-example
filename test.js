class Route {
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

const routes = [
    new Route({ pattern: "/" }),
    new Route({ pattern: "/about" }),
    new Route({ pattern: "/contact/test/:name" }),
    new Route({ pattern: "/person/:name/:age" }),
];

function getMatchTokens() {
    return routes.map((route) => {
        return route.pattern.replace(/\/:.*/g, "");
    });
}

function getRoute(pattern) {
    const matchTokens = getMatchTokens();
    console.log(matchTokens);
    const index = matchTokens.findIndex((item) => {
        console.log(item);
        if (item === "/" && pattern.startsWith(item) && pattern.length < 2) {
            return true;
        }
        return pattern.startsWith(item) && item !== "/";
    });
    // let index = -1;
    // for (let i = 0; i < matchTokens.length; i++) {
    //     if (pattern === "/") {
    //         console.log(matchTokens[i]);
    //         break;
    //     }
    //     if (pattern.startsWith(matchTokens[i])) {
    //         console.log(matchTokens[i]);
    //     }
    // }

    console.log(index);
    const routePatternSplitted = routes[index].pattern.split("/");
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
    console.log(
        "rs, ms, pp, p",
        routePatternSplitted,
        matchTokenSplitted,
        paramsPattern,
        params
    );
    return {
        route: routes[index],
        matchToken: matchTokens[index],
        params: paramsObj,
    };
}

//const route = getRoute("/");
const route = getRoute("/person/Ute/44");
//const route = getRoute("/contact/test/Seppel");
//const route = getRoute("/about");
// const str = routes[3].pattern.replace(/\/:.*/g, "");
// console.log(str);
console.log(route);
