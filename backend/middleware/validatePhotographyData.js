import { body, validationResult } from "express-validator";

const validatePhotographyData = [
  body("userId").notEmpty().withMessage("User ID is required."),
  body("photography").isNumeric().withMessage("Photography must be a number."),
  body("videography").isNumeric().withMessage("Videography must be a number."),
  body("clipConstruction").isNumeric().withMessage("Clip Construction must be a number."),
  body("physicalAlbum").isBoolean().withMessage("Physical Album must be a boolean."),
  body("giftImageSize").isNumeric().withMessage("Gift Image Size must be a number."),
];

export default validatePhotographyData;
