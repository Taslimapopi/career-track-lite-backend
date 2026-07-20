import Application from "../models/Application.js";

// @route GET /api/dashboard/stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // status অনুযায়ী group করে count বের করা — এক query-তেই সব status-এর সংখ্যা
    const statusCounts = await Application.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // aggregate result আসে [{ _id: "Applied", count: 3 }, ...] এই ফরম্যাটে
    // এটাকে { Applied: 3, Interview: 1, ... } ফরম্যাটে convert করছি যাতে frontend-এ সহজে ব্যবহার করা যায়
    const statusMap = {
      Saved: 0,
      Applied: 0,
      Assessment: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0,
    };

    statusCounts.forEach((item) => {
      statusMap[item._id] = item.count;
    });

    const total = Object.values(statusMap).reduce((sum, count) => sum + count, 0);

    const recentApplications = await Application.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      total,
      ...statusMap,
      recentApplications,
    });
  } catch (error) {
    next(error);
  }
};