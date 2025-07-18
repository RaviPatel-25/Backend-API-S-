const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Sample value arrays
const randomValues = {
  gender: ["Male", "Female", "Other"],
  country: ["India", "USA", "UK", "Germany", "Japan"],
  city: ["Mumbai", "New York", "London", "Berlin", "Tokyo"],
  job: ["Engineer", "Doctor", "Designer", "Manager", "Writer"],
  education: ["High School", "Bachelor", "Master", "PhD"],
  status: ["active", "inactive"],
  language: ["English", "Hindi", "Spanish", "German", "Japanese"],
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  department: ["HR", "Finance", "IT", "Marketing", "Sales"],
  device: ["iPhone", "Android", "Desktop", "Tablet"],
  os: ["Windows", "macOS", "Linux", "iOS", "Android"],
  browser: ["Chrome", "Firefox", "Safari", "Edge"],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUser(i) {
  return {
    id: i + 1,
    name: `User${i + 1}`,
    email: `user${i + 1}@mail.com`,
    username: `user${i + 1}`,
    password: `pass${1000 + i}`,
    age: Math.floor(Math.random() * 40) + 18,
    gender: getRandom(randomValues.gender),
    phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    country: getRandom(randomValues.country),
    city: getRandom(randomValues.city),
    dob: `19${Math.floor(Math.random() * 30 + 70)}-${String(Math.floor(Math.random()*12+1)).padStart(2,'0')}-15`,
    job: getRandom(randomValues.job),
    salary: Math.floor(Math.random() * 90000) + 10000,
    status: getRandom(randomValues.status),
    company: `Company${(i % 50) + 1}`,
    education: getRandom(randomValues.education),
    language: getRandom(randomValues.language),
    bloodGroup: getRandom(randomValues.bloodGroup),
    married: Math.random() > 0.5,
    bio: `Bio for user ${i + 1}`,
    loginCount: Math.floor(Math.random() * 500),
    isActive: Math.random() > 0.5,
    heightCm: Math.floor(Math.random() * 50) + 150,
    weightKg: Math.floor(Math.random() * 40) + 50,
    favColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    ip: `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    lastLogin: new Date(Date.now() - Math.random()*1e10).toISOString(),
    createdAt: new Date(Date.now() - Math.random()*2e10).toISOString(),
    device: getRandom(randomValues.device),
    os: getRandom(randomValues.os),
    browser: getRandom(randomValues.browser),
    department: getRandom(randomValues.department),
    role: ['admin', 'user', 'guest'][i % 3],
    interests: ['sports', 'music', 'tech', 'books'][i % 4],
    credits: Math.floor(Math.random() * 1000),
    balance: (Math.random() * 10000).toFixed(2),
    loyaltyLevel: ['bronze', 'silver', 'gold', 'platinum'][i % 4],
    accountType: ['savings', 'checking', 'loan'][i % 3],
    transactionCount: Math.floor(Math.random() * 100),
    verified: Math.random() > 0.5,
    newsletter: Math.random() > 0.5,
    favFood: ['Pizza', 'Burger', 'Sushi', 'Biryani', 'Salad'][i % 5],
    favDrink: ['Tea', 'Coffee', 'Juice', 'Water'][i % 4],
    timezone: ['IST', 'EST', 'CET', 'PST'][i % 4],
    countryCode: ['IN', 'US', 'UK', 'DE', 'JP'][i % 5],
    altPhone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    panCard: `ABCDE${i % 1000}F`,
    aadhar: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    voterId: `ID${i}${i+10}`,
    gst: `22ABCDE${i % 1000}F1Z5`,
    upi: `user${i}@upi`,
    latitude: (Math.random() * 180 - 90).toFixed(6),
    longitude: (Math.random() * 360 - 180).toFixed(6),
    visits: Math.floor(Math.random() * 50),
    deviceId: `DEV-${10000 + i}`,
    macAddress: `${Array(6).fill(0).map(() => Math.floor(Math.random()*256).toString(16).padStart(2, '0')).join(':')}`
    // Add more here if needed
  };
}

// ✅ API: /users?count=100&fields=name,email,phone
app.get('/users', (req, res) => {
  const count = parseInt(req.query.count) || 10;
  const requestedFields = req.query.fields
    ? req.query.fields.split(',').map(f => f.trim())
    : null;

  const data = [];
  for (let i = 0; i < count; i++) {
    const user = generateUser(i);
    if (!requestedFields) {
      data.push(user);
    } else {
      const filtered = {};
      for (const field of requestedFields) {
        filtered[field] = user.hasOwnProperty(field) ? user[field] : "Unsupported Field";
      }
      data.push(filtered);
    }
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Fake Data API running at http://localhost:${PORT}`);
});
