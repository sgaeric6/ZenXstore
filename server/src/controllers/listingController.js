import * as listingService from "../services/listingService.js";
import prisma from "../config/prisma.js";

export const getListings = async (req, res) => {
  const listings = await listingService.getAllListings();

  res.json({
    success: true,
    listings
  });
};

export const getListing = async (req, res) => {
  const listing = await listingService.getListing(req.params.id);

  if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

  res.json({
    success: true,
    listing
  });
};

export const createListing = async (req, res) => {
  try {
    // Accept multipart files (req.files) or JSON body fields
    const body = req.body || {};
    const files = req.files || [];

    // Build images array from uploaded files (if any)
    const images = (files || []).map((f) => {
      // store relative path for client consumption
      return `/uploads/${f.filename}`;
    });

    // Ensure required fields
    const data = {
      title: body.title || "Untitled account",
      description: body.description || "",
      price: body.price ? Number(body.price) : 0,
      level: body.level ? Number(body.level) : 1,
      rank: body.rank || "",
      region: body.region || "",
      diamonds: body.diamonds ? Number(body.diamonds) : 0,
      images: images.length ? images : (body.images ? JSON.parse(body.images) : []),
      loginMethod: body.loginMethod || "",
      sellerId: body.sellerId || null
    };

    // If sellerId not provided, create/find a system seller account
    let sellerId = data.sellerId;
    if (!sellerId) {
      const systemEmail = process.env.SYSTEM_SELLER_EMAIL || "system@zenxstore.local";
      let seller = await prisma.user.findUnique({ where: { email: systemEmail } });
      if (!seller) {
        // create a system seller with a random password placeholder
        seller = await prisma.user.create({
          data: {
            name: "ZenXStore",
            email: systemEmail,
            password: Math.random().toString(36).slice(2),
            username: "system_seller",
            verified: true,
            role: "ADMIN"
          }
        });
      }
      sellerId = seller.id;
    }

    const createData = {
      title: data.title,
      description: data.description,
      price: data.price,
      level: data.level,
      rank: data.rank,
      region: data.region,
      diamonds: data.diamonds,
      loginMethod: data.loginMethod,
      images: data.images,
      sellerId: sellerId
    };

    const listing = await listingService.createListing(createData);

    res.status(201).json({ success: true, listing });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create listing" });
  }
};

export const updateListing = async (req, res) => {
  const listing = await listingService.updateListing(req.params.id, req.body);

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
