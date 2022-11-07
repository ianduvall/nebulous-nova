import type { APIRoute, APIContext } from "astro";

export const get: APIRoute = async ({ params }: APIContext) => {
	const res = await fetch(
		`https://rickandmortyapi.com/api/character/${params.characterId}`
	);
	const data = await res.json();
	const info = JSON.stringify(data, null, 2);

	return new Response(info);
};
