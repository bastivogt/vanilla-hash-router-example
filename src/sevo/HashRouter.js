import { Route } from "./Route.js";

export class HashRouter {
    static onHashChange = () => {};
    static onInit = () => {};

    static init() {
        this.onInit(window.location.hash);
        window.addEventListener("hashchange", (e) => {
            const hash = e.target.location.hash;
            this.onHashChange(hash);
        });
    }
    static read() {
        const hash = window.location.hash;
        return hash;
    }

    static write(str, params = null) {
        const path = str;
        if (params) {
            for (const prop in params) {
                path = path.replaceAll(`:${prop}`, params[prop]);
            }
        }
        window.location.hash = path;
    }
}
