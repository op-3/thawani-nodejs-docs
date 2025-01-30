# Thawani Node.js

A Node.js library for integrating with Thawani Payment Gateway.

[![npm version](https://badge.fury.io/js/thawani-node.svg)](https://badge.fury.io/js/thawani-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- Full TypeScript support
- Promise-based API
- Comprehensive error handling
- Webhook processing
- Complete API coverage
- Built-in TypeScript types
- Security best practices
- Detailed logging

## Installation

```bash
npm install thawani-nodejs
# or
yarn add thawani-nodejs
```

## Quick Start

```typescript
import { ThawaniClient } from "thawani-nodejs";

// Initialize the client
const thawani = new ThawaniClient({
  secretKey: "your_secret_key",
  publishableKey: "your_publishable_key",
  sandbox: true, // Set to false for production
});

// Create a checkout session
async function createPayment() {
  try {
    const session = await thawani.checkout.create({
      client_reference_id: "order_123",
      mode: "payment",
      products: [
        {
          name: "Product Name",
          unit_amount: 1000, // 10 OMR in baisa
          quantity: 1,
        },
      ],
      success_url: "https://your-website.com/success",
      cancel_url: "https://your-website.com/cancel",
      metadata: {
        order_id: "123",
      },
    });

    // Get checkout URL
    const checkoutUrl = thawani.getPublicCheckoutUrl(session.session_id);
    return checkoutUrl;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

## Usage Examples

### Customer Management

```typescript
// Create a customer
const customer = await thawani.customers.create({
  client_customer_id: "customer@example.com",
});

// List customers
const customers = await thawani.customers.list();
```

### Payment Processing

```typescript
// List payments
const payments = await thawani.payments.list({
  limit: 10,
  skip: 0,
});

// Retrieve payment
const payment = await thawani.payments.retrieve("payment_id");
```

### Refund Management

```typescript
// Create refund
const refund = await thawani.refunds.create({
  payment_id: "payment_id",
  reason: "Customer request",
  metadata: {
    order_id: "123",
  },
});
```

### Webhook Handling

```typescript
app.post("/webhook", (req, res) => {
  try {
    const event = thawani.webhooks.constructEvent(
      req.body,
      req.headers["thawani-signature"],
      req.headers["thawani-timestamp"]
    );

    // Handle the event
    switch (event.type) {
      case "payment.succeeded":
        handlePaymentSuccess(event.data);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});
```

### Error Handling

```typescript
try {
  await thawani.checkout.create({...});
} catch (error) {
  if (error instanceof ThawaniError) {
    console.error('Thawani API Error:', error.message);
    console.error('Error Code:', error.code);
  }
}
```

## Documentation

For complete documentation, visit https://thawani-nodejs.vercel.app/

## Security

- All API requests are made over HTTPS
- Webhook signatures are verified
- No sensitive data is logged
- Input validation on all methods

## License

MIT License - see LICENSE for details.
