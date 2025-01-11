import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure that usernames are unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure that emails are unique
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic regex for email validation
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "", // Default empty string for image
    },
    searchHistory: {
      type: [String], // Enforcing array of strings for search history
      default: [],
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the User model
export const User = mongoose.model("User", userSchema);
