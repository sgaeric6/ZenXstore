import * as listingService from "../services/listingService.js";

export const getListings = async (req, res) => {
  const listings = await listingService.getAllListings();

  res.json({
    success: true,
    listings
  });
};

export const getListing = async (req, res) => {
  const listing = await listingService.getListing(req.params.id);

  res.json({
    success: true,
    listing
  });
};

export const createListing = async (req, res) => {
  const listing = await listingService.createListing(req.body);

  res.status(201).json({
    success: true,
    listing
  });
};

export const updateListing = async (req, res) => {
  const listing = await listingService.updateListing(
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    listing
  });
};

export const deleteListing = async (req, res) => {
  await listingService.deleteListing(req.params.id);

  res.json({
    success: true,
    message: "Listing deleted successfully."
  });
};
