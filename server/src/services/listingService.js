import prisma from "../config/prisma.js";

export const getAllListings = async () => {
  return await prisma.account.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      // include seller info so client can check seller.role (e.g. ADMIN)
      seller: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      // include images so client can display the first image
      images: true
    }
  });
};

export const getListing = async (id) => {
  return await prisma.account.findUnique({
    where: { id },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      images: true
    }
  });
};

export const createListing = async (data) => {
  return await prisma.account.create({
    data
  });
};

export const updateListing = async (id, data) => {
  return await prisma.account.update({
    where: { id },
    data
  });
};

export const deleteListing = async (id) => {
  return await prisma.account.delete({
    where: { id }
  });
};
