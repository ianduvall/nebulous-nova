const errorHandler: PagesFunction = async ({ next }) => {
	try {
		return await next();
	} catch (err) {
		return new Response(`${err.message}\n${err.stack}`, { status: 500 });
	}
};

const hello: PagesFunction = async ({ next }) => {
	const response = await next();
	response.headers.set("x-hello", "Hello from Middleware!");
	return response;
};

export const onRequest = [errorHandler, hello];
