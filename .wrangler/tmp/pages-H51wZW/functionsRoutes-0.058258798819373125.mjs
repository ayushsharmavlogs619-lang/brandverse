import { onRequestOptions as __api_leads_apps_script_js_onRequestOptions } from "C:\\Brandverse.tech HQ\\brandverse\\functions\\api\\leads\\apps-script.js"
import { onRequestPost as __api_leads_apps_script_js_onRequestPost } from "C:\\Brandverse.tech HQ\\brandverse\\functions\\api\\leads\\apps-script.js"

export const routes = [
    {
      routePath: "/api/leads/apps-script",
      mountPath: "/api/leads",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_leads_apps_script_js_onRequestOptions],
    },
  {
      routePath: "/api/leads/apps-script",
      mountPath: "/api/leads",
      method: "POST",
      middlewares: [],
      modules: [__api_leads_apps_script_js_onRequestPost],
    },
  ]