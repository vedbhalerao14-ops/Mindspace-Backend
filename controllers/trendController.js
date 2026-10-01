const Mood = require("../models/Mood");
const Journal = require("../models/Journal");
const Gratitude = require("../models/Gratitude");
const Goal = require("../models/Goal");

const average = (list) => {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, m) => sum + m.score, 0);
  return Math.round((total / list.length) * 10) / 10;
};

const getTrendLabel = (moods) => {
  if (moods.length < 2) return "Not enough data";
  const half = Math.floor(moods.length / 2);
  const before = average(moods.slice(0, half));
  const after = average(moods.slice(half));
  if (after - before > 0.5) return "Improving";
  if (before - after > 0.5) return "Declining";
  return "Stable";
};

const getMoodsSince = (userId, days) => {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return Mood.find({ user: userId, createdAt: { $gte: since } }).sort({ createdAt: 1 });
};

exports.getOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    const moods = await Mood.find({ user: userId });
    const journalCount = await Journal.countDocuments({ user: userId });
    const gratitudeCount = await Gratitude.countDocuments({ user: userId });
    const goalCount = await Goal.countDocuments({ user: userId });
    const goalsCompleted = await Goal.countDocuments({ user: userId, status: "completed" });

    res.json({
      moodEntries: moods.length,
      averageMood: average(moods),
      journalEntries: journalCount,
      gratitudeEntries: gratitudeCount,
      totalGoals: goalCount,
      goalsCompleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMoodTrend = async (req, res) => {
  try {
    const days = Number(req.query.days) || 14;
    const moods = await getMoodsSince(req.user._id, days);

    const byDay = {};
    moods.forEach((m) => {
      const day = m.createdAt.toISOString().split("T")[0];
      if (!byDay[day]) byDay[day] = [];
      byDay[day].push(m);
    });

    const data = Object.keys(byDay).map((day) => ({
      date: day,
      averageScore: average(byDay[day]),
    }));

    res.json({
      days,
      entries: moods.length,
      averageScore: average(moods),
      trend: getTrendLabel(moods),
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const moods = await getMoodsSince(userId, 14);
    const gratitudeCount = await Gratitude.countDocuments({ user: userId });
    const goals = await Goal.find({ user: userId, status: "active" });
    const insights = [];

    if (moods.length === 0) {
      insights.push("Log your mood to start seeing insights.");
    } else {
      const avg = average(moods);
      const trend = getTrendLabel(moods);

      insights.push("Your average mood over the last 14 days is " + avg + " out of 10.");

      if (trend === "Improving") insights.push("Great news! Your mood is improving.");
      if (trend === "Declining") insights.push("Your mood has been dropping. Try a breathing exercise or meditation.");
      if (avg <= 4) insights.push("You seem to be having a hard time. Consider talking to someone you trust.");

      const counts = {};
      moods.forEach((m) => {
        counts[m.mood] = (counts[m.mood] || 0) + 1;
      });
      const common = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
      insights.push('Your most common mood is "' + common + '".');
    }

    if (gratitudeCount === 0) {
      insights.push("Try writing one thing you are grateful for today.");
    } else {
      insights.push("You have written " + gratitudeCount + " gratitude entries. Keep going!");
    }

    if (goals.length > 0) {
      insights.push("You have " + goals.length + " active goal(s). Keep updating your progress.");
    }

    res.json({ insights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
