import prisma from "../config/prisma.js";

export const getAllListings = async () => {
  return await prisma.account.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getListing = async (id) => {
  return await prisma.account.findUnique({
    where: { id }
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
