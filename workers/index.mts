import type { ExportedHandlerFetchHandler } from "@cloudflare/workers-types";

export default {
	fetch: async function fetch(request, env): Promise<Response> {
		return new Response("Hello world from worker!");
	} as ExportedHandlerFetchHandler,
};
