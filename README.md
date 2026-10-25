# Duka Ledger
![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)(https://eugeneogero-glitch.github.io/eugene-project/)
Duka Ledger is a lightweight, local-first web application built for small retail shop owners (*dukas* and *kibandas*) in Kenya. It simplifies daily ledger accounting by providing real-time tracking of cash sales, monitoring pending customer credits (*deni*), and calculating net balances dynamically.


---

## Problem Statement & Solution

Small informal shop owners frequently rely on paper logbooks to track customer credit. Paper ledgers are easily lost, damaged, or subject to manual calculation errors. 

**Duka Ledger** solves this by providing a digital financial ledger that runs directly in the shop owner's browser environment, backed by a persistent local JSON REST API for reliable data storage.

---

## Interface & Design Overview

The single-page dashboard is optimized for speed and clarity during peak business hours:

* **Summary Metrics:** Live calculations for Net Balance, Total Cash In, and Pending Debts formatted in KES.
* **Ledger Table:** Displays entry timestamps, customer names, item descriptions, payment types, and color-coded status badges (`Paid` vs. `Unpaid`).
* **Interactive Modal:** A streamlined popup form for logging new cash sales or credit entries without navigating away from the main view.

---

## Architecture & Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox/Grid layout, custom modal styling), Vanilla JavaScript (ES6+)
* **Backend / Persistence:** JSON Server (`db.json`) functioning as a mock REST API
* **Data Flow:** DOM Events => Asynchronous `fetch()` Requests => Local JSON Server API => Real-time UI Re-rendering

---

## API Endpoints Reference

The backend communicates via a local RESTful JSON endpoint hosted on port 3000:

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/transactions` | Fetches all sales and credit records from `db.json` |
| `POST` | `/transactions` | Persists a new sale or credit entry to the database |
| `DELETE` | `/transactions/:id` | Removes a transaction record by its unique ID |

---

## Local Setup & Installation

Because Duka Ledger relies on a local REST API backend for full CRUD data persistence, run the app locally using the following steps:

### Prerequisites
* Node.js installed on your computer
* Any modern web browser

### Running the Project

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/eugeneogero-glitch/eugene-project.git](https://github.com/eugeneogero-glitch/eugene-project.git)
   cd eugene-project