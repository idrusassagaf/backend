import Orangtua from "../model/orangtua.js";
import Santri from "../model/Santri.js";

// =============================
// GET Semua Data Orangtua
// =============================
export const getOrangtua = async (req, res) => {
  try {
    const data = await Orangtua.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// CREATE Orangtua
// =============================
export const createOrangtua = async (req, res) => {
  try {
    const orangtua = new Orangtua(req.body);
    await orangtua.save();
    res.status(201).json(orangtua);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// UPDATE Orangtua
// =============================
export const updateOrangtua = async (req, res) => {
  try {
    const updated = await Orangtua.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// DELETE Orangtua
// =============================
export const deleteOrangtua = async (req, res) => {
  try {
    await Orangtua.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
