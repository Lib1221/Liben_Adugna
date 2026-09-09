import { useEffect, useState } from "react";
import { parsePath, pathForLegacyHash, routeMeta, SITE, ogImageUrl } from "./site";
import type { Route } from "./site";

const ROUTE_EVENT = "liben:navigate";

/** Push a new path and notify every useRoute() subscriber. Works outside React too. */
export const navigate = (path: string, options: { replace?: boolean } = {}) => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === path && !options.replace) return;
  const method = options.replace ? "replaceState" : "pushState";
  window.history[method](null, "", path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
};

const currentRoute = (): Route => {
  if (typeof window === "undefined") return { kind: "home" };
  const legacy = pathForLegacyHash(window.location.hash);
  if (legacy && window.location.pathname === "/") {
    window.history.replaceState(null, "", legacy);
  }
  return parsePath(window.location.pathname);
};

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
};

/** Keep the document head in sync with the route for humans; crawlers get the prerendered head. */
const applyHead = (route: Route) => {
  const meta = routeMeta(route);
  const url = `${SITE.origin}${meta.path === "/" ? "/" : meta.path}`;
  document.title = meta.title;
  setMeta('meta[name="description"]', "content", meta.description);
  setMeta('link[rel="canonical"]', "href", url);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:image"]', "content", ogImageUrl(meta));
  setMeta('meta[name="twitter:title"]', "content", meta.title);
  setMeta('meta[name="twitter:description"]', "content", meta.description);
  setMeta('meta[name="twitter:image"]', "content", ogImageUrl(meta));
  const robots = document.head.querySelector<HTMLElement>('meta[name="robots"]');
  if (robots) robots.setAttribute("content", meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");
};

export const useRoute = (): Route => {
  const [route, setRoute] = useState<Route>(currentRoute);

  useEffect(() => {
    const update = () => setRoute(currentRoute());
    window.addEventListener("popstate", update);
    window.addEventListener(ROUTE_EVENT, update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(ROUTE_EVENT, update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  useEffect(() => {
    applyHead(route);
  }, [route]);

  return route;
};
