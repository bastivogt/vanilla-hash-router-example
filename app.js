import { DOM } from "./src/sevo/helper.js";
import { Route } from "./src/sevo/Route.js";
import { RoutesManager } from "./src/sevo/RoutesManager.js";
import { HashRouter } from "./src/sevo/HashRouter.js";
import { ContentLoader } from "./src/sevo/helper.js";

const content = DOM.getElement("#content");

function route_handler(route) {
    console.log("routeHandler, route: ", route);
}

function person_detail(route) {
    //ContentLoader.load(`pages/person.html`, content);
    console.log("person_detail", route);
}

const routesManager = new RoutesManager();
routesManager.addRoute(new Route({ pattern: "/", handler: route_handler }));
routesManager.addRoute(
    new Route({
        pattern: "/about",
        handler: route_handler,
    })
);
routesManager.addRoute(
    new Route({
        pattern: "/contact",
        handler: route_handler,
    })
);
routesManager.addRoute(
    new Route({
        pattern: "/person/detail/:name/:age",
        handler: person_detail,
    })
);

HashRouter.onInit = HashRouter.onHashChange = (hash) => {
    const inputPattern = hash.substring(1);
    console.log(inputPattern);

    if (hash === "" || hash === "#") {
        HashRouter.write("#/");
    }
    const route = routesManager.getRoute(inputPattern);
    if (route) {
        route.route.handler(route);
    } else {
        //ContentLoader.load(`pages/404.html`, content);
        console.log("404");
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
