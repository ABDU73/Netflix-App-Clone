import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


// Serve static files (in production)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend", "dist")));
	
	// Catch-all for SPA routes in production
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
  } else {
	// You can add any development-specific code here if needed (like enabling hot reload, etc.)
  }
  
  // Route for serving dynamic content (like title)
  app.get("/", (req, res) => {
	// Define the dynamic title for the page
	const dynamicTitle = "Netflix-Clone-Edition"; // Modify based on your needs
  
	// Read the index.html file
	fs.readFile(path.join(__dirname, "frontend", "dist", "index.html"), "utf8", (err, data) => {
	  if (err) {
		return res.status(500).send("Error reading index.html");
	  }
  
	  // Modify the title in the HTML content dynamically
	  const modifiedHtml = data.replace(
		/<title>(.*?)<\/title>/, // Regex to find the <title> tag
		`<title>${dynamicTitle}</title>` // Replace with the dynamic title
	  );
  
	  // Send the modified HTML back to the client
	  res.send(modifiedHtml);
	});
  });

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
