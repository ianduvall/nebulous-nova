import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

/**
 * @type {import('astro').AstroUserConfig}
 */
export default defineConfig({
	output: "server",
	adapter: cloudflare(),
});
