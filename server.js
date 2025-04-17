const express = require('express');
const bodyParser = require('body-parser');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const cors = require('cors');

// إعداد قاعدة البيانات
const adapter = new JSONFile('db.json');
const db = new Low(adapter);

// تهيئة التطبيق
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// تهيئة قاعدة البيانات عند بدء التشغيل
(async () => {
  await db.read();
  db.data = db.data || { candidates: [] };
  await db.write();
})();

// حفظ أو تحديث مرشح
app.post('/candidates', async (req, res) => {
  const candidate = req.body;

  // التأكد من وجود البريد الإلكتروني
  const existingIndex = db.data.candidates.findIndex(c => c.email === candidate.email);

  if (existingIndex !== -1) {
    // تحديث بيانات المرشح
    db.data.candidates[existingIndex] = candidate;
  } else {
    // إضافة مرشح جديد
    db.data.candidates.push(candidate);
  }

  await db.write();
  res.json({ message: "Candidate saved successfully" });
});

// عرض جميع المرشحين
app.get('/candidates', (req, res) => {
  res.json(db.data.candidates);
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Welcome to API - listening on http://localhost:${PORT}`);
});
