import mongoose from "mongoose";
import { db, contactSchema } from "./db.js";

const checkContactDb = () => {
  if (!db.models["Contact"]) {
    db.model("Contact", contactSchema);
  }
};

export const getContact = async (req, res) => {
  try {
    checkContactDb();

    const contactList = await db.model("Contact").find();

    res.status(200).json({
      message: "success",
      data: contactList,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    checkContactDb();

    const { id } = req.params;

    const contact = await db.model("Contact").findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "error",
        error: "Student not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const createContact = async (req, res) => {
  try {
    checkContactDb();
    // Create a new Contact document using the form data
    const newContact = await db.model("Contact").create(req.body);

    res.status(201).json({
      message: "success",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  try {
    checkContactDb();

    const updatedContact = await db.model("Contact").updateOne(
      {
        _id: id,
      },
      req.body
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: "error",
        error: "Contact not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    checkContactDb();

    const deletedContact = await db.model("Contact").findOne({ _id: id });

    if (!deletedContact) {
      return res.status(404).json({
        message: "error",
        error: "Contact not found",
      });
    }

    await db.model("Contact").deleteOne({ _id: id });

    res.status(200).json({
      message: "success",
      data: deletedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
