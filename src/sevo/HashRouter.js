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

    static write(str) {
        window.location.hash = str;
    }
}
