-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AdminUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StripeConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publishableKey" TEXT,
    "secretKey" TEXT,
    "webhookSecret" TEXT,
    "regularPriceId" TEXT,
    "extendedPriceId" TEXT,
    "regularProductId" TEXT,
    "extendedProductId" TEXT,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "stripeAccountId" TEXT,
    "stripeAccountName" TEXT,
    "connectedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stripeProductId" TEXT NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "licenseType" TEXT NOT NULL,
    "features" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentId" TEXT,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "licenseKey" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "lastDownloadAt" DATETIME,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Sale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stripeProductId_key" ON "Product"("stripeProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stripePriceId_key" ON "Product"("stripePriceId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_stripeSessionId_key" ON "Sale"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_licenseKey_key" ON "Sale"("licenseKey");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookLog_eventId_key" ON "WebhookLog"("eventId");
