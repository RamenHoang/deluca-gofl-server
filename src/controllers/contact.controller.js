const {sendMailContact} = require('./../helpers/mail');

const contact = (req, res) => {
  try {
    let data = req.body;
    sendMailContact(data.email, data);
    return res.status(200).json({ message: "Contact email sent successfully." });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res.status(500).json({ message: "An error occurred while sending the email." });
  }
}

module.exports = {
  contact
};
