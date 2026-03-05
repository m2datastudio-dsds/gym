
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.StaffScalarFieldEnum = {
  id: 'id',
  employeeCode: 'employeeCode',
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  mobileNumber: 'mobileNumber',
  alternateNumber: 'alternateNumber',
  gender: 'gender',
  age: 'age',
  dateOfBirth: 'dateOfBirth',
  biometricId: 'biometricId',
  joiningDate: 'joiningDate',
  bloodGroup: 'bloodGroup',
  designation: 'designation',
  status: 'status',
  photoPicture: 'photoPicture',
  permanentAddress: 'permanentAddress',
  communicationAddress: 'communicationAddress'
};

exports.Prisma.PackageScalarFieldEnum = {
  id: 'id',
  packageCode: 'packageCode',
  packageName: 'packageName',
  month: 'month',
  day: 'day',
  amount: 'amount',
  active: 'active',
  createdAt: 'createdAt'
};

exports.Prisma.MemberScalarFieldEnum = {
  id: 'id',
  memberID: 'memberID',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  mobileNumber: 'mobileNumber',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  maritalStatus: 'maritalStatus',
  memberPhoto: 'memberPhoto',
  homeContactNumber: 'homeContactNumber',
  bloodGroup: 'bloodGroup',
  active: 'active',
  gstNumber: 'gstNumber',
  remarks: 'remarks',
  assignTrainer: 'assignTrainer',
  gstType: 'gstType',
  packageType: 'packageType',
  isMainPackage: 'isMainPackage',
  packageAmount: 'packageAmount',
  gstamount: 'gstamount',
  duration: 'duration',
  discount: 'discount',
  paidAmount: 'paidAmount',
  paidDate: 'paidDate',
  paymentMode: 'paymentMode',
  receiptType: 'receiptType',
  startDate: 'startDate',
  fitnessDate: 'fitnessDate',
  weight: 'weight',
  height: 'height',
  neck: 'neck',
  shoulders: 'shoulders',
  chest: 'chest',
  biceps: 'biceps',
  upperAbs: 'upperAbs',
  waist: 'waist',
  lowerAbs: 'lowerAbs',
  hip: 'hip',
  thigh: 'thigh',
  calf: 'calf',
  proofType: 'proofType',
  proofNo: 'proofNo',
  expiryDate: 'expiryDate',
  proofDocument: 'proofDocument',
  createdAt: 'createdAt',
  permanentAddress: 'permanentAddress',
  communicationAddress: 'communicationAddress'
};

exports.Prisma.EnquiryScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  mobileNumber: 'mobileNumber',
  email: 'email',
  alternateContact: 'alternateContact',
  enquiryFor: 'enquiryFor',
  status: 'status',
  howToKnowAboutUs: 'howToKnowAboutUs',
  enquiryDate: 'enquiryDate',
  expectedJoiningDate: 'expectedJoiningDate',
  followUpDate: 'followUpDate',
  remarks: 'remarks'
};

exports.Prisma.DietPlanScalarFieldEnum = {
  id: 'id',
  chartName: 'chartName',
  chartTable: 'chartTable',
  file: 'file',
  createdDate: 'createdDate',
  assignedCount: 'assignedCount',
  assign: 'assign'
};

exports.Prisma.ExercisePlanScalarFieldEnum = {
  id: 'id',
  planname: 'planname',
  warmUp: 'warmUp',
  details: 'details',
  assign: 'assign',
  createdDate: 'createdDate',
  file: 'file'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
  expenseDate: 'expenseDate',
  expenseType: 'expenseType',
  description: 'description',
  amount: 'amount',
  paymentMode: 'paymentMode',
  remarks: 'remarks',
  receiptFile: 'receiptFile'
};

exports.Prisma.BusinessInfoScalarFieldEnum = {
  id: 'id',
  businessName: 'businessName',
  contactPerson: 'contactPerson',
  mobileNumber: 'mobileNumber',
  email: 'email',
  businessLogo: 'businessLogo',
  packageName: 'packageName',
  paymentAmount: 'paymentAmount',
  paidAmount: 'paidAmount',
  pendingAmount: 'pendingAmount',
  expiryDate: 'expiryDate',
  address: 'address',
  district: 'district',
  state: 'state',
  pincode: 'pincode',
  configurations: 'configurations'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  memberID: 'memberID',
  name: 'name',
  biometricID: 'biometricID',
  joiningDate: 'joiningDate',
  inTime: 'inTime',
  outTime: 'outTime',
  month: 'month'
};

exports.Prisma.StaffAttendanceScalarFieldEnum = {
  id: 'id',
  employeeCode: 'employeeCode',
  name: 'name',
  biometricID: 'biometricID',
  joiningDate: 'joiningDate',
  inTime: 'inTime',
  outTime: 'outTime',
  month: 'month'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  paymentId: 'paymentId',
  memberID: 'memberID',
  name: 'name',
  mobileNumber: 'mobileNumber',
  packageType: 'packageType',
  packageAmount: 'packageAmount',
  paidAmount: 'paidAmount',
  pending: 'pending',
  paidDate: 'paidDate',
  paymentMode: 'paymentMode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FileSyncQueueScalarFieldEnum = {
  id: 'id',
  localPath: 'localPath',
  remoteUrl: 'remoteUrl',
  fileType: 'fileType',
  entityType: 'entityType',
  entityId: 'entityId',
  fieldName: 'fieldName',
  status: 'status',
  errorMessage: 'errorMessage',
  retryCount: 'retryCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  syncedAt: 'syncedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Staff: 'Staff',
  Package: 'Package',
  Member: 'Member',
  Enquiry: 'Enquiry',
  DietPlan: 'DietPlan',
  ExercisePlan: 'ExercisePlan',
  Expense: 'Expense',
  BusinessInfo: 'BusinessInfo',
  Attendance: 'Attendance',
  StaffAttendance: 'StaffAttendance',
  Payment: 'Payment',
  FileSyncQueue: 'FileSyncQueue'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
