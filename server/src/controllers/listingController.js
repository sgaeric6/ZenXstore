import prisma from "../config/prisma.js";

export const getListings = async (req, res) => {

  const listings = await prisma.account.findMany();

  res.json({
    success: true,
    listings
  });

};

export const createListing = async (req, res) => {

  res.json({
    success: true,
    message: "Listing created."
  });

};

export const updateListing = async (req, res) => {

  res.json({
    success: true,
    message: "Listing updated."
  });

};

export const deleteListing = async (req, res) => {

  res.json({
    success: true,
    message: "Listing deleted."
  });

};
