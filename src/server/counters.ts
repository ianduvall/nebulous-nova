import { getRuntime, type PagesRuntime } from "@astrojs/cloudflare/runtime";

const getCountersKV = async (request: Request) => {
	const runtime = getRuntime(request) as PagesRuntime<
		{
			COUNTERS: KVNamespace<string>;
		},
		{}
	>;
	return runtime.env.COUNTERS;
};

export const getCounter = async (request: Request, counterId: string) => {
	if (!counterId) {
		throw new Error("Counter ID is required");
	}
	const COUNTERS = await getCountersKV(request);

	return Number((await COUNTERS.get(counterId)) || 0);
};

export const setCounter = async (
	request: Request,
	counterId: string,
	value: number
) => {
	if (!counterId) {
		throw new Error("Counter ID is required");
	}
	const COUNTERS = await getCountersKV(request);

	await COUNTERS.put(counterId, `${value}`);
};

export const incrementCounter = async (request: Request, counterId: string) => {
	const counter = await getCounter(request, counterId);
	const next = counter + 1;
	await setCounter(request, counterId, next);
	return next;
};
