import Application from "../models/Application.js";

// @route POST /api/applications
export const createApplication = async (req, res, next) => {
  try {
    const { companyName, jobTitle, applicationDate } = req.body;

    if (!companyName || !jobTitle || !applicationDate) {
      res.status(400);
      throw new Error("Company name, job title and application date are required");
    }

    const application = await Application.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @route GET /api/applications
export const getApplications = async (req, res, next) => {
  try {
    const { search, status, source, sort } = req.query;

    const filter = { user: req.user.id };

    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
      ];
    }

    const sortOption = sort === "oldest" ? { applicationDate: 1 } : { applicationDate: -1 };

    const applications = await Application.find(filter).sort(sortOption);
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @route GET /api/applications/:id
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
};

// @route PATCH /api/applications/:id
export const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/applications/:id
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    res.json({ message: "Application deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};