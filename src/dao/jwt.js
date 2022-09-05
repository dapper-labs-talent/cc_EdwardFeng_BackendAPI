"use strict";

import jwt from "jsonwebtoken";

const generateJwtToken = ({ userId, email }) =>
  jwt.sign(
    {
      userId: userId,
      userType: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_HOURS, // expires in 24 hours
    }
  );

const verifyJwtToken = ({ token }) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      return resolve({ decoded, err });
    });
  });

export { generateJwtToken, verifyJwtToken };
