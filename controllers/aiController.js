// @route POST /api/ai/analyze
export const analyzeJobMatch = async (req, res, next) => {
  try {
    const { jobDescription, mySkills } = req.body;

    if (!jobDescription || !mySkills) {
      res.status(400);
      throw new Error("Job description and your skills are required");
    }

    const prompt = `You are a career assistant. Compare the candidate's skills against the job description below.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S SKILLS:
${mySkills}

Respond with ONLY valid JSON, no markdown formatting, no code fences, in exactly this shape:
{
  "matchPercentage": <number 0-100>,
  "requiredSkills": ["skill1", "skill2", ...],
  "matchedSkills": ["skill from candidate that matches"],
  "missingSkills": ["skill required but candidate doesn't have"],
  "recommendation": "Apply" | "Apply with prep" | "Skip",
  "reasoning": "1-2 sentence explanation"
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      res.status(502);
      throw new Error("AI service is currently unavailable");
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Gemini মাঝে মাঝে ```json কোড ফেন্স দিয়ে wrap করে দেয়, সেটা সরিয়ে ফেলছি
    const cleanText = rawText.replace(/```json|```/g, "").trim();

    let result;
    try {
      result = JSON.parse(cleanText);
    } catch {
      res.status(502);
      throw new Error("Could not parse AI response");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};