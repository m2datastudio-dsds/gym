-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeCode" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "email" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "alternateNumber" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "dateOfBirth" DATETIME,
    "biometricId" TEXT,
    "joiningDate" DATETIME,
    "bloodGroup" TEXT,
    "designation" TEXT,
    "status" BOOLEAN,
    "photoPicture" TEXT,
    "permanentAddress" TEXT NOT NULL,
    "communicationAddress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "packageCode" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "gender" TEXT,
    "maritalStatus" TEXT,
    "memberPhoto" TEXT,
    "homeContactNumber" TEXT,
    "bloodGroup" TEXT,
    "active" BOOLEAN,
    "gstNumber" TEXT,
    "remarks" TEXT,
    "assignTrainer" TEXT,
    "gstType" TEXT,
    "packageType" TEXT,
    "isMainPackage" BOOLEAN,
    "packageAmount" REAL,
    "gstamount" REAL,
    "duration" TEXT,
    "discount" REAL,
    "paidAmount" REAL,
    "paidDate" DATETIME,
    "paymentMode" TEXT,
    "receiptType" TEXT,
    "startDate" DATETIME,
    "fitnessDate" DATETIME,
    "weight" REAL,
    "height" REAL,
    "neck" REAL,
    "shoulders" REAL,
    "chest" REAL,
    "biceps" REAL,
    "upperAbs" REAL,
    "waist" REAL,
    "lowerAbs" REAL,
    "hip" REAL,
    "thigh" REAL,
    "calf" REAL,
    "proofType" TEXT,
    "proofNo" TEXT,
    "expiryDate" DATETIME,
    "proofDocument" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permanentAddress" TEXT NOT NULL,
    "communicationAddress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT,
    "alternateContact" TEXT,
    "enquiryFor" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "howToKnowAboutUs" TEXT NOT NULL,
    "enquiryDate" DATETIME NOT NULL,
    "expectedJoiningDate" DATETIME,
    "followUpDate" DATETIME NOT NULL,
    "remarks" TEXT
);

-- CreateTable
CREATE TABLE "DietPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chartName" TEXT NOT NULL,
    "chartTable" TEXT NOT NULL,
    "file" TEXT,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedCount" INTEGER DEFAULT 0,
    "assign" TEXT
);

-- CreateTable
CREATE TABLE "ExercisePlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "planname" TEXT NOT NULL,
    "warmUp" TEXT,
    "details" TEXT NOT NULL,
    "assign" TEXT,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expenseDate" DATETIME NOT NULL,
    "expenseType" TEXT NOT NULL,
    "description" TEXT,
    "amount" REAL NOT NULL,
    "paymentMode" TEXT NOT NULL,
    "remarks" TEXT,
    "receiptFile" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BusinessInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "businessName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "businessLogo" TEXT,
    "packageName" TEXT,
    "paymentAmount" REAL,
    "paidAmount" REAL,
    "pendingAmount" REAL,
    "expiryDate" DATETIME,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "configurations" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "biometricID" TEXT NOT NULL,
    "joiningDate" DATETIME NOT NULL,
    "inTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outTime" TEXT,
    "month" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StaffAttendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "biometricID" TEXT NOT NULL,
    "joiningDate" DATETIME NOT NULL,
    "inTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outTime" TEXT,
    "month" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentId" TEXT NOT NULL,
    "memberID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "packageType" TEXT NOT NULL,
    "packageAmount" REAL,
    "paidAmount" REAL,
    "pending" REAL,
    "paidDate" DATETIME,
    "paymentMode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_employeeCode_key" ON "Staff"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Package_packageCode_key" ON "Package"("packageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberID_key" ON "Member"("memberID");

-- CreateIndex
CREATE INDEX "Member_email_idx" ON "Member"("email");

-- CreateIndex
CREATE INDEX "Member_mobileNumber_idx" ON "Member"("mobileNumber");

-- CreateIndex
CREATE INDEX "Payment_paymentId_idx" ON "Payment"("paymentId");
