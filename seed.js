const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Meditation = require("./models/Meditation");
const Breathing = require("./models/Breathing");

const meditations = [
  { title: "Deep Breathing", description: "Calm your mind by focusing on your breath", durationMinutes: 5, category: "relaxation" },
  { title: "Body Scan", description: "Relax each part of your body slowly", durationMinutes: 10, category: "relaxation" },
  { title: "Morning Gratitude", description: "Start your day with a thankful mind", durationMinutes: 7, category: "gratitude" },
  { title: "Sleep Wind Down", description: "Prepare your mind for a good night's sleep", durationMinutes: 15, category: "sleep" },
];

const breathings = [
  { name: "Box Breathing", description: "Equal breathing to reduce stress", inhaleSeconds: 4, holdSeconds: 4, exhaleSeconds: 4, durationMinutes: 5 },
  { name: "4-7-8 Breathing", description: "Helps you relax and fall asleep", inhaleSeconds: 4, holdSeconds: 7, exhaleSeconds: 8, durationMinutes: 5 },
  { name: "Deep Belly Breathing", description: "Slow breathing to calm anxiety", inhaleSeconds: 5, holdSeconds: 0, exhaleSeconds: 5, durationMinutes: 3 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Meditation.deleteMany();
    await Breathing.deleteMany();
    await Meditation.insertMany(meditations);
    await Breathing.insertMany(breathings);
    console.log("Sample data added");
    process.exit(0);
  } catch (error) {
    console.log("Seed failed: " + error.message);
    process.exit(1);
  }
};

seed();
