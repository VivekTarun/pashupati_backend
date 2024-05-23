# Project API Documentation

## Introduction
This document provides an overview of the API endpoints and data models for the product and category management system.

# Project Folder Structure

## PASHUPATI_BACKEND

```plaintext
PASHUPATI_BACKEND/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── db.config.js
│   │   ├── gcs.config.js
│   │   ├── index.js
│   │   ├── multer.config.js
│   │   └── server.config.js
│   ├── controllers/
│   │   ├── category.controller.js
│   │   ├── index.js
│   │   └── product.controller.js
│   ├── errors/
│   │   ├── badRequest.error.js
│   │   ├── base.error.js
│   │   ├── duplicateKey.error.js
│   │   ├── duplicateUser.error.js
│   │   ├── internalServer.error.js
│   │   ├── notFound.error.js
│   │   └── notImplemented.error.js
│   ├── models/
│   │   ├── category.model.js
│   │   ├── index.js
│   │   └── product.model.js
│   ├── repositories/
│   │   ├── category.repository.js
│   │   ├── index.js
│   │   └── product.repository.js
│   ├── routes/
│   │   └── v1/
│   │       ├── category.routes.js
│   │       ├── index.js
│   │       └── product.routes.js
│   ├── services/
│   │   ├── category.service.js
│   │   ├── index.js
│   │   └── product.service.js
│   ├── utils/
│   │   ├── deleteFile.js
│   │   ├── errorHandler.js
│   │   └── index.js
│   └── validators/
│       └── index.js
├── .env
├── .gitignore
├── keyfile.json
├── package-lock.json
└── package.json



## Table of Contents
- [API Endpoints](#api-endpoints)
  - [Product Routes](#product-routes)
  - [Category Routes](#category-routes)
- [Data Models](#data-models)
  - [Product Model](#product-model)
  - [Category Model](#category-model)
- [Example Code Snippets](#example-code-snippets)
  - [Product Routes Configuration](#product-routes-configuration)
  - [Product Controller](#product-controller)
  - [Product Service](#product-service)
  - [Product Repository](#product-repository)
  - [Multer Configuration](#multer-configuration)
  - [GCS Configuration](#gcs-configuration)
  - [Product Model](#product-model-code)
  - [Category Model](#category-model-code)

## API Endpoints

### Product Routes

| Method | Endpoint                        | Description                          |
|--------|---------------------------------|--------------------------------------|
| GET    | `/api/products/ping`            | Ping the product controller          |
| GET    | `/api/products/`                | Get all products                     |
| GET    | `/api/products/:id`             | Get a product by ID                  |
| GET    | `/api/products/bycategory/:categoryid` | Get products by category ID   |
| DELETE | `/api/products/:id`             | Delete a product by ID               |
| PUT    | `/api/products/:id`             | Update a product by ID               |
| POST   | `/api/products/`                | Create a new product                 |

### Category Routes

| Method | Endpoint                        | Description                          |
|--------|---------------------------------|--------------------------------------|
| GET    | `/api/categories/`              | Get all categories                   |
| GET    | `/api/categories/:id`           | Get a category by ID                 |
| POST   | `/api/categories/`              | Create a new category                |

## Data Models

### Product Model

```json
{
  "title": "String",
  "imageUrl": "String",
  "description": "String",
  "amount": "Number",
  "category": "ObjectId"
}
