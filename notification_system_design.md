# Notification System Design

## Stage 1
Created REST APIs for:
- GET /notifications
- POST /notifications
- DELETE /notifications/:id

WebSockets can be used for real-time updates.

---

## Stage 2
Used PostgreSQL for structured storage and indexing.

Notifications table contains:
- ID
- UserID
- Type
- Message
- Timestamp

Used:
- indexing
- pagination
- Redis caching

---

## Stage 3
Query performance can be improved using indexes on:
- user_id
- notification_type
- timestamp

Avoid indexing every column because it increases storage and slows updates.

---

## Stage 4
Performance improvements:
- pagination
- caching
- lazy loading

---

## Stage 5
Problems:
- sequential execution
- slow processing
- email failures

Solutions:
- queues
- async workers
- retry mechanism

---

## Stage 6
Notifications are prioritized based on:
- type
- recency

Priority:
Placement > Result > Event

Used sorting/priority queue for top notifications.

---

## Technologies Used
Node.js, Express.js, Axios, PostgreSQL, Redis, GitHub
