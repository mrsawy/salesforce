const fs = require("fs");

const SiteData = require(`./../models/SiteData`);

const uploadFunction = require("./../uploads_config");

module.exports = {
  getSiteData: async (req, res) => {
    const siteData = await SiteData.find();
    res.json(siteData);
  },
  setSiteData: async (req, res) => {
    let { value, identifier } = req?.body;
    const foundedData = await SiteData.findOne({ identifier });
    if (foundedData) {
      foundedData.value = value;
      foundedData.save();
      const siteData = await SiteData.find();
      return res.json(siteData);
    } else {
      let createdData = await SiteData.create({ value, identifier });
      const siteData = await SiteData.find();
      return res.json(siteData);
    }
  },
  setSiteUploads: async (req, res) => {
    const { fileName } = req.params;
    uploadFunction.single(fileName)(req, res, (err) => {
      if (err) {
        // throw new Error(err);
        return res.status(400).send("File upload failed.");
      }
      if (!req.file) {
        return res.status(400).send("No file was uploaded.");
      }
      console.log(`File ${req.file} uploaded successfully.`, req.file);

      SiteData.findOne({ identifier: fileName })
        .then((foundedData) => {
          if (foundedData) {
            const filePath = foundedData.value;
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully:", filePath);
              }
            });

            foundedData.value = req.file.path;
            return foundedData.save();
          } else {
            return SiteData.create({ value: req.file.path, identifier: fileName });
          }
        })
        .finally(() => {
          SiteData.find().then((siteData) => {
            return res.json(siteData);
          });
        })
        .catch(() => {
          console.log("error");
        });
    });
  },
  // getOneResult: async (req, res) => {},
};
