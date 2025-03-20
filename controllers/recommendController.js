import { createRecommendations as createRecommendationsModel } from "../models/Recommendation.js";
import { createRecommendationsByUserPreferences as createRecommendationsByUserPreferencesModel } from "../models/Recommendation.js";
import { fetchAPI } from "../models/api.js";
import { userSchema, usersSchema } from "../models/schemas/userSchema.js";

export async function createRecommendations(req, res) {
	try {
		const userPrompt = req.body.userPrompt;
		const count = req.body.count;
		if (!userPrompt || !count) {
			return res.status(400).json({ error: "Missing prompt in request body." });
		}

		// Call the Recommendation model
		const recommendations = await createRecommendationsModel(userPrompt, count);
		if (!recommendations) {
			return res.status(406).json({ message: "No recommendations found" });
		}

		res.status(200).json(recommendations);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error fetching recommendations",
			error: error.message,
		});
	}
}

export async function createRecommendationsByUserPreferences(req, res) {
	try {
		const user_id = req.params.userId; // Extract userId from the URL

		if (!user_id) {
			return res.status(400).json({ error: "Missing user_id in request body." });
		}

		//get the user
		let user = await fetchAPI(req, "users/" + user_id, "GET");
		if (Object.keys(user).length == 0) res.status(400).json({ error: "Invalid user id" });

		user = userSchema.parse(user);

		// Call the Recommendation model
		const recommendations = await createRecommendationsByUserPreferencesModel(user, req);
		if (!recommendations) {
			return res
				.status(406)
				.json({ message: "No recommendations found for the preferences of the user" });
		}

		res.status(200).json(recommendations);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error fetching recommendations",
			error: error.message,
		});
	}
}
