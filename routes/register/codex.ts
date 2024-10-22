import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async POST(req, _ctx) {
        const headers = new Headers();
        headers.set("location", "")
        const form = await req.formData();
        const email = form.get('email')?.toString();
        const password = form.get('password')?.toString();



        return new Response(null, { status: 300, headers });
    }
}