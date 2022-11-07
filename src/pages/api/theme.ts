import type { APIRoute, APIContext } from "astro";

export const post: APIRoute = async ({
	request,
	redirect,
	cookies,
}: APIContext) => {
	const contentType = request.headers.get("content-type");
	const referer = request.headers.get("referer");
	if (contentType !== "application/x-www-form-urlencoded" || !referer) {
		return new Response(null, { status: 400, statusText: "Bad Request" });
	}

	const formData = await request.formData();
	const theme = String(formData.get("theme"));

	const cookiePath = "/";
	if (theme) {
		cookies.set("theme", theme, {
			maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
			path: cookiePath,
			sameSite: "strict",
			secure: true,
			httpOnly: true,
		});
	} else {
		cookies.delete("theme", { path: cookiePath });
	}

	return redirect(referer);
};
