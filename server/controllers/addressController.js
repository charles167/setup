import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
      const { 
        firstName, lastName, email, street, city, state, zipcode, country, phone 
      } = req.body;
  
      // Check if all required fields are provided
      if (!firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }
  
      const userId = req.userId;  // Use the user ID from the auth middleware
  
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User ID missing from token' });
      }
  
      await Address.create({
        firstName, lastName, email, street, city, state, zipcode, country, phone, userId
      });
  
      res.json({ success: true, message: "Address added successfully" });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
// Get Address: /api/address/get
export const getAddress = async (req, res) => {
  try {
      // Access userId from req.userId (set by authUser middleware)
      const { userId } = req; // Use req.userId directly

      if (!userId) {
          return res.status(401).json({ success: false, message: 'User ID missing' });
      }

      // Find address by userId
      const address = await Address.find({ userId });

      // Return the address data
      res.json({ success: true, address });
  } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
  }
};
