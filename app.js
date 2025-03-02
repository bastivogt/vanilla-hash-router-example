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

HashRouter.onInit = HashRouter.onHashChange = (hash) => {
    const pattern = hash.substring(1);
    if (hash === "" || hash === "#") {
        HashRouter.write("#/");
    }
    const route = routesManager.getRouteByPattern(pattern);
    if (route) {
        route.handler(route);
    } else {
        ContentLoader.load(`pages/404.html`, content);
    }
};

HashRouter.init();

const dataRoutes = document.querySelectorAll("[data-route]");
dataRoutes.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const route = routesManager.getRouteByName(e.target.dataset.route);
        HashRouter.write(route.pattern);
    });
});
