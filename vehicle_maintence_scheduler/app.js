const express = require('express');
const axios = require('axios');

const createLogger = require(
  '../logging_middleware/logger'
);

const app = express();

app.use(express.json());

const PORT = 3001;

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlbnNzYWkyMDA2QGdtYWlsLmNvbSIsImV4cCI6MTc3ODMxMDI1OCwiaWF0IjoxNzc4MzA5MzU4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTdmYzM2NTgtNGI2MC00NjU4LWI4YWMtMTgyMGI0MmYzZDJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZW5pa2VwYWxsaSBuYXZlZW4gc3JpIHNhaSIsInN1YiI6IjYwZmViNGFkLWEyYjYtNGM5OC1hN2Y1LWI0NGJhMGIwNWQwYyJ9LCJlbWFpbCI6ImVuc3NhaTIwMDZAZ21haWwuY29tIiwibmFtZSI6ImVuaWtlcGFsbGkgbmF2ZWVuIHNyaSBzYWkiLCJyb2xsTm8iOiIyMzQ4MWE0MjI0IiwiYWNjZXNzQ29kZSI6ImVKZEN1QyIsImNsaWVudElEIjoiNjBmZWI0YWQtYTJiNi00Yzk4LWE3ZjUtYjQ0YmEwYjA1ZDBjIiwiY2xpZW50U2VjcmV0IjoiVE5YV0VIWXFoc1RQakNhcyJ9.OlCJVmNKFQT5KK3M220OjvS1bitAcep6vat_77fTee8';

const logger = createLogger(
  'http://4.224.186.213/evaluation-service/logs',
  TOKEN
);

async function getDepots() {

  const response = await axios.get(
    'http://4.224.186.213/evaluation-service/depots',
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  return response.data;
}

app.get('/', async (req, res) => {

  try {

    await logger(
      'info',
      'backend',
      'route',
      'Vehicle route called'
    );

    const response = await axios.get(
      'http://4.224.186.213/evaluation-service/vehicles',
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    res.json({
      vehicles: response.data.vehicles
    });

  } catch (error) {

    await logger(
      'error',
      'backend',
      'service',
      error.message
    );

    res.status(500).json({
      message: 'Error fetching vehicles'
    });
  }
});



app.listen(PORT, () => {
  console.log(
    `Vehicle maintenance app running on port ${PORT}`
  );
});