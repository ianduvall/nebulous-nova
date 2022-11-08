import type { APIRoute, APIContext } from "astro";
import { incrementCounter } from "../../../server/counters";

export const post: APIRoute = async ({ params, request }: APIContext) => {
	const value = await incrementCounter(
		request,
		params.counterId ? params.counterId + "" : ""
	);

	return new Response(JSON.stringify({ data: { counter: value } }), {
		headers: {
			"content-type": "application/json",
		},
	});
};
