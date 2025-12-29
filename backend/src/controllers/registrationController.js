import Registration from "../models/Registration.js";

export const registerForEvent = async (req, res) => {
  const registration = await Registration.create({
    ...req.body,
    user: req.user._id
  });
  res.status(201).json(registration);
};
export const getUserRegistrations = async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id }).populate(
    "event"
  );
  res.json(registrations);
}