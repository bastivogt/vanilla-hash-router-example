import { DOM } from "./src/sevo/helper.js";
import { Route } from "./src/sevo/Route.js";
import { RoutesManager } from "./src/sevo/RoutesManager.js";
import { HashRouter } from "./src/sevo/HashRouter.js";
import { ContentLoader } from "./src/sevo/helper.js";

const content = DOM.getElement("#content");

function route_handler(route) {
    const filename = route.name.split(":")[1] + ".html";
    console.log("route_handler: ", route, filename);
    ContentLoader.load(`pages/${filename}`, content);
}

function person_detail(route, name, age) {
    ContentLoader.load(`pages/person.html`, content);
    console.log("person_detail", route, name, age);
}

const routesManager = new RoutesManager();
routesManager.addRoute(
    new Route({ pattern: "/", name: "page:index", handler: route_handler })
);
routesManager.addRoute(
    new Route({
        pattern: "/about",
        name: "page:about",
        handler: route_handler,
    })
);
routesManager.addRoute(
    new Route({
        pattern: "/contact",
        name: "page:contact",
        handler: route_handler,
    })
);
routesManager.addRoute(
    new Route({
        pattern: "/person/:name/:age",
        name: "person:detail",
        handler: person_detail,
    })
);

HashRouter.onInit = HashRouter.onHashChange = (hash) => {
    const inputPattern = hash.substring(1);
    const inputPatternSpitted = inputPattern.substring(1).split("/");
    console.log(
        "HashRouter onInit/Change inputPatternSpitted: ",
        inputPatternSpitted
    );
    if (hash === "" || hash === "#") {
        HashRouter.write("#/");
    }
    const route = routesManager.getRouteByDynamicPattern(inputPattern);
    const params = inputPatternSpitted.slice(1);
    if (route) {
        route.handler(route, ...params);
    } else {
        ContentLoader.load(`pages/404.html`, content);
    }
};

HashRouter.init();

const dataRoutes = document.querySelectorAll("[data-route]");
dataRoutes.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const dataRoute = e.target.dataset.route;
        const route = routesManager.getRoute(dataRoute);

        if (route) {
            HashRouter.write(dataRoute);
        }
    });
});
