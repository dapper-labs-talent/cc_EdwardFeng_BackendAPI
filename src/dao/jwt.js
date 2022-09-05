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

export { generateJwtToken };
