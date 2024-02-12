require('dotenv').config();
const express = require('express');
const User = require('../models/User'); // Import the User model
const Item = require('../models/Item'); // Import the Item model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer'); // Import multer for image upload
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000 || 3002 || 3001;
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


router.use(express.static(__dirname + '/public'));
router.use('/uploads', express.static('uploads'));



//Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user or email already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ message: 'User or email already exists' });
    }

    // Create a new user with email and default isActivated status
    user = new User({ username, password, email, isActivated: false });

    // Generate a token for email activation
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Include email in the token payload
      "your_jwt_secret",
      { expiresIn: '1h' }
    );

    // Set token and token expiry time for the user
    user.token = token;
    user.tokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Save the user to the database
    await user.save();

    const activationLink = `http://localhost:3002/activate?token=${token}`;
    console.log("auth link 1 \n" + activationLink);
    // Send activation email
    await sendActivationEmail(email, activationLink);

    // Return success message
    res.status(201).json({ message: 'User created successfully. Please activate your account.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


function sendActivationEmail(email, activationLink) {
  const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'ashleigh.hoppe@ethereal.email',
          pass: '6Q2Eb3uW8YqmaYGYF9'
      }
  });
  const mailOptions = {
    from: 'ashleigh.hoppe@ethereal.email',
    to: email,
    subject: 'Account Activation',
    text: 'Please activate your account by clicking on the link provided.\n'+activationLink
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}



// router.get('/activate', async (req, res) => {
//   try {
//     console.log("testtomg");
//     res.status(200).send("Success"); // Send a response to indicate successful handling of the request
//   } catch (error) {
//     console.error("Error handling /activate request:", error);
//     res.status(500).send("Internal Server Error"); // Send a 500 status code and an error message if an error occurs
//   }
// });

// Endpoint to handle account activation
router.get('/activate', async (req, res) => {
  const { token } = req.query;
  
  console.log("testtomg   1");
  if (!token) {
    console.log("testtomg   2");
    return res.status(400).send("No activation token provided.");
    
  }
  console.log("testtomg   3");
  jwt.verify(token, "your_jwt_secret", async (err, decoded) => {
    console.log("testtomg   4");
    if (err) {
      console.log("testtomg   5");
      return res.status(401).send("Invalid or expired link.");
    }
    console.log("testtomg   6 token : "+token);
    const { userId } = decoded;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found.");
      }

      if (user.isActivated) {
        return res.status(400).send("Account is already activated.");
      }

      // Check if token is valid and not expired
      if (user.token !== token || user.tokenExpires <= Date.now()) {
        return res.status(401).send("Invalid or expired activation token.");
      }

      // Activate the user account
      user.isActivated = true;
      user.token = null; // Clear the token after activation
      user.tokenExpires = null; // Clear the token expiry time after activation
      await user.save();
      
    } catch (updateError) {
      console.error('Activation error:', updateError);
      res.status(500).send("Failed to activate account.");
    }
  });
});


// Login User
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid User.' });
    }

    // Check if the account is activated
    if (!user.isActivated) {
      return res.status(403).json({ message: 'Account is not activated. Please check your email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },"your_jwt_secret",{ expiresIn: '1h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Add an item without image upload
router.post('/admin/add-item', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, species, availability, price, rating, numReviews } = req.body;
    
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 
    // Check for required fields
    if (!name || !description || !category || !species || !availability || !price || !rating || !numReviews) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the submitted category is valid
    if (!['pets', 'toys'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const newItem = new Item({
      name,
      description,
      category,
      species,
      availability,
      price,
      rating,
      numReviews,
      imageUrl,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error("Item addition error: ", error);
    res.status(500).json({ message: "Error occurred during item addition", error: error.message });
  }
});

// Define the route to handle file uploads using the router
router.post('/profile-upload-single', upload.single('image'), function (req, res, next) {
  // Handle the uploaded file here
  console.log(JSON.stringify(req.file));
  var response = '<a href="/">Home</a><br>';
  response += "File uploaded successfully.<br>";
  response += `<img src="${req.file.path}" /><br>`;
  return res.send(response);
});

// Register the router with your app
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


router.get('/admin/get-items', async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});
router.delete('/admin/delete-item/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

router.put('/admin/edit-item/:id', async (req, res) => {
  try {
    const { name, description, stock, price } = req.body;
    const itemId = req.params.id;

    if (!name || !description || !stock || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        description,
        stock,
        price,
      },
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to edit item' });
  }
});

const PORT = process.env.PORT || 3001 || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;
