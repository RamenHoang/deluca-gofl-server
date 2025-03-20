require("dotenv").config();
const PaymentSchema = require("./../models/payment.model");
const { cloudinary } = require("./../utils/cloudinary");
const ImageSchema = require("./../models/image.model");
const formatBufferToBase64 = require("./../utils/formatBufferToBase64");

const getPaymentInfo = async (req, res) => {
  try {
    const payment = await PaymentSchema.find({}).populate("qrCode");
    return res.status(200).json({ message: "SUCCESS", payment: payment ? payment[0] : null });
  } catch (error) {
    return res.status(500).json(error);
  }
}

const updatePaymentInfo = async (req, res) => {
  try {
    let payment = await PaymentSchema.findOne();
    if (!payment) {
      payment = new PaymentSchema(req.body);
      await payment.save();
      return res.status(200).json({ message: "SUCCESS", payment });
    }
    payment.qrCode = req.body.qrCode;
    await payment.save();
    return res.status(200).json({ message: "SUCCESS", payment });
  } catch (error) {
    return res.status(500).json(error);
  }
}

const uploadQRCode = async (req, res) => {
  try {
    let image = req.file;
    const uploadedResponse = await cloudinary.uploader.upload(
      formatBufferToBase64(image).content,
      { upload_preset: process.env.UPLOAD_PRESET }
    );
    const uploadedImage = new ImageSchema({
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.secure_url,
    });
    await uploadedImage.save();

    return res.status(200).json({ message: 'SUCCESS', image: uploadedImage });
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  getPaymentInfo,
  updatePaymentInfo,
  uploadQRCode,
};
