const express = require('express');

const createLogger = require(
  '../logging_middleware/logger'
);

const app = express();

app.use(express.json());

const PORT = 3000;

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlbnNzYWkyMDA2QGdtYWlsLmNvbSIsImV4cCI6MTc3ODMxMDI1OCwiaWF0IjoxNzc4MzA5MzU4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTdmYzM2NTgtNGI2MC00NjU4LWI4YWMtMTgyMGI0MmYzZDJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZW5pa2VwYWxsaSBuYXZlZW4gc3JpIHNhaSIsInN1YiI6IjYwZmViNGFkLWEyYjYtNGM5OC1hN2Y1LWI0NGJhMGIwNWQwYyJ9LCJlbWFpbCI6ImVuc3NhaTIwMDZAZ21haWwuY29tIiwibmFtZSI6ImVuaWtlcGFsbGkgbmF2ZWVuIHNyaSBzYWkiLCJyb2xsTm8iOiIyMzQ4MWE0MjI0IiwiYWNjZXNzQ29kZSI6ImVKZEN1QyIsImNsaWVudElEIjoiNjBmZWI0YWQtYTJiNi00Yzk4LWE3ZjUtYjQ0YmEwYjA1ZDBjIiwiY2xpZW50U2VjcmV0IjoiVE5YV0VIWXFoc1RQakNhcyJ9.OlCJVmNKFQT5KK3M220OjvS1bitAcep6vat_77fTee8';

const logger = createLogger(
  'http://4.224.186.213/evaluation-service/logs',
  TOKEN
);

let notifications = [];

app.get('/notifications', async (req, res) => {

  try {

    await logger(
      'info',
      'backend',
      'route',
      'Fetched notifications'
    );

    const sampleNotifications = [
      {
        ID: 'd146095a-0d86-4a34-9e69-3900a14576bc',
        Type: 'Result and Ranks',
        Message: 'Semiester',
        Timestamp: '2026-04-22 17:51:30'
      },
      {
        ID: 'b283218f-aa8a-4b7c-9138-1f22490ab0b0',
        Type: 'Placement',
        Message: 'shortlisted students',
        Timestamp: '2026-04-22 18:10:00'
      }
    ];

    res.json({
      notifications: sampleNotifications
    });

  } catch (error) {

    await logger(
      'error',
      'backend',
      'service',
      error.message
    );

    res.status(500).json({
      message: error.message
    });
  }
});
app.delete('/notifications/:id', async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const index = notifications.findIndex(
      notification => notification.id === id
    );

    if (index === -1) {

      return res.status(404).json({
        message: 'Notification not found'
      });
    }

    const deletedNotification =
      notifications.splice(index, 1);

    await logger(
      'info',
      'backend',
      'service',
      'Notification deleted'
    );

    res.json({
      message: 'Notification deleted successfully',
      deletedNotification
    });

  } catch (error) {

    await logger(
      'error',
      'backend',
      'service',
      error.message
    );

    res.status(500).json({
      message: 'Failed to delete notification'
    });
  }
});

app.listen(PORT, () => {

  console.log(
    `Notification app running on port ${PORT}`
  );
});