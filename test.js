function getRouteByDynamicPattern(pattern) {
    const ROUTE_PATTERN = "/person/:name/:age";
    const inputPatternSpitted = pattern.split("/");
    // start loop
    const routePatternSpitted = ROUTE_PATTERN.split("/");

    if (routePatternSpitted.length === inputPatternSpitted.length) {
        if (routePatternSpitted[1] === routePatternSpitted[1]) {
            console.log("MATCH");
        }
    }
    console.log(inputPatternSpitted);
    console.log(routePatternSpitted);
}

getRouteByDynamicPattern("/person/Ute/44");
