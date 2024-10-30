import expressAsyncHandler from "express-async-handler";
import Url from "../model/url.js";
import crypto from "crypto";

const shortenerController = {
  urlShortener: expressAsyncHandler(async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }

      const urlRegex = /^(http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(url)) {
        return res.status(400).json({ message: "Invalid URL format" });
      }

      let existingUrl = await Url.findOne({ originalUrl: url });
      if (existingUrl) {
        return res.status(200).json({
          shortUrl: `https://urlshortify.site/api/users/${existingUrl.shortCode}`,
        });
      }

      const shortCode = crypto.randomBytes(3).toString("hex");
      const newUrl = new Url({ originalUrl: url, shortCode });
      await newUrl.save();
      res
        .status(200)
        .json({ shortUrl: `https://urlshortify.site/api/users/${shortCode}` });
    } catch (error) {
      console.error(error);
    }
  }),

  redirectUrl: expressAsyncHandler(async (req, res) => {
    try {
      const { shortCode } = req.params;

      const url = await Url.findOne({ shortCode });
      if (url) {
        return res.redirect(url.originalUrl);
      } else {
        res.status(404).json({ message: "URL not found" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
};

export default shortenerController;
