import { z } from "zod";

import { Mutex } from "async-mutex";
const mutex = new Mutex();

function getUrlAPI(req, path) {
	// Stitch the URL together to get the result "http://localhost:3000/api/users"
	return req.protocol + "://" + req.headers.host + "/api/" + path;
}

export async function fetchAPI(req, path, method, body = undefined) {
	// General use API

	return await mutex.runExclusive(async () => {
		const url = getUrlAPI(req, path);
		console.log("Fetching URL:", url);
	
		try {
			const response = await fetch(url, {
				method: method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
	
			console.log("Response status:", response.status);
			return await response.json();
		} catch (error) {
			console.error("Fetch error:", error);
			throw error;  // Re-throw to see the original error
		}
	});
	
}

export async function getOrCreateFromAPI(req, path, schema, def, key) {
	// return a value if such key is the same as value, otherwise create new one

	// Fetch all of the users
	const schemas = z.array(schema);
	let infos = schemas.parse(await fetchAPI(req, path, "GET"));

	// Loop though to see if one already have the same value from default
	for (let i = 0; i < infos.length; i++) {
		let info = infos[i];
		if (info[key] == def[key]) return info;
	}

	// Info does not exist create new one
	let info = schema.parse(def);
	return await fetchAPI(req, path, "POST", info);
}
