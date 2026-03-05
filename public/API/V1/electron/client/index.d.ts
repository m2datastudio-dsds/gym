
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model Package
 * 
 */
export type Package = $Result.DefaultSelection<Prisma.$PackagePayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model Enquiry
 * 
 */
export type Enquiry = $Result.DefaultSelection<Prisma.$EnquiryPayload>
/**
 * Model DietPlan
 * 
 */
export type DietPlan = $Result.DefaultSelection<Prisma.$DietPlanPayload>
/**
 * Model ExercisePlan
 * 
 */
export type ExercisePlan = $Result.DefaultSelection<Prisma.$ExercisePlanPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model BusinessInfo
 * 
 */
export type BusinessInfo = $Result.DefaultSelection<Prisma.$BusinessInfoPayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model StaffAttendance
 * 
 */
export type StaffAttendance = $Result.DefaultSelection<Prisma.$StaffAttendancePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model FileSyncQueue
 * 
 */
export type FileSyncQueue = $Result.DefaultSelection<Prisma.$FileSyncQueuePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Staff
 * const staff = await prisma.staff.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Staff
   * const staff = await prisma.staff.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs>;

  /**
   * `prisma.package`: Exposes CRUD operations for the **Package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Packages
    * const packages = await prisma.package.findMany()
    * ```
    */
  get package(): Prisma.PackageDelegate<ExtArgs>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs>;

  /**
   * `prisma.enquiry`: Exposes CRUD operations for the **Enquiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enquiries
    * const enquiries = await prisma.enquiry.findMany()
    * ```
    */
  get enquiry(): Prisma.EnquiryDelegate<ExtArgs>;

  /**
   * `prisma.dietPlan`: Exposes CRUD operations for the **DietPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DietPlans
    * const dietPlans = await prisma.dietPlan.findMany()
    * ```
    */
  get dietPlan(): Prisma.DietPlanDelegate<ExtArgs>;

  /**
   * `prisma.exercisePlan`: Exposes CRUD operations for the **ExercisePlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExercisePlans
    * const exercisePlans = await prisma.exercisePlan.findMany()
    * ```
    */
  get exercisePlan(): Prisma.ExercisePlanDelegate<ExtArgs>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs>;

  /**
   * `prisma.businessInfo`: Exposes CRUD operations for the **BusinessInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessInfos
    * const businessInfos = await prisma.businessInfo.findMany()
    * ```
    */
  get businessInfo(): Prisma.BusinessInfoDelegate<ExtArgs>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs>;

  /**
   * `prisma.staffAttendance`: Exposes CRUD operations for the **StaffAttendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffAttendances
    * const staffAttendances = await prisma.staffAttendance.findMany()
    * ```
    */
  get staffAttendance(): Prisma.StaffAttendanceDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.fileSyncQueue`: Exposes CRUD operations for the **FileSyncQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FileSyncQueues
    * const fileSyncQueues = await prisma.fileSyncQueue.findMany()
    * ```
    */
  get fileSyncQueue(): Prisma.FileSyncQueueDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "staff" | "package" | "member" | "enquiry" | "dietPlan" | "exercisePlan" | "expense" | "businessInfo" | "attendance" | "staffAttendance" | "payment" | "fileSyncQueue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      Package: {
        payload: Prisma.$PackagePayload<ExtArgs>
        fields: Prisma.PackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findFirst: {
            args: Prisma.PackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findMany: {
            args: Prisma.PackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          create: {
            args: Prisma.PackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          createMany: {
            args: Prisma.PackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          delete: {
            args: Prisma.PackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          update: {
            args: Prisma.PackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          deleteMany: {
            args: Prisma.PackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          aggregate: {
            args: Prisma.PackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackage>
          }
          groupBy: {
            args: Prisma.PackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageCountArgs<ExtArgs>
            result: $Utils.Optional<PackageCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      Enquiry: {
        payload: Prisma.$EnquiryPayload<ExtArgs>
        fields: Prisma.EnquiryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnquiryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnquiryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>
          }
          findFirst: {
            args: Prisma.EnquiryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnquiryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>
          }
          findMany: {
            args: Prisma.EnquiryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>[]
          }
          create: {
            args: Prisma.EnquiryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>
          }
          createMany: {
            args: Prisma.EnquiryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnquiryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>[]
          }
          delete: {
            args: Prisma.EnquiryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>
          }
          update: {
            args: Prisma.EnquiryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>
          }
          deleteMany: {
            args: Prisma.EnquiryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnquiryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EnquiryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnquiryPayload>
          }
          aggregate: {
            args: Prisma.EnquiryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnquiry>
          }
          groupBy: {
            args: Prisma.EnquiryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnquiryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnquiryCountArgs<ExtArgs>
            result: $Utils.Optional<EnquiryCountAggregateOutputType> | number
          }
        }
      }
      DietPlan: {
        payload: Prisma.$DietPlanPayload<ExtArgs>
        fields: Prisma.DietPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DietPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DietPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>
          }
          findFirst: {
            args: Prisma.DietPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DietPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>
          }
          findMany: {
            args: Prisma.DietPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>[]
          }
          create: {
            args: Prisma.DietPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>
          }
          createMany: {
            args: Prisma.DietPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DietPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>[]
          }
          delete: {
            args: Prisma.DietPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>
          }
          update: {
            args: Prisma.DietPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>
          }
          deleteMany: {
            args: Prisma.DietPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DietPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DietPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietPlanPayload>
          }
          aggregate: {
            args: Prisma.DietPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDietPlan>
          }
          groupBy: {
            args: Prisma.DietPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<DietPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.DietPlanCountArgs<ExtArgs>
            result: $Utils.Optional<DietPlanCountAggregateOutputType> | number
          }
        }
      }
      ExercisePlan: {
        payload: Prisma.$ExercisePlanPayload<ExtArgs>
        fields: Prisma.ExercisePlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExercisePlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExercisePlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>
          }
          findFirst: {
            args: Prisma.ExercisePlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExercisePlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>
          }
          findMany: {
            args: Prisma.ExercisePlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>[]
          }
          create: {
            args: Prisma.ExercisePlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>
          }
          createMany: {
            args: Prisma.ExercisePlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExercisePlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>[]
          }
          delete: {
            args: Prisma.ExercisePlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>
          }
          update: {
            args: Prisma.ExercisePlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>
          }
          deleteMany: {
            args: Prisma.ExercisePlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExercisePlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExercisePlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePlanPayload>
          }
          aggregate: {
            args: Prisma.ExercisePlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercisePlan>
          }
          groupBy: {
            args: Prisma.ExercisePlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExercisePlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExercisePlanCountArgs<ExtArgs>
            result: $Utils.Optional<ExercisePlanCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      BusinessInfo: {
        payload: Prisma.$BusinessInfoPayload<ExtArgs>
        fields: Prisma.BusinessInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>
          }
          findFirst: {
            args: Prisma.BusinessInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>
          }
          findMany: {
            args: Prisma.BusinessInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>[]
          }
          create: {
            args: Prisma.BusinessInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>
          }
          createMany: {
            args: Prisma.BusinessInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>[]
          }
          delete: {
            args: Prisma.BusinessInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>
          }
          update: {
            args: Prisma.BusinessInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>
          }
          deleteMany: {
            args: Prisma.BusinessInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BusinessInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessInfoPayload>
          }
          aggregate: {
            args: Prisma.BusinessInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessInfo>
          }
          groupBy: {
            args: Prisma.BusinessInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessInfoCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessInfoCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      StaffAttendance: {
        payload: Prisma.$StaffAttendancePayload<ExtArgs>
        fields: Prisma.StaffAttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffAttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffAttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          findFirst: {
            args: Prisma.StaffAttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffAttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          findMany: {
            args: Prisma.StaffAttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>[]
          }
          create: {
            args: Prisma.StaffAttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          createMany: {
            args: Prisma.StaffAttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffAttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>[]
          }
          delete: {
            args: Prisma.StaffAttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          update: {
            args: Prisma.StaffAttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          deleteMany: {
            args: Prisma.StaffAttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffAttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StaffAttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          aggregate: {
            args: Prisma.StaffAttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffAttendance>
          }
          groupBy: {
            args: Prisma.StaffAttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffAttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffAttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<StaffAttendanceCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      FileSyncQueue: {
        payload: Prisma.$FileSyncQueuePayload<ExtArgs>
        fields: Prisma.FileSyncQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileSyncQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileSyncQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>
          }
          findFirst: {
            args: Prisma.FileSyncQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileSyncQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>
          }
          findMany: {
            args: Prisma.FileSyncQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>[]
          }
          create: {
            args: Prisma.FileSyncQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>
          }
          createMany: {
            args: Prisma.FileSyncQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileSyncQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>[]
          }
          delete: {
            args: Prisma.FileSyncQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>
          }
          update: {
            args: Prisma.FileSyncQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>
          }
          deleteMany: {
            args: Prisma.FileSyncQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileSyncQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FileSyncQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileSyncQueuePayload>
          }
          aggregate: {
            args: Prisma.FileSyncQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFileSyncQueue>
          }
          groupBy: {
            args: Prisma.FileSyncQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileSyncQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileSyncQueueCountArgs<ExtArgs>
            result: $Utils.Optional<FileSyncQueueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _avg: StaffAvgAggregateOutputType | null
    _sum: StaffSumAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffAvgAggregateOutputType = {
    id: number | null
    age: number | null
  }

  export type StaffSumAggregateOutputType = {
    id: number | null
    age: number | null
  }

  export type StaffMinAggregateOutputType = {
    id: number | null
    employeeCode: string | null
    firstname: string | null
    lastname: string | null
    email: string | null
    mobileNumber: string | null
    alternateNumber: string | null
    gender: string | null
    age: number | null
    dateOfBirth: Date | null
    biometricId: string | null
    joiningDate: Date | null
    bloodGroup: string | null
    designation: string | null
    status: boolean | null
    photoPicture: string | null
    permanentAddress: string | null
    communicationAddress: string | null
  }

  export type StaffMaxAggregateOutputType = {
    id: number | null
    employeeCode: string | null
    firstname: string | null
    lastname: string | null
    email: string | null
    mobileNumber: string | null
    alternateNumber: string | null
    gender: string | null
    age: number | null
    dateOfBirth: Date | null
    biometricId: string | null
    joiningDate: Date | null
    bloodGroup: string | null
    designation: string | null
    status: boolean | null
    photoPicture: string | null
    permanentAddress: string | null
    communicationAddress: string | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    employeeCode: number
    firstname: number
    lastname: number
    email: number
    mobileNumber: number
    alternateNumber: number
    gender: number
    age: number
    dateOfBirth: number
    biometricId: number
    joiningDate: number
    bloodGroup: number
    designation: number
    status: number
    photoPicture: number
    permanentAddress: number
    communicationAddress: number
    _all: number
  }


  export type StaffAvgAggregateInputType = {
    id?: true
    age?: true
  }

  export type StaffSumAggregateInputType = {
    id?: true
    age?: true
  }

  export type StaffMinAggregateInputType = {
    id?: true
    employeeCode?: true
    firstname?: true
    lastname?: true
    email?: true
    mobileNumber?: true
    alternateNumber?: true
    gender?: true
    age?: true
    dateOfBirth?: true
    biometricId?: true
    joiningDate?: true
    bloodGroup?: true
    designation?: true
    status?: true
    photoPicture?: true
    permanentAddress?: true
    communicationAddress?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    employeeCode?: true
    firstname?: true
    lastname?: true
    email?: true
    mobileNumber?: true
    alternateNumber?: true
    gender?: true
    age?: true
    dateOfBirth?: true
    biometricId?: true
    joiningDate?: true
    bloodGroup?: true
    designation?: true
    status?: true
    photoPicture?: true
    permanentAddress?: true
    communicationAddress?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    employeeCode?: true
    firstname?: true
    lastname?: true
    email?: true
    mobileNumber?: true
    alternateNumber?: true
    gender?: true
    age?: true
    dateOfBirth?: true
    biometricId?: true
    joiningDate?: true
    bloodGroup?: true
    designation?: true
    status?: true
    photoPicture?: true
    permanentAddress?: true
    communicationAddress?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _avg?: StaffAvgAggregateInputType
    _sum?: StaffSumAggregateInputType
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: number
    employeeCode: string
    firstname: string
    lastname: string | null
    email: string | null
    mobileNumber: string
    alternateNumber: string | null
    gender: string | null
    age: number | null
    dateOfBirth: Date | null
    biometricId: string | null
    joiningDate: Date | null
    bloodGroup: string | null
    designation: string | null
    status: boolean | null
    photoPicture: string | null
    permanentAddress: string
    communicationAddress: string
    _count: StaffCountAggregateOutputType | null
    _avg: StaffAvgAggregateOutputType | null
    _sum: StaffSumAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeCode?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    mobileNumber?: boolean
    alternateNumber?: boolean
    gender?: boolean
    age?: boolean
    dateOfBirth?: boolean
    biometricId?: boolean
    joiningDate?: boolean
    bloodGroup?: boolean
    designation?: boolean
    status?: boolean
    photoPicture?: boolean
    permanentAddress?: boolean
    communicationAddress?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeCode?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    mobileNumber?: boolean
    alternateNumber?: boolean
    gender?: boolean
    age?: boolean
    dateOfBirth?: boolean
    biometricId?: boolean
    joiningDate?: boolean
    bloodGroup?: boolean
    designation?: boolean
    status?: boolean
    photoPicture?: boolean
    permanentAddress?: boolean
    communicationAddress?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    employeeCode?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    mobileNumber?: boolean
    alternateNumber?: boolean
    gender?: boolean
    age?: boolean
    dateOfBirth?: boolean
    biometricId?: boolean
    joiningDate?: boolean
    bloodGroup?: boolean
    designation?: boolean
    status?: boolean
    photoPicture?: boolean
    permanentAddress?: boolean
    communicationAddress?: boolean
  }


  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeCode: string
      firstname: string
      lastname: string | null
      email: string | null
      mobileNumber: string
      alternateNumber: string | null
      gender: string | null
      age: number | null
      dateOfBirth: Date | null
      biometricId: string | null
      joiningDate: Date | null
      bloodGroup: string | null
      designation: string | null
      status: boolean | null
      photoPicture: string | null
      permanentAddress: string
      communicationAddress: string
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Staff model
   */ 
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'Int'>
    readonly employeeCode: FieldRef<"Staff", 'String'>
    readonly firstname: FieldRef<"Staff", 'String'>
    readonly lastname: FieldRef<"Staff", 'String'>
    readonly email: FieldRef<"Staff", 'String'>
    readonly mobileNumber: FieldRef<"Staff", 'String'>
    readonly alternateNumber: FieldRef<"Staff", 'String'>
    readonly gender: FieldRef<"Staff", 'String'>
    readonly age: FieldRef<"Staff", 'Int'>
    readonly dateOfBirth: FieldRef<"Staff", 'DateTime'>
    readonly biometricId: FieldRef<"Staff", 'String'>
    readonly joiningDate: FieldRef<"Staff", 'DateTime'>
    readonly bloodGroup: FieldRef<"Staff", 'String'>
    readonly designation: FieldRef<"Staff", 'String'>
    readonly status: FieldRef<"Staff", 'Boolean'>
    readonly photoPicture: FieldRef<"Staff", 'String'>
    readonly permanentAddress: FieldRef<"Staff", 'String'>
    readonly communicationAddress: FieldRef<"Staff", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
  }


  /**
   * Model Package
   */

  export type AggregatePackage = {
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  export type PackageAvgAggregateOutputType = {
    id: number | null
    month: number | null
    day: number | null
    amount: number | null
  }

  export type PackageSumAggregateOutputType = {
    id: number | null
    month: number | null
    day: number | null
    amount: number | null
  }

  export type PackageMinAggregateOutputType = {
    id: number | null
    packageCode: string | null
    packageName: string | null
    month: number | null
    day: number | null
    amount: number | null
    active: boolean | null
    createdAt: Date | null
  }

  export type PackageMaxAggregateOutputType = {
    id: number | null
    packageCode: string | null
    packageName: string | null
    month: number | null
    day: number | null
    amount: number | null
    active: boolean | null
    createdAt: Date | null
  }

  export type PackageCountAggregateOutputType = {
    id: number
    packageCode: number
    packageName: number
    month: number
    day: number
    amount: number
    active: number
    createdAt: number
    _all: number
  }


  export type PackageAvgAggregateInputType = {
    id?: true
    month?: true
    day?: true
    amount?: true
  }

  export type PackageSumAggregateInputType = {
    id?: true
    month?: true
    day?: true
    amount?: true
  }

  export type PackageMinAggregateInputType = {
    id?: true
    packageCode?: true
    packageName?: true
    month?: true
    day?: true
    amount?: true
    active?: true
    createdAt?: true
  }

  export type PackageMaxAggregateInputType = {
    id?: true
    packageCode?: true
    packageName?: true
    month?: true
    day?: true
    amount?: true
    active?: true
    createdAt?: true
  }

  export type PackageCountAggregateInputType = {
    id?: true
    packageCode?: true
    packageName?: true
    month?: true
    day?: true
    amount?: true
    active?: true
    createdAt?: true
    _all?: true
  }

  export type PackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Package to aggregate.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Packages
    **/
    _count?: true | PackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageMaxAggregateInputType
  }

  export type GetPackageAggregateType<T extends PackageAggregateArgs> = {
        [P in keyof T & keyof AggregatePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackage[P]>
      : GetScalarType<T[P], AggregatePackage[P]>
  }




  export type PackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithAggregationInput | PackageOrderByWithAggregationInput[]
    by: PackageScalarFieldEnum[] | PackageScalarFieldEnum
    having?: PackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageCountAggregateInputType | true
    _avg?: PackageAvgAggregateInputType
    _sum?: PackageSumAggregateInputType
    _min?: PackageMinAggregateInputType
    _max?: PackageMaxAggregateInputType
  }

  export type PackageGroupByOutputType = {
    id: number
    packageCode: string
    packageName: string
    month: number
    day: number
    amount: number
    active: boolean
    createdAt: Date
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  type GetPackageGroupByPayload<T extends PackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageGroupByOutputType[P]>
            : GetScalarType<T[P], PackageGroupByOutputType[P]>
        }
      >
    >


  export type PackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageCode?: boolean
    packageName?: boolean
    month?: boolean
    day?: boolean
    amount?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageCode?: boolean
    packageName?: boolean
    month?: boolean
    day?: boolean
    amount?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectScalar = {
    id?: boolean
    packageCode?: boolean
    packageName?: boolean
    month?: boolean
    day?: boolean
    amount?: boolean
    active?: boolean
    createdAt?: boolean
  }


  export type $PackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Package"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      packageCode: string
      packageName: string
      month: number
      day: number
      amount: number
      active: boolean
      createdAt: Date
    }, ExtArgs["result"]["package"]>
    composites: {}
  }

  type PackageGetPayload<S extends boolean | null | undefined | PackageDefaultArgs> = $Result.GetResult<Prisma.$PackagePayload, S>

  type PackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PackageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PackageCountAggregateInputType | true
    }

  export interface PackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Package'], meta: { name: 'Package' } }
    /**
     * Find zero or one Package that matches the filter.
     * @param {PackageFindUniqueArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageFindUniqueArgs>(args: SelectSubset<T, PackageFindUniqueArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Package that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PackageFindUniqueOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageFindFirstArgs>(args?: SelectSubset<T, PackageFindFirstArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Package that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Packages
     * const packages = await prisma.package.findMany()
     * 
     * // Get first 10 Packages
     * const packages = await prisma.package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageWithIdOnly = await prisma.package.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageFindManyArgs>(args?: SelectSubset<T, PackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Package.
     * @param {PackageCreateArgs} args - Arguments to create a Package.
     * @example
     * // Create one Package
     * const Package = await prisma.package.create({
     *   data: {
     *     // ... data to create a Package
     *   }
     * })
     * 
     */
    create<T extends PackageCreateArgs>(args: SelectSubset<T, PackageCreateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Packages.
     * @param {PackageCreateManyArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageCreateManyArgs>(args?: SelectSubset<T, PackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Packages and returns the data saved in the database.
     * @param {PackageCreateManyAndReturnArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Package.
     * @param {PackageDeleteArgs} args - Arguments to delete one Package.
     * @example
     * // Delete one Package
     * const Package = await prisma.package.delete({
     *   where: {
     *     // ... filter to delete one Package
     *   }
     * })
     * 
     */
    delete<T extends PackageDeleteArgs>(args: SelectSubset<T, PackageDeleteArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Package.
     * @param {PackageUpdateArgs} args - Arguments to update one Package.
     * @example
     * // Update one Package
     * const package = await prisma.package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageUpdateArgs>(args: SelectSubset<T, PackageUpdateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Packages.
     * @param {PackageDeleteManyArgs} args - Arguments to filter Packages to delete.
     * @example
     * // Delete a few Packages
     * const { count } = await prisma.package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageDeleteManyArgs>(args?: SelectSubset<T, PackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageUpdateManyArgs>(args: SelectSubset<T, PackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Package.
     * @param {PackageUpsertArgs} args - Arguments to update or create a Package.
     * @example
     * // Update or create a Package
     * const package = await prisma.package.upsert({
     *   create: {
     *     // ... data to create a Package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Package we want to update
     *   }
     * })
     */
    upsert<T extends PackageUpsertArgs>(args: SelectSubset<T, PackageUpsertArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageCountArgs} args - Arguments to filter Packages to count.
     * @example
     * // Count the number of Packages
     * const count = await prisma.package.count({
     *   where: {
     *     // ... the filter for the Packages we want to count
     *   }
     * })
    **/
    count<T extends PackageCountArgs>(
      args?: Subset<T, PackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageAggregateArgs>(args: Subset<T, PackageAggregateArgs>): Prisma.PrismaPromise<GetPackageAggregateType<T>>

    /**
     * Group by Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageGroupByArgs['orderBy'] }
        : { orderBy?: PackageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Package model
   */
  readonly fields: PackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Package model
   */ 
  interface PackageFieldRefs {
    readonly id: FieldRef<"Package", 'Int'>
    readonly packageCode: FieldRef<"Package", 'String'>
    readonly packageName: FieldRef<"Package", 'String'>
    readonly month: FieldRef<"Package", 'Int'>
    readonly day: FieldRef<"Package", 'Int'>
    readonly amount: FieldRef<"Package", 'Float'>
    readonly active: FieldRef<"Package", 'Boolean'>
    readonly createdAt: FieldRef<"Package", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Package findUnique
   */
  export type PackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findUniqueOrThrow
   */
  export type PackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findFirst
   */
  export type PackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findFirstOrThrow
   */
  export type PackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findMany
   */
  export type PackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Filter, which Packages to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package create
   */
  export type PackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * The data needed to create a Package.
     */
    data: XOR<PackageCreateInput, PackageUncheckedCreateInput>
  }

  /**
   * Package createMany
   */
  export type PackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
  }

  /**
   * Package createManyAndReturn
   */
  export type PackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
  }

  /**
   * Package update
   */
  export type PackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * The data needed to update a Package.
     */
    data: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
    /**
     * Choose, which Package to update.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package updateMany
   */
  export type PackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
  }

  /**
   * Package upsert
   */
  export type PackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * The filter to search for the Package to update in case it exists.
     */
    where: PackageWhereUniqueInput
    /**
     * In case the Package found by the `where` argument doesn't exist, create a new Package with this data.
     */
    create: XOR<PackageCreateInput, PackageUncheckedCreateInput>
    /**
     * In case the Package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
  }

  /**
   * Package delete
   */
  export type PackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Filter which Package to delete.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package deleteMany
   */
  export type PackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Packages to delete
     */
    where?: PackageWhereInput
  }

  /**
   * Package without action
   */
  export type PackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
  }


  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberAvgAggregateOutputType = {
    id: number | null
    packageAmount: number | null
    gstamount: number | null
    discount: number | null
    paidAmount: number | null
    weight: number | null
    height: number | null
    neck: number | null
    shoulders: number | null
    chest: number | null
    biceps: number | null
    upperAbs: number | null
    waist: number | null
    lowerAbs: number | null
    hip: number | null
    thigh: number | null
    calf: number | null
  }

  export type MemberSumAggregateOutputType = {
    id: number | null
    packageAmount: number | null
    gstamount: number | null
    discount: number | null
    paidAmount: number | null
    weight: number | null
    height: number | null
    neck: number | null
    shoulders: number | null
    chest: number | null
    biceps: number | null
    upperAbs: number | null
    waist: number | null
    lowerAbs: number | null
    hip: number | null
    thigh: number | null
    calf: number | null
  }

  export type MemberMinAggregateOutputType = {
    id: number | null
    memberID: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    mobileNumber: string | null
    dateOfBirth: Date | null
    gender: string | null
    maritalStatus: string | null
    memberPhoto: string | null
    homeContactNumber: string | null
    bloodGroup: string | null
    active: boolean | null
    gstNumber: string | null
    remarks: string | null
    assignTrainer: string | null
    gstType: string | null
    packageType: string | null
    isMainPackage: boolean | null
    packageAmount: number | null
    gstamount: number | null
    duration: string | null
    discount: number | null
    paidAmount: number | null
    paidDate: Date | null
    paymentMode: string | null
    receiptType: string | null
    startDate: Date | null
    fitnessDate: Date | null
    weight: number | null
    height: number | null
    neck: number | null
    shoulders: number | null
    chest: number | null
    biceps: number | null
    upperAbs: number | null
    waist: number | null
    lowerAbs: number | null
    hip: number | null
    thigh: number | null
    calf: number | null
    proofType: string | null
    proofNo: string | null
    expiryDate: Date | null
    proofDocument: string | null
    createdAt: Date | null
    permanentAddress: string | null
    communicationAddress: string | null
  }

  export type MemberMaxAggregateOutputType = {
    id: number | null
    memberID: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    mobileNumber: string | null
    dateOfBirth: Date | null
    gender: string | null
    maritalStatus: string | null
    memberPhoto: string | null
    homeContactNumber: string | null
    bloodGroup: string | null
    active: boolean | null
    gstNumber: string | null
    remarks: string | null
    assignTrainer: string | null
    gstType: string | null
    packageType: string | null
    isMainPackage: boolean | null
    packageAmount: number | null
    gstamount: number | null
    duration: string | null
    discount: number | null
    paidAmount: number | null
    paidDate: Date | null
    paymentMode: string | null
    receiptType: string | null
    startDate: Date | null
    fitnessDate: Date | null
    weight: number | null
    height: number | null
    neck: number | null
    shoulders: number | null
    chest: number | null
    biceps: number | null
    upperAbs: number | null
    waist: number | null
    lowerAbs: number | null
    hip: number | null
    thigh: number | null
    calf: number | null
    proofType: string | null
    proofNo: string | null
    expiryDate: Date | null
    proofDocument: string | null
    createdAt: Date | null
    permanentAddress: string | null
    communicationAddress: string | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    memberID: number
    firstName: number
    lastName: number
    email: number
    mobileNumber: number
    dateOfBirth: number
    gender: number
    maritalStatus: number
    memberPhoto: number
    homeContactNumber: number
    bloodGroup: number
    active: number
    gstNumber: number
    remarks: number
    assignTrainer: number
    gstType: number
    packageType: number
    isMainPackage: number
    packageAmount: number
    gstamount: number
    duration: number
    discount: number
    paidAmount: number
    paidDate: number
    paymentMode: number
    receiptType: number
    startDate: number
    fitnessDate: number
    weight: number
    height: number
    neck: number
    shoulders: number
    chest: number
    biceps: number
    upperAbs: number
    waist: number
    lowerAbs: number
    hip: number
    thigh: number
    calf: number
    proofType: number
    proofNo: number
    expiryDate: number
    proofDocument: number
    createdAt: number
    permanentAddress: number
    communicationAddress: number
    _all: number
  }


  export type MemberAvgAggregateInputType = {
    id?: true
    packageAmount?: true
    gstamount?: true
    discount?: true
    paidAmount?: true
    weight?: true
    height?: true
    neck?: true
    shoulders?: true
    chest?: true
    biceps?: true
    upperAbs?: true
    waist?: true
    lowerAbs?: true
    hip?: true
    thigh?: true
    calf?: true
  }

  export type MemberSumAggregateInputType = {
    id?: true
    packageAmount?: true
    gstamount?: true
    discount?: true
    paidAmount?: true
    weight?: true
    height?: true
    neck?: true
    shoulders?: true
    chest?: true
    biceps?: true
    upperAbs?: true
    waist?: true
    lowerAbs?: true
    hip?: true
    thigh?: true
    calf?: true
  }

  export type MemberMinAggregateInputType = {
    id?: true
    memberID?: true
    firstName?: true
    lastName?: true
    email?: true
    mobileNumber?: true
    dateOfBirth?: true
    gender?: true
    maritalStatus?: true
    memberPhoto?: true
    homeContactNumber?: true
    bloodGroup?: true
    active?: true
    gstNumber?: true
    remarks?: true
    assignTrainer?: true
    gstType?: true
    packageType?: true
    isMainPackage?: true
    packageAmount?: true
    gstamount?: true
    duration?: true
    discount?: true
    paidAmount?: true
    paidDate?: true
    paymentMode?: true
    receiptType?: true
    startDate?: true
    fitnessDate?: true
    weight?: true
    height?: true
    neck?: true
    shoulders?: true
    chest?: true
    biceps?: true
    upperAbs?: true
    waist?: true
    lowerAbs?: true
    hip?: true
    thigh?: true
    calf?: true
    proofType?: true
    proofNo?: true
    expiryDate?: true
    proofDocument?: true
    createdAt?: true
    permanentAddress?: true
    communicationAddress?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    memberID?: true
    firstName?: true
    lastName?: true
    email?: true
    mobileNumber?: true
    dateOfBirth?: true
    gender?: true
    maritalStatus?: true
    memberPhoto?: true
    homeContactNumber?: true
    bloodGroup?: true
    active?: true
    gstNumber?: true
    remarks?: true
    assignTrainer?: true
    gstType?: true
    packageType?: true
    isMainPackage?: true
    packageAmount?: true
    gstamount?: true
    duration?: true
    discount?: true
    paidAmount?: true
    paidDate?: true
    paymentMode?: true
    receiptType?: true
    startDate?: true
    fitnessDate?: true
    weight?: true
    height?: true
    neck?: true
    shoulders?: true
    chest?: true
    biceps?: true
    upperAbs?: true
    waist?: true
    lowerAbs?: true
    hip?: true
    thigh?: true
    calf?: true
    proofType?: true
    proofNo?: true
    expiryDate?: true
    proofDocument?: true
    createdAt?: true
    permanentAddress?: true
    communicationAddress?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    memberID?: true
    firstName?: true
    lastName?: true
    email?: true
    mobileNumber?: true
    dateOfBirth?: true
    gender?: true
    maritalStatus?: true
    memberPhoto?: true
    homeContactNumber?: true
    bloodGroup?: true
    active?: true
    gstNumber?: true
    remarks?: true
    assignTrainer?: true
    gstType?: true
    packageType?: true
    isMainPackage?: true
    packageAmount?: true
    gstamount?: true
    duration?: true
    discount?: true
    paidAmount?: true
    paidDate?: true
    paymentMode?: true
    receiptType?: true
    startDate?: true
    fitnessDate?: true
    weight?: true
    height?: true
    neck?: true
    shoulders?: true
    chest?: true
    biceps?: true
    upperAbs?: true
    waist?: true
    lowerAbs?: true
    hip?: true
    thigh?: true
    calf?: true
    proofType?: true
    proofNo?: true
    expiryDate?: true
    proofDocument?: true
    createdAt?: true
    permanentAddress?: true
    communicationAddress?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _avg?: MemberAvgAggregateInputType
    _sum?: MemberSumAggregateInputType
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: number
    memberID: string
    firstName: string
    lastName: string | null
    email: string | null
    mobileNumber: string
    dateOfBirth: Date | null
    gender: string | null
    maritalStatus: string | null
    memberPhoto: string | null
    homeContactNumber: string | null
    bloodGroup: string | null
    active: boolean | null
    gstNumber: string | null
    remarks: string | null
    assignTrainer: string | null
    gstType: string | null
    packageType: string | null
    isMainPackage: boolean | null
    packageAmount: number | null
    gstamount: number | null
    duration: string | null
    discount: number | null
    paidAmount: number | null
    paidDate: Date | null
    paymentMode: string | null
    receiptType: string | null
    startDate: Date | null
    fitnessDate: Date | null
    weight: number | null
    height: number | null
    neck: number | null
    shoulders: number | null
    chest: number | null
    biceps: number | null
    upperAbs: number | null
    waist: number | null
    lowerAbs: number | null
    hip: number | null
    thigh: number | null
    calf: number | null
    proofType: string | null
    proofNo: string | null
    expiryDate: Date | null
    proofDocument: string | null
    createdAt: Date
    permanentAddress: string
    communicationAddress: string
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberID?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobileNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    maritalStatus?: boolean
    memberPhoto?: boolean
    homeContactNumber?: boolean
    bloodGroup?: boolean
    active?: boolean
    gstNumber?: boolean
    remarks?: boolean
    assignTrainer?: boolean
    gstType?: boolean
    packageType?: boolean
    isMainPackage?: boolean
    packageAmount?: boolean
    gstamount?: boolean
    duration?: boolean
    discount?: boolean
    paidAmount?: boolean
    paidDate?: boolean
    paymentMode?: boolean
    receiptType?: boolean
    startDate?: boolean
    fitnessDate?: boolean
    weight?: boolean
    height?: boolean
    neck?: boolean
    shoulders?: boolean
    chest?: boolean
    biceps?: boolean
    upperAbs?: boolean
    waist?: boolean
    lowerAbs?: boolean
    hip?: boolean
    thigh?: boolean
    calf?: boolean
    proofType?: boolean
    proofNo?: boolean
    expiryDate?: boolean
    proofDocument?: boolean
    createdAt?: boolean
    permanentAddress?: boolean
    communicationAddress?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberID?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobileNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    maritalStatus?: boolean
    memberPhoto?: boolean
    homeContactNumber?: boolean
    bloodGroup?: boolean
    active?: boolean
    gstNumber?: boolean
    remarks?: boolean
    assignTrainer?: boolean
    gstType?: boolean
    packageType?: boolean
    isMainPackage?: boolean
    packageAmount?: boolean
    gstamount?: boolean
    duration?: boolean
    discount?: boolean
    paidAmount?: boolean
    paidDate?: boolean
    paymentMode?: boolean
    receiptType?: boolean
    startDate?: boolean
    fitnessDate?: boolean
    weight?: boolean
    height?: boolean
    neck?: boolean
    shoulders?: boolean
    chest?: boolean
    biceps?: boolean
    upperAbs?: boolean
    waist?: boolean
    lowerAbs?: boolean
    hip?: boolean
    thigh?: boolean
    calf?: boolean
    proofType?: boolean
    proofNo?: boolean
    expiryDate?: boolean
    proofDocument?: boolean
    createdAt?: boolean
    permanentAddress?: boolean
    communicationAddress?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    memberID?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobileNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    maritalStatus?: boolean
    memberPhoto?: boolean
    homeContactNumber?: boolean
    bloodGroup?: boolean
    active?: boolean
    gstNumber?: boolean
    remarks?: boolean
    assignTrainer?: boolean
    gstType?: boolean
    packageType?: boolean
    isMainPackage?: boolean
    packageAmount?: boolean
    gstamount?: boolean
    duration?: boolean
    discount?: boolean
    paidAmount?: boolean
    paidDate?: boolean
    paymentMode?: boolean
    receiptType?: boolean
    startDate?: boolean
    fitnessDate?: boolean
    weight?: boolean
    height?: boolean
    neck?: boolean
    shoulders?: boolean
    chest?: boolean
    biceps?: boolean
    upperAbs?: boolean
    waist?: boolean
    lowerAbs?: boolean
    hip?: boolean
    thigh?: boolean
    calf?: boolean
    proofType?: boolean
    proofNo?: boolean
    expiryDate?: boolean
    proofDocument?: boolean
    createdAt?: boolean
    permanentAddress?: boolean
    communicationAddress?: boolean
  }


  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      memberID: string
      firstName: string
      lastName: string | null
      email: string | null
      mobileNumber: string
      dateOfBirth: Date | null
      gender: string | null
      maritalStatus: string | null
      memberPhoto: string | null
      homeContactNumber: string | null
      bloodGroup: string | null
      active: boolean | null
      gstNumber: string | null
      remarks: string | null
      assignTrainer: string | null
      gstType: string | null
      packageType: string | null
      isMainPackage: boolean | null
      packageAmount: number | null
      gstamount: number | null
      duration: string | null
      discount: number | null
      paidAmount: number | null
      paidDate: Date | null
      paymentMode: string | null
      receiptType: string | null
      startDate: Date | null
      fitnessDate: Date | null
      weight: number | null
      height: number | null
      neck: number | null
      shoulders: number | null
      chest: number | null
      biceps: number | null
      upperAbs: number | null
      waist: number | null
      lowerAbs: number | null
      hip: number | null
      thigh: number | null
      calf: number | null
      proofType: string | null
      proofNo: string | null
      expiryDate: Date | null
      proofDocument: string | null
      createdAt: Date
      permanentAddress: string
      communicationAddress: string
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */ 
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'Int'>
    readonly memberID: FieldRef<"Member", 'String'>
    readonly firstName: FieldRef<"Member", 'String'>
    readonly lastName: FieldRef<"Member", 'String'>
    readonly email: FieldRef<"Member", 'String'>
    readonly mobileNumber: FieldRef<"Member", 'String'>
    readonly dateOfBirth: FieldRef<"Member", 'DateTime'>
    readonly gender: FieldRef<"Member", 'String'>
    readonly maritalStatus: FieldRef<"Member", 'String'>
    readonly memberPhoto: FieldRef<"Member", 'String'>
    readonly homeContactNumber: FieldRef<"Member", 'String'>
    readonly bloodGroup: FieldRef<"Member", 'String'>
    readonly active: FieldRef<"Member", 'Boolean'>
    readonly gstNumber: FieldRef<"Member", 'String'>
    readonly remarks: FieldRef<"Member", 'String'>
    readonly assignTrainer: FieldRef<"Member", 'String'>
    readonly gstType: FieldRef<"Member", 'String'>
    readonly packageType: FieldRef<"Member", 'String'>
    readonly isMainPackage: FieldRef<"Member", 'Boolean'>
    readonly packageAmount: FieldRef<"Member", 'Float'>
    readonly gstamount: FieldRef<"Member", 'Float'>
    readonly duration: FieldRef<"Member", 'String'>
    readonly discount: FieldRef<"Member", 'Float'>
    readonly paidAmount: FieldRef<"Member", 'Float'>
    readonly paidDate: FieldRef<"Member", 'DateTime'>
    readonly paymentMode: FieldRef<"Member", 'String'>
    readonly receiptType: FieldRef<"Member", 'String'>
    readonly startDate: FieldRef<"Member", 'DateTime'>
    readonly fitnessDate: FieldRef<"Member", 'DateTime'>
    readonly weight: FieldRef<"Member", 'Float'>
    readonly height: FieldRef<"Member", 'Float'>
    readonly neck: FieldRef<"Member", 'Float'>
    readonly shoulders: FieldRef<"Member", 'Float'>
    readonly chest: FieldRef<"Member", 'Float'>
    readonly biceps: FieldRef<"Member", 'Float'>
    readonly upperAbs: FieldRef<"Member", 'Float'>
    readonly waist: FieldRef<"Member", 'Float'>
    readonly lowerAbs: FieldRef<"Member", 'Float'>
    readonly hip: FieldRef<"Member", 'Float'>
    readonly thigh: FieldRef<"Member", 'Float'>
    readonly calf: FieldRef<"Member", 'Float'>
    readonly proofType: FieldRef<"Member", 'String'>
    readonly proofNo: FieldRef<"Member", 'String'>
    readonly expiryDate: FieldRef<"Member", 'DateTime'>
    readonly proofDocument: FieldRef<"Member", 'String'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly permanentAddress: FieldRef<"Member", 'String'>
    readonly communicationAddress: FieldRef<"Member", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
  }


  /**
   * Model Enquiry
   */

  export type AggregateEnquiry = {
    _count: EnquiryCountAggregateOutputType | null
    _avg: EnquiryAvgAggregateOutputType | null
    _sum: EnquirySumAggregateOutputType | null
    _min: EnquiryMinAggregateOutputType | null
    _max: EnquiryMaxAggregateOutputType | null
  }

  export type EnquiryAvgAggregateOutputType = {
    id: number | null
  }

  export type EnquirySumAggregateOutputType = {
    id: number | null
  }

  export type EnquiryMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    mobileNumber: string | null
    email: string | null
    alternateContact: string | null
    enquiryFor: string | null
    status: string | null
    howToKnowAboutUs: string | null
    enquiryDate: Date | null
    expectedJoiningDate: Date | null
    followUpDate: Date | null
    remarks: string | null
  }

  export type EnquiryMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    mobileNumber: string | null
    email: string | null
    alternateContact: string | null
    enquiryFor: string | null
    status: string | null
    howToKnowAboutUs: string | null
    enquiryDate: Date | null
    expectedJoiningDate: Date | null
    followUpDate: Date | null
    remarks: string | null
  }

  export type EnquiryCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    mobileNumber: number
    email: number
    alternateContact: number
    enquiryFor: number
    status: number
    howToKnowAboutUs: number
    enquiryDate: number
    expectedJoiningDate: number
    followUpDate: number
    remarks: number
    _all: number
  }


  export type EnquiryAvgAggregateInputType = {
    id?: true
  }

  export type EnquirySumAggregateInputType = {
    id?: true
  }

  export type EnquiryMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobileNumber?: true
    email?: true
    alternateContact?: true
    enquiryFor?: true
    status?: true
    howToKnowAboutUs?: true
    enquiryDate?: true
    expectedJoiningDate?: true
    followUpDate?: true
    remarks?: true
  }

  export type EnquiryMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobileNumber?: true
    email?: true
    alternateContact?: true
    enquiryFor?: true
    status?: true
    howToKnowAboutUs?: true
    enquiryDate?: true
    expectedJoiningDate?: true
    followUpDate?: true
    remarks?: true
  }

  export type EnquiryCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobileNumber?: true
    email?: true
    alternateContact?: true
    enquiryFor?: true
    status?: true
    howToKnowAboutUs?: true
    enquiryDate?: true
    expectedJoiningDate?: true
    followUpDate?: true
    remarks?: true
    _all?: true
  }

  export type EnquiryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enquiry to aggregate.
     */
    where?: EnquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enquiries to fetch.
     */
    orderBy?: EnquiryOrderByWithRelationInput | EnquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enquiries
    **/
    _count?: true | EnquiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnquiryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnquirySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnquiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnquiryMaxAggregateInputType
  }

  export type GetEnquiryAggregateType<T extends EnquiryAggregateArgs> = {
        [P in keyof T & keyof AggregateEnquiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnquiry[P]>
      : GetScalarType<T[P], AggregateEnquiry[P]>
  }




  export type EnquiryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnquiryWhereInput
    orderBy?: EnquiryOrderByWithAggregationInput | EnquiryOrderByWithAggregationInput[]
    by: EnquiryScalarFieldEnum[] | EnquiryScalarFieldEnum
    having?: EnquiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnquiryCountAggregateInputType | true
    _avg?: EnquiryAvgAggregateInputType
    _sum?: EnquirySumAggregateInputType
    _min?: EnquiryMinAggregateInputType
    _max?: EnquiryMaxAggregateInputType
  }

  export type EnquiryGroupByOutputType = {
    id: number
    firstName: string
    lastName: string | null
    mobileNumber: string
    email: string | null
    alternateContact: string | null
    enquiryFor: string
    status: string
    howToKnowAboutUs: string
    enquiryDate: Date
    expectedJoiningDate: Date | null
    followUpDate: Date
    remarks: string | null
    _count: EnquiryCountAggregateOutputType | null
    _avg: EnquiryAvgAggregateOutputType | null
    _sum: EnquirySumAggregateOutputType | null
    _min: EnquiryMinAggregateOutputType | null
    _max: EnquiryMaxAggregateOutputType | null
  }

  type GetEnquiryGroupByPayload<T extends EnquiryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnquiryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnquiryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnquiryGroupByOutputType[P]>
            : GetScalarType<T[P], EnquiryGroupByOutputType[P]>
        }
      >
    >


  export type EnquirySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobileNumber?: boolean
    email?: boolean
    alternateContact?: boolean
    enquiryFor?: boolean
    status?: boolean
    howToKnowAboutUs?: boolean
    enquiryDate?: boolean
    expectedJoiningDate?: boolean
    followUpDate?: boolean
    remarks?: boolean
  }, ExtArgs["result"]["enquiry"]>

  export type EnquirySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobileNumber?: boolean
    email?: boolean
    alternateContact?: boolean
    enquiryFor?: boolean
    status?: boolean
    howToKnowAboutUs?: boolean
    enquiryDate?: boolean
    expectedJoiningDate?: boolean
    followUpDate?: boolean
    remarks?: boolean
  }, ExtArgs["result"]["enquiry"]>

  export type EnquirySelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobileNumber?: boolean
    email?: boolean
    alternateContact?: boolean
    enquiryFor?: boolean
    status?: boolean
    howToKnowAboutUs?: boolean
    enquiryDate?: boolean
    expectedJoiningDate?: boolean
    followUpDate?: boolean
    remarks?: boolean
  }


  export type $EnquiryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enquiry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string | null
      mobileNumber: string
      email: string | null
      alternateContact: string | null
      enquiryFor: string
      status: string
      howToKnowAboutUs: string
      enquiryDate: Date
      expectedJoiningDate: Date | null
      followUpDate: Date
      remarks: string | null
    }, ExtArgs["result"]["enquiry"]>
    composites: {}
  }

  type EnquiryGetPayload<S extends boolean | null | undefined | EnquiryDefaultArgs> = $Result.GetResult<Prisma.$EnquiryPayload, S>

  type EnquiryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EnquiryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EnquiryCountAggregateInputType | true
    }

  export interface EnquiryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enquiry'], meta: { name: 'Enquiry' } }
    /**
     * Find zero or one Enquiry that matches the filter.
     * @param {EnquiryFindUniqueArgs} args - Arguments to find a Enquiry
     * @example
     * // Get one Enquiry
     * const enquiry = await prisma.enquiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnquiryFindUniqueArgs>(args: SelectSubset<T, EnquiryFindUniqueArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Enquiry that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EnquiryFindUniqueOrThrowArgs} args - Arguments to find a Enquiry
     * @example
     * // Get one Enquiry
     * const enquiry = await prisma.enquiry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnquiryFindUniqueOrThrowArgs>(args: SelectSubset<T, EnquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Enquiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryFindFirstArgs} args - Arguments to find a Enquiry
     * @example
     * // Get one Enquiry
     * const enquiry = await prisma.enquiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnquiryFindFirstArgs>(args?: SelectSubset<T, EnquiryFindFirstArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Enquiry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryFindFirstOrThrowArgs} args - Arguments to find a Enquiry
     * @example
     * // Get one Enquiry
     * const enquiry = await prisma.enquiry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnquiryFindFirstOrThrowArgs>(args?: SelectSubset<T, EnquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Enquiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enquiries
     * const enquiries = await prisma.enquiry.findMany()
     * 
     * // Get first 10 Enquiries
     * const enquiries = await prisma.enquiry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enquiryWithIdOnly = await prisma.enquiry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnquiryFindManyArgs>(args?: SelectSubset<T, EnquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Enquiry.
     * @param {EnquiryCreateArgs} args - Arguments to create a Enquiry.
     * @example
     * // Create one Enquiry
     * const Enquiry = await prisma.enquiry.create({
     *   data: {
     *     // ... data to create a Enquiry
     *   }
     * })
     * 
     */
    create<T extends EnquiryCreateArgs>(args: SelectSubset<T, EnquiryCreateArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Enquiries.
     * @param {EnquiryCreateManyArgs} args - Arguments to create many Enquiries.
     * @example
     * // Create many Enquiries
     * const enquiry = await prisma.enquiry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnquiryCreateManyArgs>(args?: SelectSubset<T, EnquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enquiries and returns the data saved in the database.
     * @param {EnquiryCreateManyAndReturnArgs} args - Arguments to create many Enquiries.
     * @example
     * // Create many Enquiries
     * const enquiry = await prisma.enquiry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enquiries and only return the `id`
     * const enquiryWithIdOnly = await prisma.enquiry.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnquiryCreateManyAndReturnArgs>(args?: SelectSubset<T, EnquiryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Enquiry.
     * @param {EnquiryDeleteArgs} args - Arguments to delete one Enquiry.
     * @example
     * // Delete one Enquiry
     * const Enquiry = await prisma.enquiry.delete({
     *   where: {
     *     // ... filter to delete one Enquiry
     *   }
     * })
     * 
     */
    delete<T extends EnquiryDeleteArgs>(args: SelectSubset<T, EnquiryDeleteArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Enquiry.
     * @param {EnquiryUpdateArgs} args - Arguments to update one Enquiry.
     * @example
     * // Update one Enquiry
     * const enquiry = await prisma.enquiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnquiryUpdateArgs>(args: SelectSubset<T, EnquiryUpdateArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Enquiries.
     * @param {EnquiryDeleteManyArgs} args - Arguments to filter Enquiries to delete.
     * @example
     * // Delete a few Enquiries
     * const { count } = await prisma.enquiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnquiryDeleteManyArgs>(args?: SelectSubset<T, EnquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enquiries
     * const enquiry = await prisma.enquiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnquiryUpdateManyArgs>(args: SelectSubset<T, EnquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Enquiry.
     * @param {EnquiryUpsertArgs} args - Arguments to update or create a Enquiry.
     * @example
     * // Update or create a Enquiry
     * const enquiry = await prisma.enquiry.upsert({
     *   create: {
     *     // ... data to create a Enquiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enquiry we want to update
     *   }
     * })
     */
    upsert<T extends EnquiryUpsertArgs>(args: SelectSubset<T, EnquiryUpsertArgs<ExtArgs>>): Prisma__EnquiryClient<$Result.GetResult<Prisma.$EnquiryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Enquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryCountArgs} args - Arguments to filter Enquiries to count.
     * @example
     * // Count the number of Enquiries
     * const count = await prisma.enquiry.count({
     *   where: {
     *     // ... the filter for the Enquiries we want to count
     *   }
     * })
    **/
    count<T extends EnquiryCountArgs>(
      args?: Subset<T, EnquiryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnquiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnquiryAggregateArgs>(args: Subset<T, EnquiryAggregateArgs>): Prisma.PrismaPromise<GetEnquiryAggregateType<T>>

    /**
     * Group by Enquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnquiryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnquiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnquiryGroupByArgs['orderBy'] }
        : { orderBy?: EnquiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enquiry model
   */
  readonly fields: EnquiryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enquiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnquiryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enquiry model
   */ 
  interface EnquiryFieldRefs {
    readonly id: FieldRef<"Enquiry", 'Int'>
    readonly firstName: FieldRef<"Enquiry", 'String'>
    readonly lastName: FieldRef<"Enquiry", 'String'>
    readonly mobileNumber: FieldRef<"Enquiry", 'String'>
    readonly email: FieldRef<"Enquiry", 'String'>
    readonly alternateContact: FieldRef<"Enquiry", 'String'>
    readonly enquiryFor: FieldRef<"Enquiry", 'String'>
    readonly status: FieldRef<"Enquiry", 'String'>
    readonly howToKnowAboutUs: FieldRef<"Enquiry", 'String'>
    readonly enquiryDate: FieldRef<"Enquiry", 'DateTime'>
    readonly expectedJoiningDate: FieldRef<"Enquiry", 'DateTime'>
    readonly followUpDate: FieldRef<"Enquiry", 'DateTime'>
    readonly remarks: FieldRef<"Enquiry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Enquiry findUnique
   */
  export type EnquiryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * Filter, which Enquiry to fetch.
     */
    where: EnquiryWhereUniqueInput
  }

  /**
   * Enquiry findUniqueOrThrow
   */
  export type EnquiryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * Filter, which Enquiry to fetch.
     */
    where: EnquiryWhereUniqueInput
  }

  /**
   * Enquiry findFirst
   */
  export type EnquiryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * Filter, which Enquiry to fetch.
     */
    where?: EnquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enquiries to fetch.
     */
    orderBy?: EnquiryOrderByWithRelationInput | EnquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enquiries.
     */
    cursor?: EnquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enquiries.
     */
    distinct?: EnquiryScalarFieldEnum | EnquiryScalarFieldEnum[]
  }

  /**
   * Enquiry findFirstOrThrow
   */
  export type EnquiryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * Filter, which Enquiry to fetch.
     */
    where?: EnquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enquiries to fetch.
     */
    orderBy?: EnquiryOrderByWithRelationInput | EnquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enquiries.
     */
    cursor?: EnquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enquiries.
     */
    distinct?: EnquiryScalarFieldEnum | EnquiryScalarFieldEnum[]
  }

  /**
   * Enquiry findMany
   */
  export type EnquiryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * Filter, which Enquiries to fetch.
     */
    where?: EnquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enquiries to fetch.
     */
    orderBy?: EnquiryOrderByWithRelationInput | EnquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enquiries.
     */
    cursor?: EnquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enquiries.
     */
    skip?: number
    distinct?: EnquiryScalarFieldEnum | EnquiryScalarFieldEnum[]
  }

  /**
   * Enquiry create
   */
  export type EnquiryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * The data needed to create a Enquiry.
     */
    data: XOR<EnquiryCreateInput, EnquiryUncheckedCreateInput>
  }

  /**
   * Enquiry createMany
   */
  export type EnquiryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enquiries.
     */
    data: EnquiryCreateManyInput | EnquiryCreateManyInput[]
  }

  /**
   * Enquiry createManyAndReturn
   */
  export type EnquiryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Enquiries.
     */
    data: EnquiryCreateManyInput | EnquiryCreateManyInput[]
  }

  /**
   * Enquiry update
   */
  export type EnquiryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * The data needed to update a Enquiry.
     */
    data: XOR<EnquiryUpdateInput, EnquiryUncheckedUpdateInput>
    /**
     * Choose, which Enquiry to update.
     */
    where: EnquiryWhereUniqueInput
  }

  /**
   * Enquiry updateMany
   */
  export type EnquiryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enquiries.
     */
    data: XOR<EnquiryUpdateManyMutationInput, EnquiryUncheckedUpdateManyInput>
    /**
     * Filter which Enquiries to update
     */
    where?: EnquiryWhereInput
  }

  /**
   * Enquiry upsert
   */
  export type EnquiryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * The filter to search for the Enquiry to update in case it exists.
     */
    where: EnquiryWhereUniqueInput
    /**
     * In case the Enquiry found by the `where` argument doesn't exist, create a new Enquiry with this data.
     */
    create: XOR<EnquiryCreateInput, EnquiryUncheckedCreateInput>
    /**
     * In case the Enquiry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnquiryUpdateInput, EnquiryUncheckedUpdateInput>
  }

  /**
   * Enquiry delete
   */
  export type EnquiryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
    /**
     * Filter which Enquiry to delete.
     */
    where: EnquiryWhereUniqueInput
  }

  /**
   * Enquiry deleteMany
   */
  export type EnquiryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enquiries to delete
     */
    where?: EnquiryWhereInput
  }

  /**
   * Enquiry without action
   */
  export type EnquiryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enquiry
     */
    select?: EnquirySelect<ExtArgs> | null
  }


  /**
   * Model DietPlan
   */

  export type AggregateDietPlan = {
    _count: DietPlanCountAggregateOutputType | null
    _avg: DietPlanAvgAggregateOutputType | null
    _sum: DietPlanSumAggregateOutputType | null
    _min: DietPlanMinAggregateOutputType | null
    _max: DietPlanMaxAggregateOutputType | null
  }

  export type DietPlanAvgAggregateOutputType = {
    id: number | null
    assignedCount: number | null
  }

  export type DietPlanSumAggregateOutputType = {
    id: number | null
    assignedCount: number | null
  }

  export type DietPlanMinAggregateOutputType = {
    id: number | null
    chartName: string | null
    chartTable: string | null
    file: string | null
    createdDate: Date | null
    assignedCount: number | null
    assign: string | null
  }

  export type DietPlanMaxAggregateOutputType = {
    id: number | null
    chartName: string | null
    chartTable: string | null
    file: string | null
    createdDate: Date | null
    assignedCount: number | null
    assign: string | null
  }

  export type DietPlanCountAggregateOutputType = {
    id: number
    chartName: number
    chartTable: number
    file: number
    createdDate: number
    assignedCount: number
    assign: number
    _all: number
  }


  export type DietPlanAvgAggregateInputType = {
    id?: true
    assignedCount?: true
  }

  export type DietPlanSumAggregateInputType = {
    id?: true
    assignedCount?: true
  }

  export type DietPlanMinAggregateInputType = {
    id?: true
    chartName?: true
    chartTable?: true
    file?: true
    createdDate?: true
    assignedCount?: true
    assign?: true
  }

  export type DietPlanMaxAggregateInputType = {
    id?: true
    chartName?: true
    chartTable?: true
    file?: true
    createdDate?: true
    assignedCount?: true
    assign?: true
  }

  export type DietPlanCountAggregateInputType = {
    id?: true
    chartName?: true
    chartTable?: true
    file?: true
    createdDate?: true
    assignedCount?: true
    assign?: true
    _all?: true
  }

  export type DietPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DietPlan to aggregate.
     */
    where?: DietPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietPlans to fetch.
     */
    orderBy?: DietPlanOrderByWithRelationInput | DietPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DietPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DietPlans
    **/
    _count?: true | DietPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DietPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DietPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DietPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DietPlanMaxAggregateInputType
  }

  export type GetDietPlanAggregateType<T extends DietPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateDietPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDietPlan[P]>
      : GetScalarType<T[P], AggregateDietPlan[P]>
  }




  export type DietPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DietPlanWhereInput
    orderBy?: DietPlanOrderByWithAggregationInput | DietPlanOrderByWithAggregationInput[]
    by: DietPlanScalarFieldEnum[] | DietPlanScalarFieldEnum
    having?: DietPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DietPlanCountAggregateInputType | true
    _avg?: DietPlanAvgAggregateInputType
    _sum?: DietPlanSumAggregateInputType
    _min?: DietPlanMinAggregateInputType
    _max?: DietPlanMaxAggregateInputType
  }

  export type DietPlanGroupByOutputType = {
    id: number
    chartName: string
    chartTable: string
    file: string | null
    createdDate: Date
    assignedCount: number | null
    assign: string | null
    _count: DietPlanCountAggregateOutputType | null
    _avg: DietPlanAvgAggregateOutputType | null
    _sum: DietPlanSumAggregateOutputType | null
    _min: DietPlanMinAggregateOutputType | null
    _max: DietPlanMaxAggregateOutputType | null
  }

  type GetDietPlanGroupByPayload<T extends DietPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DietPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DietPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DietPlanGroupByOutputType[P]>
            : GetScalarType<T[P], DietPlanGroupByOutputType[P]>
        }
      >
    >


  export type DietPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chartName?: boolean
    chartTable?: boolean
    file?: boolean
    createdDate?: boolean
    assignedCount?: boolean
    assign?: boolean
  }, ExtArgs["result"]["dietPlan"]>

  export type DietPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chartName?: boolean
    chartTable?: boolean
    file?: boolean
    createdDate?: boolean
    assignedCount?: boolean
    assign?: boolean
  }, ExtArgs["result"]["dietPlan"]>

  export type DietPlanSelectScalar = {
    id?: boolean
    chartName?: boolean
    chartTable?: boolean
    file?: boolean
    createdDate?: boolean
    assignedCount?: boolean
    assign?: boolean
  }


  export type $DietPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DietPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      chartName: string
      chartTable: string
      file: string | null
      createdDate: Date
      assignedCount: number | null
      assign: string | null
    }, ExtArgs["result"]["dietPlan"]>
    composites: {}
  }

  type DietPlanGetPayload<S extends boolean | null | undefined | DietPlanDefaultArgs> = $Result.GetResult<Prisma.$DietPlanPayload, S>

  type DietPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DietPlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DietPlanCountAggregateInputType | true
    }

  export interface DietPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DietPlan'], meta: { name: 'DietPlan' } }
    /**
     * Find zero or one DietPlan that matches the filter.
     * @param {DietPlanFindUniqueArgs} args - Arguments to find a DietPlan
     * @example
     * // Get one DietPlan
     * const dietPlan = await prisma.dietPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DietPlanFindUniqueArgs>(args: SelectSubset<T, DietPlanFindUniqueArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DietPlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DietPlanFindUniqueOrThrowArgs} args - Arguments to find a DietPlan
     * @example
     * // Get one DietPlan
     * const dietPlan = await prisma.dietPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DietPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, DietPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DietPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanFindFirstArgs} args - Arguments to find a DietPlan
     * @example
     * // Get one DietPlan
     * const dietPlan = await prisma.dietPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DietPlanFindFirstArgs>(args?: SelectSubset<T, DietPlanFindFirstArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DietPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanFindFirstOrThrowArgs} args - Arguments to find a DietPlan
     * @example
     * // Get one DietPlan
     * const dietPlan = await prisma.dietPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DietPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, DietPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DietPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DietPlans
     * const dietPlans = await prisma.dietPlan.findMany()
     * 
     * // Get first 10 DietPlans
     * const dietPlans = await prisma.dietPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dietPlanWithIdOnly = await prisma.dietPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DietPlanFindManyArgs>(args?: SelectSubset<T, DietPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DietPlan.
     * @param {DietPlanCreateArgs} args - Arguments to create a DietPlan.
     * @example
     * // Create one DietPlan
     * const DietPlan = await prisma.dietPlan.create({
     *   data: {
     *     // ... data to create a DietPlan
     *   }
     * })
     * 
     */
    create<T extends DietPlanCreateArgs>(args: SelectSubset<T, DietPlanCreateArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DietPlans.
     * @param {DietPlanCreateManyArgs} args - Arguments to create many DietPlans.
     * @example
     * // Create many DietPlans
     * const dietPlan = await prisma.dietPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DietPlanCreateManyArgs>(args?: SelectSubset<T, DietPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DietPlans and returns the data saved in the database.
     * @param {DietPlanCreateManyAndReturnArgs} args - Arguments to create many DietPlans.
     * @example
     * // Create many DietPlans
     * const dietPlan = await prisma.dietPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DietPlans and only return the `id`
     * const dietPlanWithIdOnly = await prisma.dietPlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DietPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, DietPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DietPlan.
     * @param {DietPlanDeleteArgs} args - Arguments to delete one DietPlan.
     * @example
     * // Delete one DietPlan
     * const DietPlan = await prisma.dietPlan.delete({
     *   where: {
     *     // ... filter to delete one DietPlan
     *   }
     * })
     * 
     */
    delete<T extends DietPlanDeleteArgs>(args: SelectSubset<T, DietPlanDeleteArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DietPlan.
     * @param {DietPlanUpdateArgs} args - Arguments to update one DietPlan.
     * @example
     * // Update one DietPlan
     * const dietPlan = await prisma.dietPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DietPlanUpdateArgs>(args: SelectSubset<T, DietPlanUpdateArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DietPlans.
     * @param {DietPlanDeleteManyArgs} args - Arguments to filter DietPlans to delete.
     * @example
     * // Delete a few DietPlans
     * const { count } = await prisma.dietPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DietPlanDeleteManyArgs>(args?: SelectSubset<T, DietPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DietPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DietPlans
     * const dietPlan = await prisma.dietPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DietPlanUpdateManyArgs>(args: SelectSubset<T, DietPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DietPlan.
     * @param {DietPlanUpsertArgs} args - Arguments to update or create a DietPlan.
     * @example
     * // Update or create a DietPlan
     * const dietPlan = await prisma.dietPlan.upsert({
     *   create: {
     *     // ... data to create a DietPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DietPlan we want to update
     *   }
     * })
     */
    upsert<T extends DietPlanUpsertArgs>(args: SelectSubset<T, DietPlanUpsertArgs<ExtArgs>>): Prisma__DietPlanClient<$Result.GetResult<Prisma.$DietPlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DietPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanCountArgs} args - Arguments to filter DietPlans to count.
     * @example
     * // Count the number of DietPlans
     * const count = await prisma.dietPlan.count({
     *   where: {
     *     // ... the filter for the DietPlans we want to count
     *   }
     * })
    **/
    count<T extends DietPlanCountArgs>(
      args?: Subset<T, DietPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DietPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DietPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DietPlanAggregateArgs>(args: Subset<T, DietPlanAggregateArgs>): Prisma.PrismaPromise<GetDietPlanAggregateType<T>>

    /**
     * Group by DietPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DietPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DietPlanGroupByArgs['orderBy'] }
        : { orderBy?: DietPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DietPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDietPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DietPlan model
   */
  readonly fields: DietPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DietPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DietPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DietPlan model
   */ 
  interface DietPlanFieldRefs {
    readonly id: FieldRef<"DietPlan", 'Int'>
    readonly chartName: FieldRef<"DietPlan", 'String'>
    readonly chartTable: FieldRef<"DietPlan", 'String'>
    readonly file: FieldRef<"DietPlan", 'String'>
    readonly createdDate: FieldRef<"DietPlan", 'DateTime'>
    readonly assignedCount: FieldRef<"DietPlan", 'Int'>
    readonly assign: FieldRef<"DietPlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DietPlan findUnique
   */
  export type DietPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * Filter, which DietPlan to fetch.
     */
    where: DietPlanWhereUniqueInput
  }

  /**
   * DietPlan findUniqueOrThrow
   */
  export type DietPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * Filter, which DietPlan to fetch.
     */
    where: DietPlanWhereUniqueInput
  }

  /**
   * DietPlan findFirst
   */
  export type DietPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * Filter, which DietPlan to fetch.
     */
    where?: DietPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietPlans to fetch.
     */
    orderBy?: DietPlanOrderByWithRelationInput | DietPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DietPlans.
     */
    cursor?: DietPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DietPlans.
     */
    distinct?: DietPlanScalarFieldEnum | DietPlanScalarFieldEnum[]
  }

  /**
   * DietPlan findFirstOrThrow
   */
  export type DietPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * Filter, which DietPlan to fetch.
     */
    where?: DietPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietPlans to fetch.
     */
    orderBy?: DietPlanOrderByWithRelationInput | DietPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DietPlans.
     */
    cursor?: DietPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DietPlans.
     */
    distinct?: DietPlanScalarFieldEnum | DietPlanScalarFieldEnum[]
  }

  /**
   * DietPlan findMany
   */
  export type DietPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * Filter, which DietPlans to fetch.
     */
    where?: DietPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietPlans to fetch.
     */
    orderBy?: DietPlanOrderByWithRelationInput | DietPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DietPlans.
     */
    cursor?: DietPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietPlans.
     */
    skip?: number
    distinct?: DietPlanScalarFieldEnum | DietPlanScalarFieldEnum[]
  }

  /**
   * DietPlan create
   */
  export type DietPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * The data needed to create a DietPlan.
     */
    data: XOR<DietPlanCreateInput, DietPlanUncheckedCreateInput>
  }

  /**
   * DietPlan createMany
   */
  export type DietPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DietPlans.
     */
    data: DietPlanCreateManyInput | DietPlanCreateManyInput[]
  }

  /**
   * DietPlan createManyAndReturn
   */
  export type DietPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DietPlans.
     */
    data: DietPlanCreateManyInput | DietPlanCreateManyInput[]
  }

  /**
   * DietPlan update
   */
  export type DietPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * The data needed to update a DietPlan.
     */
    data: XOR<DietPlanUpdateInput, DietPlanUncheckedUpdateInput>
    /**
     * Choose, which DietPlan to update.
     */
    where: DietPlanWhereUniqueInput
  }

  /**
   * DietPlan updateMany
   */
  export type DietPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DietPlans.
     */
    data: XOR<DietPlanUpdateManyMutationInput, DietPlanUncheckedUpdateManyInput>
    /**
     * Filter which DietPlans to update
     */
    where?: DietPlanWhereInput
  }

  /**
   * DietPlan upsert
   */
  export type DietPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * The filter to search for the DietPlan to update in case it exists.
     */
    where: DietPlanWhereUniqueInput
    /**
     * In case the DietPlan found by the `where` argument doesn't exist, create a new DietPlan with this data.
     */
    create: XOR<DietPlanCreateInput, DietPlanUncheckedCreateInput>
    /**
     * In case the DietPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DietPlanUpdateInput, DietPlanUncheckedUpdateInput>
  }

  /**
   * DietPlan delete
   */
  export type DietPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
    /**
     * Filter which DietPlan to delete.
     */
    where: DietPlanWhereUniqueInput
  }

  /**
   * DietPlan deleteMany
   */
  export type DietPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DietPlans to delete
     */
    where?: DietPlanWhereInput
  }

  /**
   * DietPlan without action
   */
  export type DietPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietPlan
     */
    select?: DietPlanSelect<ExtArgs> | null
  }


  /**
   * Model ExercisePlan
   */

  export type AggregateExercisePlan = {
    _count: ExercisePlanCountAggregateOutputType | null
    _avg: ExercisePlanAvgAggregateOutputType | null
    _sum: ExercisePlanSumAggregateOutputType | null
    _min: ExercisePlanMinAggregateOutputType | null
    _max: ExercisePlanMaxAggregateOutputType | null
  }

  export type ExercisePlanAvgAggregateOutputType = {
    id: number | null
  }

  export type ExercisePlanSumAggregateOutputType = {
    id: number | null
  }

  export type ExercisePlanMinAggregateOutputType = {
    id: number | null
    planname: string | null
    warmUp: string | null
    details: string | null
    assign: string | null
    createdDate: Date | null
    file: string | null
  }

  export type ExercisePlanMaxAggregateOutputType = {
    id: number | null
    planname: string | null
    warmUp: string | null
    details: string | null
    assign: string | null
    createdDate: Date | null
    file: string | null
  }

  export type ExercisePlanCountAggregateOutputType = {
    id: number
    planname: number
    warmUp: number
    details: number
    assign: number
    createdDate: number
    file: number
    _all: number
  }


  export type ExercisePlanAvgAggregateInputType = {
    id?: true
  }

  export type ExercisePlanSumAggregateInputType = {
    id?: true
  }

  export type ExercisePlanMinAggregateInputType = {
    id?: true
    planname?: true
    warmUp?: true
    details?: true
    assign?: true
    createdDate?: true
    file?: true
  }

  export type ExercisePlanMaxAggregateInputType = {
    id?: true
    planname?: true
    warmUp?: true
    details?: true
    assign?: true
    createdDate?: true
    file?: true
  }

  export type ExercisePlanCountAggregateInputType = {
    id?: true
    planname?: true
    warmUp?: true
    details?: true
    assign?: true
    createdDate?: true
    file?: true
    _all?: true
  }

  export type ExercisePlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExercisePlan to aggregate.
     */
    where?: ExercisePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExercisePlans to fetch.
     */
    orderBy?: ExercisePlanOrderByWithRelationInput | ExercisePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExercisePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExercisePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExercisePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExercisePlans
    **/
    _count?: true | ExercisePlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExercisePlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExercisePlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExercisePlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExercisePlanMaxAggregateInputType
  }

  export type GetExercisePlanAggregateType<T extends ExercisePlanAggregateArgs> = {
        [P in keyof T & keyof AggregateExercisePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercisePlan[P]>
      : GetScalarType<T[P], AggregateExercisePlan[P]>
  }




  export type ExercisePlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExercisePlanWhereInput
    orderBy?: ExercisePlanOrderByWithAggregationInput | ExercisePlanOrderByWithAggregationInput[]
    by: ExercisePlanScalarFieldEnum[] | ExercisePlanScalarFieldEnum
    having?: ExercisePlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExercisePlanCountAggregateInputType | true
    _avg?: ExercisePlanAvgAggregateInputType
    _sum?: ExercisePlanSumAggregateInputType
    _min?: ExercisePlanMinAggregateInputType
    _max?: ExercisePlanMaxAggregateInputType
  }

  export type ExercisePlanGroupByOutputType = {
    id: number
    planname: string
    warmUp: string | null
    details: string
    assign: string | null
    createdDate: Date
    file: string | null
    _count: ExercisePlanCountAggregateOutputType | null
    _avg: ExercisePlanAvgAggregateOutputType | null
    _sum: ExercisePlanSumAggregateOutputType | null
    _min: ExercisePlanMinAggregateOutputType | null
    _max: ExercisePlanMaxAggregateOutputType | null
  }

  type GetExercisePlanGroupByPayload<T extends ExercisePlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExercisePlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExercisePlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExercisePlanGroupByOutputType[P]>
            : GetScalarType<T[P], ExercisePlanGroupByOutputType[P]>
        }
      >
    >


  export type ExercisePlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planname?: boolean
    warmUp?: boolean
    details?: boolean
    assign?: boolean
    createdDate?: boolean
    file?: boolean
  }, ExtArgs["result"]["exercisePlan"]>

  export type ExercisePlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planname?: boolean
    warmUp?: boolean
    details?: boolean
    assign?: boolean
    createdDate?: boolean
    file?: boolean
  }, ExtArgs["result"]["exercisePlan"]>

  export type ExercisePlanSelectScalar = {
    id?: boolean
    planname?: boolean
    warmUp?: boolean
    details?: boolean
    assign?: boolean
    createdDate?: boolean
    file?: boolean
  }


  export type $ExercisePlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExercisePlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      planname: string
      warmUp: string | null
      details: string
      assign: string | null
      createdDate: Date
      file: string | null
    }, ExtArgs["result"]["exercisePlan"]>
    composites: {}
  }

  type ExercisePlanGetPayload<S extends boolean | null | undefined | ExercisePlanDefaultArgs> = $Result.GetResult<Prisma.$ExercisePlanPayload, S>

  type ExercisePlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExercisePlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExercisePlanCountAggregateInputType | true
    }

  export interface ExercisePlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExercisePlan'], meta: { name: 'ExercisePlan' } }
    /**
     * Find zero or one ExercisePlan that matches the filter.
     * @param {ExercisePlanFindUniqueArgs} args - Arguments to find a ExercisePlan
     * @example
     * // Get one ExercisePlan
     * const exercisePlan = await prisma.exercisePlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExercisePlanFindUniqueArgs>(args: SelectSubset<T, ExercisePlanFindUniqueArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExercisePlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExercisePlanFindUniqueOrThrowArgs} args - Arguments to find a ExercisePlan
     * @example
     * // Get one ExercisePlan
     * const exercisePlan = await prisma.exercisePlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExercisePlanFindUniqueOrThrowArgs>(args: SelectSubset<T, ExercisePlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExercisePlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanFindFirstArgs} args - Arguments to find a ExercisePlan
     * @example
     * // Get one ExercisePlan
     * const exercisePlan = await prisma.exercisePlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExercisePlanFindFirstArgs>(args?: SelectSubset<T, ExercisePlanFindFirstArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExercisePlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanFindFirstOrThrowArgs} args - Arguments to find a ExercisePlan
     * @example
     * // Get one ExercisePlan
     * const exercisePlan = await prisma.exercisePlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExercisePlanFindFirstOrThrowArgs>(args?: SelectSubset<T, ExercisePlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExercisePlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExercisePlans
     * const exercisePlans = await prisma.exercisePlan.findMany()
     * 
     * // Get first 10 ExercisePlans
     * const exercisePlans = await prisma.exercisePlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exercisePlanWithIdOnly = await prisma.exercisePlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExercisePlanFindManyArgs>(args?: SelectSubset<T, ExercisePlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExercisePlan.
     * @param {ExercisePlanCreateArgs} args - Arguments to create a ExercisePlan.
     * @example
     * // Create one ExercisePlan
     * const ExercisePlan = await prisma.exercisePlan.create({
     *   data: {
     *     // ... data to create a ExercisePlan
     *   }
     * })
     * 
     */
    create<T extends ExercisePlanCreateArgs>(args: SelectSubset<T, ExercisePlanCreateArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExercisePlans.
     * @param {ExercisePlanCreateManyArgs} args - Arguments to create many ExercisePlans.
     * @example
     * // Create many ExercisePlans
     * const exercisePlan = await prisma.exercisePlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExercisePlanCreateManyArgs>(args?: SelectSubset<T, ExercisePlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExercisePlans and returns the data saved in the database.
     * @param {ExercisePlanCreateManyAndReturnArgs} args - Arguments to create many ExercisePlans.
     * @example
     * // Create many ExercisePlans
     * const exercisePlan = await prisma.exercisePlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExercisePlans and only return the `id`
     * const exercisePlanWithIdOnly = await prisma.exercisePlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExercisePlanCreateManyAndReturnArgs>(args?: SelectSubset<T, ExercisePlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExercisePlan.
     * @param {ExercisePlanDeleteArgs} args - Arguments to delete one ExercisePlan.
     * @example
     * // Delete one ExercisePlan
     * const ExercisePlan = await prisma.exercisePlan.delete({
     *   where: {
     *     // ... filter to delete one ExercisePlan
     *   }
     * })
     * 
     */
    delete<T extends ExercisePlanDeleteArgs>(args: SelectSubset<T, ExercisePlanDeleteArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExercisePlan.
     * @param {ExercisePlanUpdateArgs} args - Arguments to update one ExercisePlan.
     * @example
     * // Update one ExercisePlan
     * const exercisePlan = await prisma.exercisePlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExercisePlanUpdateArgs>(args: SelectSubset<T, ExercisePlanUpdateArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExercisePlans.
     * @param {ExercisePlanDeleteManyArgs} args - Arguments to filter ExercisePlans to delete.
     * @example
     * // Delete a few ExercisePlans
     * const { count } = await prisma.exercisePlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExercisePlanDeleteManyArgs>(args?: SelectSubset<T, ExercisePlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExercisePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExercisePlans
     * const exercisePlan = await prisma.exercisePlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExercisePlanUpdateManyArgs>(args: SelectSubset<T, ExercisePlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExercisePlan.
     * @param {ExercisePlanUpsertArgs} args - Arguments to update or create a ExercisePlan.
     * @example
     * // Update or create a ExercisePlan
     * const exercisePlan = await prisma.exercisePlan.upsert({
     *   create: {
     *     // ... data to create a ExercisePlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExercisePlan we want to update
     *   }
     * })
     */
    upsert<T extends ExercisePlanUpsertArgs>(args: SelectSubset<T, ExercisePlanUpsertArgs<ExtArgs>>): Prisma__ExercisePlanClient<$Result.GetResult<Prisma.$ExercisePlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExercisePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanCountArgs} args - Arguments to filter ExercisePlans to count.
     * @example
     * // Count the number of ExercisePlans
     * const count = await prisma.exercisePlan.count({
     *   where: {
     *     // ... the filter for the ExercisePlans we want to count
     *   }
     * })
    **/
    count<T extends ExercisePlanCountArgs>(
      args?: Subset<T, ExercisePlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExercisePlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExercisePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExercisePlanAggregateArgs>(args: Subset<T, ExercisePlanAggregateArgs>): Prisma.PrismaPromise<GetExercisePlanAggregateType<T>>

    /**
     * Group by ExercisePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExercisePlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExercisePlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExercisePlanGroupByArgs['orderBy'] }
        : { orderBy?: ExercisePlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExercisePlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExercisePlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExercisePlan model
   */
  readonly fields: ExercisePlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExercisePlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExercisePlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExercisePlan model
   */ 
  interface ExercisePlanFieldRefs {
    readonly id: FieldRef<"ExercisePlan", 'Int'>
    readonly planname: FieldRef<"ExercisePlan", 'String'>
    readonly warmUp: FieldRef<"ExercisePlan", 'String'>
    readonly details: FieldRef<"ExercisePlan", 'String'>
    readonly assign: FieldRef<"ExercisePlan", 'String'>
    readonly createdDate: FieldRef<"ExercisePlan", 'DateTime'>
    readonly file: FieldRef<"ExercisePlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExercisePlan findUnique
   */
  export type ExercisePlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * Filter, which ExercisePlan to fetch.
     */
    where: ExercisePlanWhereUniqueInput
  }

  /**
   * ExercisePlan findUniqueOrThrow
   */
  export type ExercisePlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * Filter, which ExercisePlan to fetch.
     */
    where: ExercisePlanWhereUniqueInput
  }

  /**
   * ExercisePlan findFirst
   */
  export type ExercisePlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * Filter, which ExercisePlan to fetch.
     */
    where?: ExercisePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExercisePlans to fetch.
     */
    orderBy?: ExercisePlanOrderByWithRelationInput | ExercisePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExercisePlans.
     */
    cursor?: ExercisePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExercisePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExercisePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExercisePlans.
     */
    distinct?: ExercisePlanScalarFieldEnum | ExercisePlanScalarFieldEnum[]
  }

  /**
   * ExercisePlan findFirstOrThrow
   */
  export type ExercisePlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * Filter, which ExercisePlan to fetch.
     */
    where?: ExercisePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExercisePlans to fetch.
     */
    orderBy?: ExercisePlanOrderByWithRelationInput | ExercisePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExercisePlans.
     */
    cursor?: ExercisePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExercisePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExercisePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExercisePlans.
     */
    distinct?: ExercisePlanScalarFieldEnum | ExercisePlanScalarFieldEnum[]
  }

  /**
   * ExercisePlan findMany
   */
  export type ExercisePlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * Filter, which ExercisePlans to fetch.
     */
    where?: ExercisePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExercisePlans to fetch.
     */
    orderBy?: ExercisePlanOrderByWithRelationInput | ExercisePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExercisePlans.
     */
    cursor?: ExercisePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExercisePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExercisePlans.
     */
    skip?: number
    distinct?: ExercisePlanScalarFieldEnum | ExercisePlanScalarFieldEnum[]
  }

  /**
   * ExercisePlan create
   */
  export type ExercisePlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * The data needed to create a ExercisePlan.
     */
    data: XOR<ExercisePlanCreateInput, ExercisePlanUncheckedCreateInput>
  }

  /**
   * ExercisePlan createMany
   */
  export type ExercisePlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExercisePlans.
     */
    data: ExercisePlanCreateManyInput | ExercisePlanCreateManyInput[]
  }

  /**
   * ExercisePlan createManyAndReturn
   */
  export type ExercisePlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExercisePlans.
     */
    data: ExercisePlanCreateManyInput | ExercisePlanCreateManyInput[]
  }

  /**
   * ExercisePlan update
   */
  export type ExercisePlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * The data needed to update a ExercisePlan.
     */
    data: XOR<ExercisePlanUpdateInput, ExercisePlanUncheckedUpdateInput>
    /**
     * Choose, which ExercisePlan to update.
     */
    where: ExercisePlanWhereUniqueInput
  }

  /**
   * ExercisePlan updateMany
   */
  export type ExercisePlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExercisePlans.
     */
    data: XOR<ExercisePlanUpdateManyMutationInput, ExercisePlanUncheckedUpdateManyInput>
    /**
     * Filter which ExercisePlans to update
     */
    where?: ExercisePlanWhereInput
  }

  /**
   * ExercisePlan upsert
   */
  export type ExercisePlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * The filter to search for the ExercisePlan to update in case it exists.
     */
    where: ExercisePlanWhereUniqueInput
    /**
     * In case the ExercisePlan found by the `where` argument doesn't exist, create a new ExercisePlan with this data.
     */
    create: XOR<ExercisePlanCreateInput, ExercisePlanUncheckedCreateInput>
    /**
     * In case the ExercisePlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExercisePlanUpdateInput, ExercisePlanUncheckedUpdateInput>
  }

  /**
   * ExercisePlan delete
   */
  export type ExercisePlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
    /**
     * Filter which ExercisePlan to delete.
     */
    where: ExercisePlanWhereUniqueInput
  }

  /**
   * ExercisePlan deleteMany
   */
  export type ExercisePlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExercisePlans to delete
     */
    where?: ExercisePlanWhereInput
  }

  /**
   * ExercisePlan without action
   */
  export type ExercisePlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExercisePlan
     */
    select?: ExercisePlanSelect<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    id: number | null
    amount: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    id: number | null
    amount: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: number | null
    expenseDate: Date | null
    expenseType: string | null
    description: string | null
    amount: number | null
    paymentMode: string | null
    remarks: string | null
    receiptFile: string | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: number | null
    expenseDate: Date | null
    expenseType: string | null
    description: string | null
    amount: number | null
    paymentMode: string | null
    remarks: string | null
    receiptFile: string | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    expenseDate: number
    expenseType: number
    description: number
    amount: number
    paymentMode: number
    remarks: number
    receiptFile: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type ExpenseSumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    expenseDate?: true
    expenseType?: true
    description?: true
    amount?: true
    paymentMode?: true
    remarks?: true
    receiptFile?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    expenseDate?: true
    expenseType?: true
    description?: true
    amount?: true
    paymentMode?: true
    remarks?: true
    receiptFile?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    expenseDate?: true
    expenseType?: true
    description?: true
    amount?: true
    paymentMode?: true
    remarks?: true
    receiptFile?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: number
    expenseDate: Date
    expenseType: string
    description: string | null
    amount: number
    paymentMode: string
    remarks: string | null
    receiptFile: string
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseDate?: boolean
    expenseType?: boolean
    description?: boolean
    amount?: boolean
    paymentMode?: boolean
    remarks?: boolean
    receiptFile?: boolean
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseDate?: boolean
    expenseType?: boolean
    description?: boolean
    amount?: boolean
    paymentMode?: boolean
    remarks?: boolean
    receiptFile?: boolean
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    expenseDate?: boolean
    expenseType?: boolean
    description?: boolean
    amount?: boolean
    paymentMode?: boolean
    remarks?: boolean
    receiptFile?: boolean
  }


  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      expenseDate: Date
      expenseType: string
      description: string | null
      amount: number
      paymentMode: string
      remarks: string | null
      receiptFile: string
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */ 
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'Int'>
    readonly expenseDate: FieldRef<"Expense", 'DateTime'>
    readonly expenseType: FieldRef<"Expense", 'String'>
    readonly description: FieldRef<"Expense", 'String'>
    readonly amount: FieldRef<"Expense", 'Float'>
    readonly paymentMode: FieldRef<"Expense", 'String'>
    readonly remarks: FieldRef<"Expense", 'String'>
    readonly receiptFile: FieldRef<"Expense", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
  }


  /**
   * Model BusinessInfo
   */

  export type AggregateBusinessInfo = {
    _count: BusinessInfoCountAggregateOutputType | null
    _avg: BusinessInfoAvgAggregateOutputType | null
    _sum: BusinessInfoSumAggregateOutputType | null
    _min: BusinessInfoMinAggregateOutputType | null
    _max: BusinessInfoMaxAggregateOutputType | null
  }

  export type BusinessInfoAvgAggregateOutputType = {
    id: number | null
    paymentAmount: number | null
    paidAmount: number | null
    pendingAmount: number | null
  }

  export type BusinessInfoSumAggregateOutputType = {
    id: number | null
    paymentAmount: number | null
    paidAmount: number | null
    pendingAmount: number | null
  }

  export type BusinessInfoMinAggregateOutputType = {
    id: number | null
    businessName: string | null
    contactPerson: string | null
    mobileNumber: string | null
    email: string | null
    businessLogo: string | null
    packageName: string | null
    paymentAmount: number | null
    paidAmount: number | null
    pendingAmount: number | null
    expiryDate: Date | null
    address: string | null
    district: string | null
    state: string | null
    pincode: string | null
    configurations: string | null
  }

  export type BusinessInfoMaxAggregateOutputType = {
    id: number | null
    businessName: string | null
    contactPerson: string | null
    mobileNumber: string | null
    email: string | null
    businessLogo: string | null
    packageName: string | null
    paymentAmount: number | null
    paidAmount: number | null
    pendingAmount: number | null
    expiryDate: Date | null
    address: string | null
    district: string | null
    state: string | null
    pincode: string | null
    configurations: string | null
  }

  export type BusinessInfoCountAggregateOutputType = {
    id: number
    businessName: number
    contactPerson: number
    mobileNumber: number
    email: number
    businessLogo: number
    packageName: number
    paymentAmount: number
    paidAmount: number
    pendingAmount: number
    expiryDate: number
    address: number
    district: number
    state: number
    pincode: number
    configurations: number
    _all: number
  }


  export type BusinessInfoAvgAggregateInputType = {
    id?: true
    paymentAmount?: true
    paidAmount?: true
    pendingAmount?: true
  }

  export type BusinessInfoSumAggregateInputType = {
    id?: true
    paymentAmount?: true
    paidAmount?: true
    pendingAmount?: true
  }

  export type BusinessInfoMinAggregateInputType = {
    id?: true
    businessName?: true
    contactPerson?: true
    mobileNumber?: true
    email?: true
    businessLogo?: true
    packageName?: true
    paymentAmount?: true
    paidAmount?: true
    pendingAmount?: true
    expiryDate?: true
    address?: true
    district?: true
    state?: true
    pincode?: true
    configurations?: true
  }

  export type BusinessInfoMaxAggregateInputType = {
    id?: true
    businessName?: true
    contactPerson?: true
    mobileNumber?: true
    email?: true
    businessLogo?: true
    packageName?: true
    paymentAmount?: true
    paidAmount?: true
    pendingAmount?: true
    expiryDate?: true
    address?: true
    district?: true
    state?: true
    pincode?: true
    configurations?: true
  }

  export type BusinessInfoCountAggregateInputType = {
    id?: true
    businessName?: true
    contactPerson?: true
    mobileNumber?: true
    email?: true
    businessLogo?: true
    packageName?: true
    paymentAmount?: true
    paidAmount?: true
    pendingAmount?: true
    expiryDate?: true
    address?: true
    district?: true
    state?: true
    pincode?: true
    configurations?: true
    _all?: true
  }

  export type BusinessInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessInfo to aggregate.
     */
    where?: BusinessInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessInfos to fetch.
     */
    orderBy?: BusinessInfoOrderByWithRelationInput | BusinessInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessInfos
    **/
    _count?: true | BusinessInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusinessInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusinessInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessInfoMaxAggregateInputType
  }

  export type GetBusinessInfoAggregateType<T extends BusinessInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessInfo[P]>
      : GetScalarType<T[P], AggregateBusinessInfo[P]>
  }




  export type BusinessInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessInfoWhereInput
    orderBy?: BusinessInfoOrderByWithAggregationInput | BusinessInfoOrderByWithAggregationInput[]
    by: BusinessInfoScalarFieldEnum[] | BusinessInfoScalarFieldEnum
    having?: BusinessInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessInfoCountAggregateInputType | true
    _avg?: BusinessInfoAvgAggregateInputType
    _sum?: BusinessInfoSumAggregateInputType
    _min?: BusinessInfoMinAggregateInputType
    _max?: BusinessInfoMaxAggregateInputType
  }

  export type BusinessInfoGroupByOutputType = {
    id: number
    businessName: string
    contactPerson: string
    mobileNumber: string
    email: string
    businessLogo: string | null
    packageName: string | null
    paymentAmount: number | null
    paidAmount: number | null
    pendingAmount: number | null
    expiryDate: Date | null
    address: string
    district: string
    state: string
    pincode: string
    configurations: string
    _count: BusinessInfoCountAggregateOutputType | null
    _avg: BusinessInfoAvgAggregateOutputType | null
    _sum: BusinessInfoSumAggregateOutputType | null
    _min: BusinessInfoMinAggregateOutputType | null
    _max: BusinessInfoMaxAggregateOutputType | null
  }

  type GetBusinessInfoGroupByPayload<T extends BusinessInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessInfoGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessInfoGroupByOutputType[P]>
        }
      >
    >


  export type BusinessInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessName?: boolean
    contactPerson?: boolean
    mobileNumber?: boolean
    email?: boolean
    businessLogo?: boolean
    packageName?: boolean
    paymentAmount?: boolean
    paidAmount?: boolean
    pendingAmount?: boolean
    expiryDate?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    configurations?: boolean
  }, ExtArgs["result"]["businessInfo"]>

  export type BusinessInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessName?: boolean
    contactPerson?: boolean
    mobileNumber?: boolean
    email?: boolean
    businessLogo?: boolean
    packageName?: boolean
    paymentAmount?: boolean
    paidAmount?: boolean
    pendingAmount?: boolean
    expiryDate?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    configurations?: boolean
  }, ExtArgs["result"]["businessInfo"]>

  export type BusinessInfoSelectScalar = {
    id?: boolean
    businessName?: boolean
    contactPerson?: boolean
    mobileNumber?: boolean
    email?: boolean
    businessLogo?: boolean
    packageName?: boolean
    paymentAmount?: boolean
    paidAmount?: boolean
    pendingAmount?: boolean
    expiryDate?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    configurations?: boolean
  }


  export type $BusinessInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessInfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      businessName: string
      contactPerson: string
      mobileNumber: string
      email: string
      businessLogo: string | null
      packageName: string | null
      paymentAmount: number | null
      paidAmount: number | null
      pendingAmount: number | null
      expiryDate: Date | null
      address: string
      district: string
      state: string
      pincode: string
      configurations: string
    }, ExtArgs["result"]["businessInfo"]>
    composites: {}
  }

  type BusinessInfoGetPayload<S extends boolean | null | undefined | BusinessInfoDefaultArgs> = $Result.GetResult<Prisma.$BusinessInfoPayload, S>

  type BusinessInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BusinessInfoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BusinessInfoCountAggregateInputType | true
    }

  export interface BusinessInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessInfo'], meta: { name: 'BusinessInfo' } }
    /**
     * Find zero or one BusinessInfo that matches the filter.
     * @param {BusinessInfoFindUniqueArgs} args - Arguments to find a BusinessInfo
     * @example
     * // Get one BusinessInfo
     * const businessInfo = await prisma.businessInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessInfoFindUniqueArgs>(args: SelectSubset<T, BusinessInfoFindUniqueArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BusinessInfo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BusinessInfoFindUniqueOrThrowArgs} args - Arguments to find a BusinessInfo
     * @example
     * // Get one BusinessInfo
     * const businessInfo = await prisma.businessInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BusinessInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoFindFirstArgs} args - Arguments to find a BusinessInfo
     * @example
     * // Get one BusinessInfo
     * const businessInfo = await prisma.businessInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessInfoFindFirstArgs>(args?: SelectSubset<T, BusinessInfoFindFirstArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BusinessInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoFindFirstOrThrowArgs} args - Arguments to find a BusinessInfo
     * @example
     * // Get one BusinessInfo
     * const businessInfo = await prisma.businessInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BusinessInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessInfos
     * const businessInfos = await prisma.businessInfo.findMany()
     * 
     * // Get first 10 BusinessInfos
     * const businessInfos = await prisma.businessInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessInfoWithIdOnly = await prisma.businessInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessInfoFindManyArgs>(args?: SelectSubset<T, BusinessInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BusinessInfo.
     * @param {BusinessInfoCreateArgs} args - Arguments to create a BusinessInfo.
     * @example
     * // Create one BusinessInfo
     * const BusinessInfo = await prisma.businessInfo.create({
     *   data: {
     *     // ... data to create a BusinessInfo
     *   }
     * })
     * 
     */
    create<T extends BusinessInfoCreateArgs>(args: SelectSubset<T, BusinessInfoCreateArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BusinessInfos.
     * @param {BusinessInfoCreateManyArgs} args - Arguments to create many BusinessInfos.
     * @example
     * // Create many BusinessInfos
     * const businessInfo = await prisma.businessInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessInfoCreateManyArgs>(args?: SelectSubset<T, BusinessInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessInfos and returns the data saved in the database.
     * @param {BusinessInfoCreateManyAndReturnArgs} args - Arguments to create many BusinessInfos.
     * @example
     * // Create many BusinessInfos
     * const businessInfo = await prisma.businessInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessInfos and only return the `id`
     * const businessInfoWithIdOnly = await prisma.businessInfo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BusinessInfo.
     * @param {BusinessInfoDeleteArgs} args - Arguments to delete one BusinessInfo.
     * @example
     * // Delete one BusinessInfo
     * const BusinessInfo = await prisma.businessInfo.delete({
     *   where: {
     *     // ... filter to delete one BusinessInfo
     *   }
     * })
     * 
     */
    delete<T extends BusinessInfoDeleteArgs>(args: SelectSubset<T, BusinessInfoDeleteArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BusinessInfo.
     * @param {BusinessInfoUpdateArgs} args - Arguments to update one BusinessInfo.
     * @example
     * // Update one BusinessInfo
     * const businessInfo = await prisma.businessInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessInfoUpdateArgs>(args: SelectSubset<T, BusinessInfoUpdateArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BusinessInfos.
     * @param {BusinessInfoDeleteManyArgs} args - Arguments to filter BusinessInfos to delete.
     * @example
     * // Delete a few BusinessInfos
     * const { count } = await prisma.businessInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessInfoDeleteManyArgs>(args?: SelectSubset<T, BusinessInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessInfos
     * const businessInfo = await prisma.businessInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessInfoUpdateManyArgs>(args: SelectSubset<T, BusinessInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BusinessInfo.
     * @param {BusinessInfoUpsertArgs} args - Arguments to update or create a BusinessInfo.
     * @example
     * // Update or create a BusinessInfo
     * const businessInfo = await prisma.businessInfo.upsert({
     *   create: {
     *     // ... data to create a BusinessInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessInfo we want to update
     *   }
     * })
     */
    upsert<T extends BusinessInfoUpsertArgs>(args: SelectSubset<T, BusinessInfoUpsertArgs<ExtArgs>>): Prisma__BusinessInfoClient<$Result.GetResult<Prisma.$BusinessInfoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BusinessInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoCountArgs} args - Arguments to filter BusinessInfos to count.
     * @example
     * // Count the number of BusinessInfos
     * const count = await prisma.businessInfo.count({
     *   where: {
     *     // ... the filter for the BusinessInfos we want to count
     *   }
     * })
    **/
    count<T extends BusinessInfoCountArgs>(
      args?: Subset<T, BusinessInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessInfoAggregateArgs>(args: Subset<T, BusinessInfoAggregateArgs>): Prisma.PrismaPromise<GetBusinessInfoAggregateType<T>>

    /**
     * Group by BusinessInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessInfoGroupByArgs['orderBy'] }
        : { orderBy?: BusinessInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessInfo model
   */
  readonly fields: BusinessInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessInfo model
   */ 
  interface BusinessInfoFieldRefs {
    readonly id: FieldRef<"BusinessInfo", 'Int'>
    readonly businessName: FieldRef<"BusinessInfo", 'String'>
    readonly contactPerson: FieldRef<"BusinessInfo", 'String'>
    readonly mobileNumber: FieldRef<"BusinessInfo", 'String'>
    readonly email: FieldRef<"BusinessInfo", 'String'>
    readonly businessLogo: FieldRef<"BusinessInfo", 'String'>
    readonly packageName: FieldRef<"BusinessInfo", 'String'>
    readonly paymentAmount: FieldRef<"BusinessInfo", 'Float'>
    readonly paidAmount: FieldRef<"BusinessInfo", 'Float'>
    readonly pendingAmount: FieldRef<"BusinessInfo", 'Float'>
    readonly expiryDate: FieldRef<"BusinessInfo", 'DateTime'>
    readonly address: FieldRef<"BusinessInfo", 'String'>
    readonly district: FieldRef<"BusinessInfo", 'String'>
    readonly state: FieldRef<"BusinessInfo", 'String'>
    readonly pincode: FieldRef<"BusinessInfo", 'String'>
    readonly configurations: FieldRef<"BusinessInfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BusinessInfo findUnique
   */
  export type BusinessInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * Filter, which BusinessInfo to fetch.
     */
    where: BusinessInfoWhereUniqueInput
  }

  /**
   * BusinessInfo findUniqueOrThrow
   */
  export type BusinessInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * Filter, which BusinessInfo to fetch.
     */
    where: BusinessInfoWhereUniqueInput
  }

  /**
   * BusinessInfo findFirst
   */
  export type BusinessInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * Filter, which BusinessInfo to fetch.
     */
    where?: BusinessInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessInfos to fetch.
     */
    orderBy?: BusinessInfoOrderByWithRelationInput | BusinessInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessInfos.
     */
    cursor?: BusinessInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessInfos.
     */
    distinct?: BusinessInfoScalarFieldEnum | BusinessInfoScalarFieldEnum[]
  }

  /**
   * BusinessInfo findFirstOrThrow
   */
  export type BusinessInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * Filter, which BusinessInfo to fetch.
     */
    where?: BusinessInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessInfos to fetch.
     */
    orderBy?: BusinessInfoOrderByWithRelationInput | BusinessInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessInfos.
     */
    cursor?: BusinessInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessInfos.
     */
    distinct?: BusinessInfoScalarFieldEnum | BusinessInfoScalarFieldEnum[]
  }

  /**
   * BusinessInfo findMany
   */
  export type BusinessInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * Filter, which BusinessInfos to fetch.
     */
    where?: BusinessInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessInfos to fetch.
     */
    orderBy?: BusinessInfoOrderByWithRelationInput | BusinessInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessInfos.
     */
    cursor?: BusinessInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessInfos.
     */
    skip?: number
    distinct?: BusinessInfoScalarFieldEnum | BusinessInfoScalarFieldEnum[]
  }

  /**
   * BusinessInfo create
   */
  export type BusinessInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * The data needed to create a BusinessInfo.
     */
    data: XOR<BusinessInfoCreateInput, BusinessInfoUncheckedCreateInput>
  }

  /**
   * BusinessInfo createMany
   */
  export type BusinessInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessInfos.
     */
    data: BusinessInfoCreateManyInput | BusinessInfoCreateManyInput[]
  }

  /**
   * BusinessInfo createManyAndReturn
   */
  export type BusinessInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BusinessInfos.
     */
    data: BusinessInfoCreateManyInput | BusinessInfoCreateManyInput[]
  }

  /**
   * BusinessInfo update
   */
  export type BusinessInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * The data needed to update a BusinessInfo.
     */
    data: XOR<BusinessInfoUpdateInput, BusinessInfoUncheckedUpdateInput>
    /**
     * Choose, which BusinessInfo to update.
     */
    where: BusinessInfoWhereUniqueInput
  }

  /**
   * BusinessInfo updateMany
   */
  export type BusinessInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessInfos.
     */
    data: XOR<BusinessInfoUpdateManyMutationInput, BusinessInfoUncheckedUpdateManyInput>
    /**
     * Filter which BusinessInfos to update
     */
    where?: BusinessInfoWhereInput
  }

  /**
   * BusinessInfo upsert
   */
  export type BusinessInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * The filter to search for the BusinessInfo to update in case it exists.
     */
    where: BusinessInfoWhereUniqueInput
    /**
     * In case the BusinessInfo found by the `where` argument doesn't exist, create a new BusinessInfo with this data.
     */
    create: XOR<BusinessInfoCreateInput, BusinessInfoUncheckedCreateInput>
    /**
     * In case the BusinessInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessInfoUpdateInput, BusinessInfoUncheckedUpdateInput>
  }

  /**
   * BusinessInfo delete
   */
  export type BusinessInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
    /**
     * Filter which BusinessInfo to delete.
     */
    where: BusinessInfoWhereUniqueInput
  }

  /**
   * BusinessInfo deleteMany
   */
  export type BusinessInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessInfos to delete
     */
    where?: BusinessInfoWhereInput
  }

  /**
   * BusinessInfo without action
   */
  export type BusinessInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessInfo
     */
    select?: BusinessInfoSelect<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    id: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    id: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: number | null
    memberID: string | null
    name: string | null
    biometricID: string | null
    joiningDate: Date | null
    inTime: Date | null
    outTime: string | null
    month: string | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: number | null
    memberID: string | null
    name: string | null
    biometricID: string | null
    joiningDate: Date | null
    inTime: Date | null
    outTime: string | null
    month: string | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    memberID: number
    name: number
    biometricID: number
    joiningDate: number
    inTime: number
    outTime: number
    month: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    id?: true
  }

  export type AttendanceSumAggregateInputType = {
    id?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    memberID?: true
    name?: true
    biometricID?: true
    joiningDate?: true
    inTime?: true
    outTime?: true
    month?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    memberID?: true
    name?: true
    biometricID?: true
    joiningDate?: true
    inTime?: true
    outTime?: true
    month?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    memberID?: true
    name?: true
    biometricID?: true
    joiningDate?: true
    inTime?: true
    outTime?: true
    month?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: number
    memberID: string
    name: string
    biometricID: string | null
    joiningDate: Date | null
    inTime: Date
    outTime: string | null
    month: string
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberID?: boolean
    name?: boolean
    biometricID?: boolean
    joiningDate?: boolean
    inTime?: boolean
    outTime?: boolean
    month?: boolean
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberID?: boolean
    name?: boolean
    biometricID?: boolean
    joiningDate?: boolean
    inTime?: boolean
    outTime?: boolean
    month?: boolean
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    memberID?: boolean
    name?: boolean
    biometricID?: boolean
    joiningDate?: boolean
    inTime?: boolean
    outTime?: boolean
    month?: boolean
  }


  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      memberID: string
      name: string
      biometricID: string | null
      joiningDate: Date | null
      inTime: Date
      outTime: string | null
      month: string
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */ 
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'Int'>
    readonly memberID: FieldRef<"Attendance", 'String'>
    readonly name: FieldRef<"Attendance", 'String'>
    readonly biometricID: FieldRef<"Attendance", 'String'>
    readonly joiningDate: FieldRef<"Attendance", 'DateTime'>
    readonly inTime: FieldRef<"Attendance", 'DateTime'>
    readonly outTime: FieldRef<"Attendance", 'String'>
    readonly month: FieldRef<"Attendance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
  }


  /**
   * Model StaffAttendance
   */

  export type AggregateStaffAttendance = {
    _count: StaffAttendanceCountAggregateOutputType | null
    _avg: StaffAttendanceAvgAggregateOutputType | null
    _sum: StaffAttendanceSumAggregateOutputType | null
    _min: StaffAttendanceMinAggregateOutputType | null
    _max: StaffAttendanceMaxAggregateOutputType | null
  }

  export type StaffAttendanceAvgAggregateOutputType = {
    id: number | null
  }

  export type StaffAttendanceSumAggregateOutputType = {
    id: number | null
  }

  export type StaffAttendanceMinAggregateOutputType = {
    id: number | null
    employeeCode: string | null
    name: string | null
    biometricID: string | null
    joiningDate: Date | null
    inTime: Date | null
    outTime: string | null
    month: string | null
  }

  export type StaffAttendanceMaxAggregateOutputType = {
    id: number | null
    employeeCode: string | null
    name: string | null
    biometricID: string | null
    joiningDate: Date | null
    inTime: Date | null
    outTime: string | null
    month: string | null
  }

  export type StaffAttendanceCountAggregateOutputType = {
    id: number
    employeeCode: number
    name: number
    biometricID: number
    joiningDate: number
    inTime: number
    outTime: number
    month: number
    _all: number
  }


  export type StaffAttendanceAvgAggregateInputType = {
    id?: true
  }

  export type StaffAttendanceSumAggregateInputType = {
    id?: true
  }

  export type StaffAttendanceMinAggregateInputType = {
    id?: true
    employeeCode?: true
    name?: true
    biometricID?: true
    joiningDate?: true
    inTime?: true
    outTime?: true
    month?: true
  }

  export type StaffAttendanceMaxAggregateInputType = {
    id?: true
    employeeCode?: true
    name?: true
    biometricID?: true
    joiningDate?: true
    inTime?: true
    outTime?: true
    month?: true
  }

  export type StaffAttendanceCountAggregateInputType = {
    id?: true
    employeeCode?: true
    name?: true
    biometricID?: true
    joiningDate?: true
    inTime?: true
    outTime?: true
    month?: true
    _all?: true
  }

  export type StaffAttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffAttendance to aggregate.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffAttendances
    **/
    _count?: true | StaffAttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffAttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffAttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffAttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffAttendanceMaxAggregateInputType
  }

  export type GetStaffAttendanceAggregateType<T extends StaffAttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffAttendance[P]>
      : GetScalarType<T[P], AggregateStaffAttendance[P]>
  }




  export type StaffAttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffAttendanceWhereInput
    orderBy?: StaffAttendanceOrderByWithAggregationInput | StaffAttendanceOrderByWithAggregationInput[]
    by: StaffAttendanceScalarFieldEnum[] | StaffAttendanceScalarFieldEnum
    having?: StaffAttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffAttendanceCountAggregateInputType | true
    _avg?: StaffAttendanceAvgAggregateInputType
    _sum?: StaffAttendanceSumAggregateInputType
    _min?: StaffAttendanceMinAggregateInputType
    _max?: StaffAttendanceMaxAggregateInputType
  }

  export type StaffAttendanceGroupByOutputType = {
    id: number
    employeeCode: string
    name: string
    biometricID: string | null
    joiningDate: Date | null
    inTime: Date
    outTime: string | null
    month: string
    _count: StaffAttendanceCountAggregateOutputType | null
    _avg: StaffAttendanceAvgAggregateOutputType | null
    _sum: StaffAttendanceSumAggregateOutputType | null
    _min: StaffAttendanceMinAggregateOutputType | null
    _max: StaffAttendanceMaxAggregateOutputType | null
  }

  type GetStaffAttendanceGroupByPayload<T extends StaffAttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffAttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffAttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffAttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], StaffAttendanceGroupByOutputType[P]>
        }
      >
    >


  export type StaffAttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeCode?: boolean
    name?: boolean
    biometricID?: boolean
    joiningDate?: boolean
    inTime?: boolean
    outTime?: boolean
    month?: boolean
  }, ExtArgs["result"]["staffAttendance"]>

  export type StaffAttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeCode?: boolean
    name?: boolean
    biometricID?: boolean
    joiningDate?: boolean
    inTime?: boolean
    outTime?: boolean
    month?: boolean
  }, ExtArgs["result"]["staffAttendance"]>

  export type StaffAttendanceSelectScalar = {
    id?: boolean
    employeeCode?: boolean
    name?: boolean
    biometricID?: boolean
    joiningDate?: boolean
    inTime?: boolean
    outTime?: boolean
    month?: boolean
  }


  export type $StaffAttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffAttendance"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeCode: string
      name: string
      biometricID: string | null
      joiningDate: Date | null
      inTime: Date
      outTime: string | null
      month: string
    }, ExtArgs["result"]["staffAttendance"]>
    composites: {}
  }

  type StaffAttendanceGetPayload<S extends boolean | null | undefined | StaffAttendanceDefaultArgs> = $Result.GetResult<Prisma.$StaffAttendancePayload, S>

  type StaffAttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StaffAttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StaffAttendanceCountAggregateInputType | true
    }

  export interface StaffAttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffAttendance'], meta: { name: 'StaffAttendance' } }
    /**
     * Find zero or one StaffAttendance that matches the filter.
     * @param {StaffAttendanceFindUniqueArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffAttendanceFindUniqueArgs>(args: SelectSubset<T, StaffAttendanceFindUniqueArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StaffAttendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StaffAttendanceFindUniqueOrThrowArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffAttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffAttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StaffAttendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceFindFirstArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffAttendanceFindFirstArgs>(args?: SelectSubset<T, StaffAttendanceFindFirstArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StaffAttendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceFindFirstOrThrowArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffAttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffAttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StaffAttendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffAttendances
     * const staffAttendances = await prisma.staffAttendance.findMany()
     * 
     * // Get first 10 StaffAttendances
     * const staffAttendances = await prisma.staffAttendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffAttendanceWithIdOnly = await prisma.staffAttendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffAttendanceFindManyArgs>(args?: SelectSubset<T, StaffAttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StaffAttendance.
     * @param {StaffAttendanceCreateArgs} args - Arguments to create a StaffAttendance.
     * @example
     * // Create one StaffAttendance
     * const StaffAttendance = await prisma.staffAttendance.create({
     *   data: {
     *     // ... data to create a StaffAttendance
     *   }
     * })
     * 
     */
    create<T extends StaffAttendanceCreateArgs>(args: SelectSubset<T, StaffAttendanceCreateArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StaffAttendances.
     * @param {StaffAttendanceCreateManyArgs} args - Arguments to create many StaffAttendances.
     * @example
     * // Create many StaffAttendances
     * const staffAttendance = await prisma.staffAttendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffAttendanceCreateManyArgs>(args?: SelectSubset<T, StaffAttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffAttendances and returns the data saved in the database.
     * @param {StaffAttendanceCreateManyAndReturnArgs} args - Arguments to create many StaffAttendances.
     * @example
     * // Create many StaffAttendances
     * const staffAttendance = await prisma.staffAttendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffAttendances and only return the `id`
     * const staffAttendanceWithIdOnly = await prisma.staffAttendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffAttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffAttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StaffAttendance.
     * @param {StaffAttendanceDeleteArgs} args - Arguments to delete one StaffAttendance.
     * @example
     * // Delete one StaffAttendance
     * const StaffAttendance = await prisma.staffAttendance.delete({
     *   where: {
     *     // ... filter to delete one StaffAttendance
     *   }
     * })
     * 
     */
    delete<T extends StaffAttendanceDeleteArgs>(args: SelectSubset<T, StaffAttendanceDeleteArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StaffAttendance.
     * @param {StaffAttendanceUpdateArgs} args - Arguments to update one StaffAttendance.
     * @example
     * // Update one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffAttendanceUpdateArgs>(args: SelectSubset<T, StaffAttendanceUpdateArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StaffAttendances.
     * @param {StaffAttendanceDeleteManyArgs} args - Arguments to filter StaffAttendances to delete.
     * @example
     * // Delete a few StaffAttendances
     * const { count } = await prisma.staffAttendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffAttendanceDeleteManyArgs>(args?: SelectSubset<T, StaffAttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffAttendances
     * const staffAttendance = await prisma.staffAttendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffAttendanceUpdateManyArgs>(args: SelectSubset<T, StaffAttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StaffAttendance.
     * @param {StaffAttendanceUpsertArgs} args - Arguments to update or create a StaffAttendance.
     * @example
     * // Update or create a StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.upsert({
     *   create: {
     *     // ... data to create a StaffAttendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffAttendance we want to update
     *   }
     * })
     */
    upsert<T extends StaffAttendanceUpsertArgs>(args: SelectSubset<T, StaffAttendanceUpsertArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StaffAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceCountArgs} args - Arguments to filter StaffAttendances to count.
     * @example
     * // Count the number of StaffAttendances
     * const count = await prisma.staffAttendance.count({
     *   where: {
     *     // ... the filter for the StaffAttendances we want to count
     *   }
     * })
    **/
    count<T extends StaffAttendanceCountArgs>(
      args?: Subset<T, StaffAttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffAttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAttendanceAggregateArgs>(args: Subset<T, StaffAttendanceAggregateArgs>): Prisma.PrismaPromise<GetStaffAttendanceAggregateType<T>>

    /**
     * Group by StaffAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffAttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffAttendanceGroupByArgs['orderBy'] }
        : { orderBy?: StaffAttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffAttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffAttendance model
   */
  readonly fields: StaffAttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffAttendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffAttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StaffAttendance model
   */ 
  interface StaffAttendanceFieldRefs {
    readonly id: FieldRef<"StaffAttendance", 'Int'>
    readonly employeeCode: FieldRef<"StaffAttendance", 'String'>
    readonly name: FieldRef<"StaffAttendance", 'String'>
    readonly biometricID: FieldRef<"StaffAttendance", 'String'>
    readonly joiningDate: FieldRef<"StaffAttendance", 'DateTime'>
    readonly inTime: FieldRef<"StaffAttendance", 'DateTime'>
    readonly outTime: FieldRef<"StaffAttendance", 'String'>
    readonly month: FieldRef<"StaffAttendance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StaffAttendance findUnique
   */
  export type StaffAttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance findUniqueOrThrow
   */
  export type StaffAttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance findFirst
   */
  export type StaffAttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffAttendances.
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffAttendances.
     */
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
  }

  /**
   * StaffAttendance findFirstOrThrow
   */
  export type StaffAttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffAttendances.
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffAttendances.
     */
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
  }

  /**
   * StaffAttendance findMany
   */
  export type StaffAttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Filter, which StaffAttendances to fetch.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffAttendances.
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
  }

  /**
   * StaffAttendance create
   */
  export type StaffAttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * The data needed to create a StaffAttendance.
     */
    data: XOR<StaffAttendanceCreateInput, StaffAttendanceUncheckedCreateInput>
  }

  /**
   * StaffAttendance createMany
   */
  export type StaffAttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffAttendances.
     */
    data: StaffAttendanceCreateManyInput | StaffAttendanceCreateManyInput[]
  }

  /**
   * StaffAttendance createManyAndReturn
   */
  export type StaffAttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StaffAttendances.
     */
    data: StaffAttendanceCreateManyInput | StaffAttendanceCreateManyInput[]
  }

  /**
   * StaffAttendance update
   */
  export type StaffAttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * The data needed to update a StaffAttendance.
     */
    data: XOR<StaffAttendanceUpdateInput, StaffAttendanceUncheckedUpdateInput>
    /**
     * Choose, which StaffAttendance to update.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance updateMany
   */
  export type StaffAttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffAttendances.
     */
    data: XOR<StaffAttendanceUpdateManyMutationInput, StaffAttendanceUncheckedUpdateManyInput>
    /**
     * Filter which StaffAttendances to update
     */
    where?: StaffAttendanceWhereInput
  }

  /**
   * StaffAttendance upsert
   */
  export type StaffAttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * The filter to search for the StaffAttendance to update in case it exists.
     */
    where: StaffAttendanceWhereUniqueInput
    /**
     * In case the StaffAttendance found by the `where` argument doesn't exist, create a new StaffAttendance with this data.
     */
    create: XOR<StaffAttendanceCreateInput, StaffAttendanceUncheckedCreateInput>
    /**
     * In case the StaffAttendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffAttendanceUpdateInput, StaffAttendanceUncheckedUpdateInput>
  }

  /**
   * StaffAttendance delete
   */
  export type StaffAttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Filter which StaffAttendance to delete.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance deleteMany
   */
  export type StaffAttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffAttendances to delete
     */
    where?: StaffAttendanceWhereInput
  }

  /**
   * StaffAttendance without action
   */
  export type StaffAttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    packageAmount: number | null
    paidAmount: number | null
    pending: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    packageAmount: number | null
    paidAmount: number | null
    pending: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    paymentId: string | null
    memberID: string | null
    name: string | null
    mobileNumber: string | null
    packageType: string | null
    packageAmount: number | null
    paidAmount: number | null
    pending: number | null
    paidDate: Date | null
    paymentMode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    paymentId: string | null
    memberID: string | null
    name: string | null
    mobileNumber: string | null
    packageType: string | null
    packageAmount: number | null
    paidAmount: number | null
    pending: number | null
    paidDate: Date | null
    paymentMode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    paymentId: number
    memberID: number
    name: number
    mobileNumber: number
    packageType: number
    packageAmount: number
    paidAmount: number
    pending: number
    paidDate: number
    paymentMode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    packageAmount?: true
    paidAmount?: true
    pending?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    packageAmount?: true
    paidAmount?: true
    pending?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    paymentId?: true
    memberID?: true
    name?: true
    mobileNumber?: true
    packageType?: true
    packageAmount?: true
    paidAmount?: true
    pending?: true
    paidDate?: true
    paymentMode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    paymentId?: true
    memberID?: true
    name?: true
    mobileNumber?: true
    packageType?: true
    packageAmount?: true
    paidAmount?: true
    pending?: true
    paidDate?: true
    paymentMode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    paymentId?: true
    memberID?: true
    name?: true
    mobileNumber?: true
    packageType?: true
    packageAmount?: true
    paidAmount?: true
    pending?: true
    paidDate?: true
    paymentMode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    paymentId: string
    memberID: string
    name: string
    mobileNumber: string
    packageType: string | null
    packageAmount: number | null
    paidAmount: number | null
    pending: number | null
    paidDate: Date | null
    paymentMode: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    memberID?: boolean
    name?: boolean
    mobileNumber?: boolean
    packageType?: boolean
    packageAmount?: boolean
    paidAmount?: boolean
    pending?: boolean
    paidDate?: boolean
    paymentMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    memberID?: boolean
    name?: boolean
    mobileNumber?: boolean
    packageType?: boolean
    packageAmount?: boolean
    paidAmount?: boolean
    pending?: boolean
    paidDate?: boolean
    paymentMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    paymentId?: boolean
    memberID?: boolean
    name?: boolean
    mobileNumber?: boolean
    packageType?: boolean
    packageAmount?: boolean
    paidAmount?: boolean
    pending?: boolean
    paidDate?: boolean
    paymentMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      paymentId: string
      memberID: string
      name: string
      mobileNumber: string
      packageType: string | null
      packageAmount: number | null
      paidAmount: number | null
      pending: number | null
      paidDate: Date | null
      paymentMode: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly paymentId: FieldRef<"Payment", 'String'>
    readonly memberID: FieldRef<"Payment", 'String'>
    readonly name: FieldRef<"Payment", 'String'>
    readonly mobileNumber: FieldRef<"Payment", 'String'>
    readonly packageType: FieldRef<"Payment", 'String'>
    readonly packageAmount: FieldRef<"Payment", 'Float'>
    readonly paidAmount: FieldRef<"Payment", 'Float'>
    readonly pending: FieldRef<"Payment", 'Float'>
    readonly paidDate: FieldRef<"Payment", 'DateTime'>
    readonly paymentMode: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
  }


  /**
   * Model FileSyncQueue
   */

  export type AggregateFileSyncQueue = {
    _count: FileSyncQueueCountAggregateOutputType | null
    _avg: FileSyncQueueAvgAggregateOutputType | null
    _sum: FileSyncQueueSumAggregateOutputType | null
    _min: FileSyncQueueMinAggregateOutputType | null
    _max: FileSyncQueueMaxAggregateOutputType | null
  }

  export type FileSyncQueueAvgAggregateOutputType = {
    id: number | null
    entityId: number | null
    retryCount: number | null
  }

  export type FileSyncQueueSumAggregateOutputType = {
    id: number | null
    entityId: number | null
    retryCount: number | null
  }

  export type FileSyncQueueMinAggregateOutputType = {
    id: number | null
    localPath: string | null
    remoteUrl: string | null
    fileType: string | null
    entityType: string | null
    entityId: number | null
    fieldName: string | null
    status: string | null
    errorMessage: string | null
    retryCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
  }

  export type FileSyncQueueMaxAggregateOutputType = {
    id: number | null
    localPath: string | null
    remoteUrl: string | null
    fileType: string | null
    entityType: string | null
    entityId: number | null
    fieldName: string | null
    status: string | null
    errorMessage: string | null
    retryCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
  }

  export type FileSyncQueueCountAggregateOutputType = {
    id: number
    localPath: number
    remoteUrl: number
    fileType: number
    entityType: number
    entityId: number
    fieldName: number
    status: number
    errorMessage: number
    retryCount: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    _all: number
  }


  export type FileSyncQueueAvgAggregateInputType = {
    id?: true
    entityId?: true
    retryCount?: true
  }

  export type FileSyncQueueSumAggregateInputType = {
    id?: true
    entityId?: true
    retryCount?: true
  }

  export type FileSyncQueueMinAggregateInputType = {
    id?: true
    localPath?: true
    remoteUrl?: true
    fileType?: true
    entityType?: true
    entityId?: true
    fieldName?: true
    status?: true
    errorMessage?: true
    retryCount?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
  }

  export type FileSyncQueueMaxAggregateInputType = {
    id?: true
    localPath?: true
    remoteUrl?: true
    fileType?: true
    entityType?: true
    entityId?: true
    fieldName?: true
    status?: true
    errorMessage?: true
    retryCount?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
  }

  export type FileSyncQueueCountAggregateInputType = {
    id?: true
    localPath?: true
    remoteUrl?: true
    fileType?: true
    entityType?: true
    entityId?: true
    fieldName?: true
    status?: true
    errorMessage?: true
    retryCount?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    _all?: true
  }

  export type FileSyncQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileSyncQueue to aggregate.
     */
    where?: FileSyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileSyncQueues to fetch.
     */
    orderBy?: FileSyncQueueOrderByWithRelationInput | FileSyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileSyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileSyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileSyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FileSyncQueues
    **/
    _count?: true | FileSyncQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileSyncQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileSyncQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileSyncQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileSyncQueueMaxAggregateInputType
  }

  export type GetFileSyncQueueAggregateType<T extends FileSyncQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateFileSyncQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFileSyncQueue[P]>
      : GetScalarType<T[P], AggregateFileSyncQueue[P]>
  }




  export type FileSyncQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileSyncQueueWhereInput
    orderBy?: FileSyncQueueOrderByWithAggregationInput | FileSyncQueueOrderByWithAggregationInput[]
    by: FileSyncQueueScalarFieldEnum[] | FileSyncQueueScalarFieldEnum
    having?: FileSyncQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileSyncQueueCountAggregateInputType | true
    _avg?: FileSyncQueueAvgAggregateInputType
    _sum?: FileSyncQueueSumAggregateInputType
    _min?: FileSyncQueueMinAggregateInputType
    _max?: FileSyncQueueMaxAggregateInputType
  }

  export type FileSyncQueueGroupByOutputType = {
    id: number
    localPath: string
    remoteUrl: string | null
    fileType: string
    entityType: string
    entityId: number
    fieldName: string
    status: string
    errorMessage: string | null
    retryCount: number
    createdAt: Date
    updatedAt: Date
    syncedAt: Date | null
    _count: FileSyncQueueCountAggregateOutputType | null
    _avg: FileSyncQueueAvgAggregateOutputType | null
    _sum: FileSyncQueueSumAggregateOutputType | null
    _min: FileSyncQueueMinAggregateOutputType | null
    _max: FileSyncQueueMaxAggregateOutputType | null
  }

  type GetFileSyncQueueGroupByPayload<T extends FileSyncQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileSyncQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileSyncQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileSyncQueueGroupByOutputType[P]>
            : GetScalarType<T[P], FileSyncQueueGroupByOutputType[P]>
        }
      >
    >


  export type FileSyncQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    localPath?: boolean
    remoteUrl?: boolean
    fileType?: boolean
    entityType?: boolean
    entityId?: boolean
    fieldName?: boolean
    status?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["fileSyncQueue"]>

  export type FileSyncQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    localPath?: boolean
    remoteUrl?: boolean
    fileType?: boolean
    entityType?: boolean
    entityId?: boolean
    fieldName?: boolean
    status?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["fileSyncQueue"]>

  export type FileSyncQueueSelectScalar = {
    id?: boolean
    localPath?: boolean
    remoteUrl?: boolean
    fileType?: boolean
    entityType?: boolean
    entityId?: boolean
    fieldName?: boolean
    status?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }


  export type $FileSyncQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FileSyncQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      localPath: string
      remoteUrl: string | null
      fileType: string
      entityType: string
      entityId: number
      fieldName: string
      status: string
      errorMessage: string | null
      retryCount: number
      createdAt: Date
      updatedAt: Date
      syncedAt: Date | null
    }, ExtArgs["result"]["fileSyncQueue"]>
    composites: {}
  }

  type FileSyncQueueGetPayload<S extends boolean | null | undefined | FileSyncQueueDefaultArgs> = $Result.GetResult<Prisma.$FileSyncQueuePayload, S>

  type FileSyncQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FileSyncQueueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FileSyncQueueCountAggregateInputType | true
    }

  export interface FileSyncQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FileSyncQueue'], meta: { name: 'FileSyncQueue' } }
    /**
     * Find zero or one FileSyncQueue that matches the filter.
     * @param {FileSyncQueueFindUniqueArgs} args - Arguments to find a FileSyncQueue
     * @example
     * // Get one FileSyncQueue
     * const fileSyncQueue = await prisma.fileSyncQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileSyncQueueFindUniqueArgs>(args: SelectSubset<T, FileSyncQueueFindUniqueArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FileSyncQueue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FileSyncQueueFindUniqueOrThrowArgs} args - Arguments to find a FileSyncQueue
     * @example
     * // Get one FileSyncQueue
     * const fileSyncQueue = await prisma.fileSyncQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileSyncQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, FileSyncQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FileSyncQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueFindFirstArgs} args - Arguments to find a FileSyncQueue
     * @example
     * // Get one FileSyncQueue
     * const fileSyncQueue = await prisma.fileSyncQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileSyncQueueFindFirstArgs>(args?: SelectSubset<T, FileSyncQueueFindFirstArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FileSyncQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueFindFirstOrThrowArgs} args - Arguments to find a FileSyncQueue
     * @example
     * // Get one FileSyncQueue
     * const fileSyncQueue = await prisma.fileSyncQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileSyncQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, FileSyncQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FileSyncQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FileSyncQueues
     * const fileSyncQueues = await prisma.fileSyncQueue.findMany()
     * 
     * // Get first 10 FileSyncQueues
     * const fileSyncQueues = await prisma.fileSyncQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileSyncQueueWithIdOnly = await prisma.fileSyncQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileSyncQueueFindManyArgs>(args?: SelectSubset<T, FileSyncQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FileSyncQueue.
     * @param {FileSyncQueueCreateArgs} args - Arguments to create a FileSyncQueue.
     * @example
     * // Create one FileSyncQueue
     * const FileSyncQueue = await prisma.fileSyncQueue.create({
     *   data: {
     *     // ... data to create a FileSyncQueue
     *   }
     * })
     * 
     */
    create<T extends FileSyncQueueCreateArgs>(args: SelectSubset<T, FileSyncQueueCreateArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FileSyncQueues.
     * @param {FileSyncQueueCreateManyArgs} args - Arguments to create many FileSyncQueues.
     * @example
     * // Create many FileSyncQueues
     * const fileSyncQueue = await prisma.fileSyncQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileSyncQueueCreateManyArgs>(args?: SelectSubset<T, FileSyncQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FileSyncQueues and returns the data saved in the database.
     * @param {FileSyncQueueCreateManyAndReturnArgs} args - Arguments to create many FileSyncQueues.
     * @example
     * // Create many FileSyncQueues
     * const fileSyncQueue = await prisma.fileSyncQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FileSyncQueues and only return the `id`
     * const fileSyncQueueWithIdOnly = await prisma.fileSyncQueue.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileSyncQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, FileSyncQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FileSyncQueue.
     * @param {FileSyncQueueDeleteArgs} args - Arguments to delete one FileSyncQueue.
     * @example
     * // Delete one FileSyncQueue
     * const FileSyncQueue = await prisma.fileSyncQueue.delete({
     *   where: {
     *     // ... filter to delete one FileSyncQueue
     *   }
     * })
     * 
     */
    delete<T extends FileSyncQueueDeleteArgs>(args: SelectSubset<T, FileSyncQueueDeleteArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FileSyncQueue.
     * @param {FileSyncQueueUpdateArgs} args - Arguments to update one FileSyncQueue.
     * @example
     * // Update one FileSyncQueue
     * const fileSyncQueue = await prisma.fileSyncQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileSyncQueueUpdateArgs>(args: SelectSubset<T, FileSyncQueueUpdateArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FileSyncQueues.
     * @param {FileSyncQueueDeleteManyArgs} args - Arguments to filter FileSyncQueues to delete.
     * @example
     * // Delete a few FileSyncQueues
     * const { count } = await prisma.fileSyncQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileSyncQueueDeleteManyArgs>(args?: SelectSubset<T, FileSyncQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileSyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FileSyncQueues
     * const fileSyncQueue = await prisma.fileSyncQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileSyncQueueUpdateManyArgs>(args: SelectSubset<T, FileSyncQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FileSyncQueue.
     * @param {FileSyncQueueUpsertArgs} args - Arguments to update or create a FileSyncQueue.
     * @example
     * // Update or create a FileSyncQueue
     * const fileSyncQueue = await prisma.fileSyncQueue.upsert({
     *   create: {
     *     // ... data to create a FileSyncQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FileSyncQueue we want to update
     *   }
     * })
     */
    upsert<T extends FileSyncQueueUpsertArgs>(args: SelectSubset<T, FileSyncQueueUpsertArgs<ExtArgs>>): Prisma__FileSyncQueueClient<$Result.GetResult<Prisma.$FileSyncQueuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FileSyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueCountArgs} args - Arguments to filter FileSyncQueues to count.
     * @example
     * // Count the number of FileSyncQueues
     * const count = await prisma.fileSyncQueue.count({
     *   where: {
     *     // ... the filter for the FileSyncQueues we want to count
     *   }
     * })
    **/
    count<T extends FileSyncQueueCountArgs>(
      args?: Subset<T, FileSyncQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileSyncQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FileSyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileSyncQueueAggregateArgs>(args: Subset<T, FileSyncQueueAggregateArgs>): Prisma.PrismaPromise<GetFileSyncQueueAggregateType<T>>

    /**
     * Group by FileSyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileSyncQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileSyncQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileSyncQueueGroupByArgs['orderBy'] }
        : { orderBy?: FileSyncQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileSyncQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileSyncQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FileSyncQueue model
   */
  readonly fields: FileSyncQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FileSyncQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileSyncQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FileSyncQueue model
   */ 
  interface FileSyncQueueFieldRefs {
    readonly id: FieldRef<"FileSyncQueue", 'Int'>
    readonly localPath: FieldRef<"FileSyncQueue", 'String'>
    readonly remoteUrl: FieldRef<"FileSyncQueue", 'String'>
    readonly fileType: FieldRef<"FileSyncQueue", 'String'>
    readonly entityType: FieldRef<"FileSyncQueue", 'String'>
    readonly entityId: FieldRef<"FileSyncQueue", 'Int'>
    readonly fieldName: FieldRef<"FileSyncQueue", 'String'>
    readonly status: FieldRef<"FileSyncQueue", 'String'>
    readonly errorMessage: FieldRef<"FileSyncQueue", 'String'>
    readonly retryCount: FieldRef<"FileSyncQueue", 'Int'>
    readonly createdAt: FieldRef<"FileSyncQueue", 'DateTime'>
    readonly updatedAt: FieldRef<"FileSyncQueue", 'DateTime'>
    readonly syncedAt: FieldRef<"FileSyncQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FileSyncQueue findUnique
   */
  export type FileSyncQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which FileSyncQueue to fetch.
     */
    where: FileSyncQueueWhereUniqueInput
  }

  /**
   * FileSyncQueue findUniqueOrThrow
   */
  export type FileSyncQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which FileSyncQueue to fetch.
     */
    where: FileSyncQueueWhereUniqueInput
  }

  /**
   * FileSyncQueue findFirst
   */
  export type FileSyncQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which FileSyncQueue to fetch.
     */
    where?: FileSyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileSyncQueues to fetch.
     */
    orderBy?: FileSyncQueueOrderByWithRelationInput | FileSyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileSyncQueues.
     */
    cursor?: FileSyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileSyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileSyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileSyncQueues.
     */
    distinct?: FileSyncQueueScalarFieldEnum | FileSyncQueueScalarFieldEnum[]
  }

  /**
   * FileSyncQueue findFirstOrThrow
   */
  export type FileSyncQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which FileSyncQueue to fetch.
     */
    where?: FileSyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileSyncQueues to fetch.
     */
    orderBy?: FileSyncQueueOrderByWithRelationInput | FileSyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileSyncQueues.
     */
    cursor?: FileSyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileSyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileSyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileSyncQueues.
     */
    distinct?: FileSyncQueueScalarFieldEnum | FileSyncQueueScalarFieldEnum[]
  }

  /**
   * FileSyncQueue findMany
   */
  export type FileSyncQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * Filter, which FileSyncQueues to fetch.
     */
    where?: FileSyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileSyncQueues to fetch.
     */
    orderBy?: FileSyncQueueOrderByWithRelationInput | FileSyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FileSyncQueues.
     */
    cursor?: FileSyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileSyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileSyncQueues.
     */
    skip?: number
    distinct?: FileSyncQueueScalarFieldEnum | FileSyncQueueScalarFieldEnum[]
  }

  /**
   * FileSyncQueue create
   */
  export type FileSyncQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * The data needed to create a FileSyncQueue.
     */
    data: XOR<FileSyncQueueCreateInput, FileSyncQueueUncheckedCreateInput>
  }

  /**
   * FileSyncQueue createMany
   */
  export type FileSyncQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FileSyncQueues.
     */
    data: FileSyncQueueCreateManyInput | FileSyncQueueCreateManyInput[]
  }

  /**
   * FileSyncQueue createManyAndReturn
   */
  export type FileSyncQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FileSyncQueues.
     */
    data: FileSyncQueueCreateManyInput | FileSyncQueueCreateManyInput[]
  }

  /**
   * FileSyncQueue update
   */
  export type FileSyncQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * The data needed to update a FileSyncQueue.
     */
    data: XOR<FileSyncQueueUpdateInput, FileSyncQueueUncheckedUpdateInput>
    /**
     * Choose, which FileSyncQueue to update.
     */
    where: FileSyncQueueWhereUniqueInput
  }

  /**
   * FileSyncQueue updateMany
   */
  export type FileSyncQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FileSyncQueues.
     */
    data: XOR<FileSyncQueueUpdateManyMutationInput, FileSyncQueueUncheckedUpdateManyInput>
    /**
     * Filter which FileSyncQueues to update
     */
    where?: FileSyncQueueWhereInput
  }

  /**
   * FileSyncQueue upsert
   */
  export type FileSyncQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * The filter to search for the FileSyncQueue to update in case it exists.
     */
    where: FileSyncQueueWhereUniqueInput
    /**
     * In case the FileSyncQueue found by the `where` argument doesn't exist, create a new FileSyncQueue with this data.
     */
    create: XOR<FileSyncQueueCreateInput, FileSyncQueueUncheckedCreateInput>
    /**
     * In case the FileSyncQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileSyncQueueUpdateInput, FileSyncQueueUncheckedUpdateInput>
  }

  /**
   * FileSyncQueue delete
   */
  export type FileSyncQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
    /**
     * Filter which FileSyncQueue to delete.
     */
    where: FileSyncQueueWhereUniqueInput
  }

  /**
   * FileSyncQueue deleteMany
   */
  export type FileSyncQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileSyncQueues to delete
     */
    where?: FileSyncQueueWhereInput
  }

  /**
   * FileSyncQueue without action
   */
  export type FileSyncQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileSyncQueue
     */
    select?: FileSyncQueueSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StaffScalarFieldEnum: {
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

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const PackageScalarFieldEnum: {
    id: 'id',
    packageCode: 'packageCode',
    packageName: 'packageName',
    month: 'month',
    day: 'day',
    amount: 'amount',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type PackageScalarFieldEnum = (typeof PackageScalarFieldEnum)[keyof typeof PackageScalarFieldEnum]


  export const MemberScalarFieldEnum: {
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

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const EnquiryScalarFieldEnum: {
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

  export type EnquiryScalarFieldEnum = (typeof EnquiryScalarFieldEnum)[keyof typeof EnquiryScalarFieldEnum]


  export const DietPlanScalarFieldEnum: {
    id: 'id',
    chartName: 'chartName',
    chartTable: 'chartTable',
    file: 'file',
    createdDate: 'createdDate',
    assignedCount: 'assignedCount',
    assign: 'assign'
  };

  export type DietPlanScalarFieldEnum = (typeof DietPlanScalarFieldEnum)[keyof typeof DietPlanScalarFieldEnum]


  export const ExercisePlanScalarFieldEnum: {
    id: 'id',
    planname: 'planname',
    warmUp: 'warmUp',
    details: 'details',
    assign: 'assign',
    createdDate: 'createdDate',
    file: 'file'
  };

  export type ExercisePlanScalarFieldEnum = (typeof ExercisePlanScalarFieldEnum)[keyof typeof ExercisePlanScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    expenseDate: 'expenseDate',
    expenseType: 'expenseType',
    description: 'description',
    amount: 'amount',
    paymentMode: 'paymentMode',
    remarks: 'remarks',
    receiptFile: 'receiptFile'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const BusinessInfoScalarFieldEnum: {
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

  export type BusinessInfoScalarFieldEnum = (typeof BusinessInfoScalarFieldEnum)[keyof typeof BusinessInfoScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    memberID: 'memberID',
    name: 'name',
    biometricID: 'biometricID',
    joiningDate: 'joiningDate',
    inTime: 'inTime',
    outTime: 'outTime',
    month: 'month'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const StaffAttendanceScalarFieldEnum: {
    id: 'id',
    employeeCode: 'employeeCode',
    name: 'name',
    biometricID: 'biometricID',
    joiningDate: 'joiningDate',
    inTime: 'inTime',
    outTime: 'outTime',
    month: 'month'
  };

  export type StaffAttendanceScalarFieldEnum = (typeof StaffAttendanceScalarFieldEnum)[keyof typeof StaffAttendanceScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
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

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const FileSyncQueueScalarFieldEnum: {
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

  export type FileSyncQueueScalarFieldEnum = (typeof FileSyncQueueScalarFieldEnum)[keyof typeof FileSyncQueueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: IntFilter<"Staff"> | number
    employeeCode?: StringFilter<"Staff"> | string
    firstname?: StringFilter<"Staff"> | string
    lastname?: StringNullableFilter<"Staff"> | string | null
    email?: StringNullableFilter<"Staff"> | string | null
    mobileNumber?: StringFilter<"Staff"> | string
    alternateNumber?: StringNullableFilter<"Staff"> | string | null
    gender?: StringNullableFilter<"Staff"> | string | null
    age?: IntNullableFilter<"Staff"> | number | null
    dateOfBirth?: DateTimeNullableFilter<"Staff"> | Date | string | null
    biometricId?: StringNullableFilter<"Staff"> | string | null
    joiningDate?: DateTimeNullableFilter<"Staff"> | Date | string | null
    bloodGroup?: StringNullableFilter<"Staff"> | string | null
    designation?: StringNullableFilter<"Staff"> | string | null
    status?: BoolNullableFilter<"Staff"> | boolean | null
    photoPicture?: StringNullableFilter<"Staff"> | string | null
    permanentAddress?: StringFilter<"Staff"> | string
    communicationAddress?: StringFilter<"Staff"> | string
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    mobileNumber?: SortOrder
    alternateNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    biometricId?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    photoPicture?: SortOrderInput | SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    employeeCode?: string
    email?: string
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    firstname?: StringFilter<"Staff"> | string
    lastname?: StringNullableFilter<"Staff"> | string | null
    mobileNumber?: StringFilter<"Staff"> | string
    alternateNumber?: StringNullableFilter<"Staff"> | string | null
    gender?: StringNullableFilter<"Staff"> | string | null
    age?: IntNullableFilter<"Staff"> | number | null
    dateOfBirth?: DateTimeNullableFilter<"Staff"> | Date | string | null
    biometricId?: StringNullableFilter<"Staff"> | string | null
    joiningDate?: DateTimeNullableFilter<"Staff"> | Date | string | null
    bloodGroup?: StringNullableFilter<"Staff"> | string | null
    designation?: StringNullableFilter<"Staff"> | string | null
    status?: BoolNullableFilter<"Staff"> | boolean | null
    photoPicture?: StringNullableFilter<"Staff"> | string | null
    permanentAddress?: StringFilter<"Staff"> | string
    communicationAddress?: StringFilter<"Staff"> | string
  }, "id" | "employeeCode" | "email">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    mobileNumber?: SortOrder
    alternateNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    biometricId?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    photoPicture?: SortOrderInput | SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _avg?: StaffAvgOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
    _sum?: StaffSumOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Staff"> | number
    employeeCode?: StringWithAggregatesFilter<"Staff"> | string
    firstname?: StringWithAggregatesFilter<"Staff"> | string
    lastname?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    email?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    mobileNumber?: StringWithAggregatesFilter<"Staff"> | string
    alternateNumber?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    gender?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    age?: IntNullableWithAggregatesFilter<"Staff"> | number | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Staff"> | Date | string | null
    biometricId?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    joiningDate?: DateTimeNullableWithAggregatesFilter<"Staff"> | Date | string | null
    bloodGroup?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    designation?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    status?: BoolNullableWithAggregatesFilter<"Staff"> | boolean | null
    photoPicture?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    permanentAddress?: StringWithAggregatesFilter<"Staff"> | string
    communicationAddress?: StringWithAggregatesFilter<"Staff"> | string
  }

  export type PackageWhereInput = {
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    id?: IntFilter<"Package"> | number
    packageCode?: StringFilter<"Package"> | string
    packageName?: StringFilter<"Package"> | string
    month?: IntFilter<"Package"> | number
    day?: IntFilter<"Package"> | number
    amount?: FloatFilter<"Package"> | number
    active?: BoolFilter<"Package"> | boolean
    createdAt?: DateTimeFilter<"Package"> | Date | string
  }

  export type PackageOrderByWithRelationInput = {
    id?: SortOrder
    packageCode?: SortOrder
    packageName?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PackageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    packageCode?: string
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    packageName?: StringFilter<"Package"> | string
    month?: IntFilter<"Package"> | number
    day?: IntFilter<"Package"> | number
    amount?: FloatFilter<"Package"> | number
    active?: BoolFilter<"Package"> | boolean
    createdAt?: DateTimeFilter<"Package"> | Date | string
  }, "id" | "packageCode">

  export type PackageOrderByWithAggregationInput = {
    id?: SortOrder
    packageCode?: SortOrder
    packageName?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: PackageCountOrderByAggregateInput
    _avg?: PackageAvgOrderByAggregateInput
    _max?: PackageMaxOrderByAggregateInput
    _min?: PackageMinOrderByAggregateInput
    _sum?: PackageSumOrderByAggregateInput
  }

  export type PackageScalarWhereWithAggregatesInput = {
    AND?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    OR?: PackageScalarWhereWithAggregatesInput[]
    NOT?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Package"> | number
    packageCode?: StringWithAggregatesFilter<"Package"> | string
    packageName?: StringWithAggregatesFilter<"Package"> | string
    month?: IntWithAggregatesFilter<"Package"> | number
    day?: IntWithAggregatesFilter<"Package"> | number
    amount?: FloatWithAggregatesFilter<"Package"> | number
    active?: BoolWithAggregatesFilter<"Package"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: IntFilter<"Member"> | number
    memberID?: StringFilter<"Member"> | string
    firstName?: StringFilter<"Member"> | string
    lastName?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    mobileNumber?: StringFilter<"Member"> | string
    dateOfBirth?: DateTimeNullableFilter<"Member"> | Date | string | null
    gender?: StringNullableFilter<"Member"> | string | null
    maritalStatus?: StringNullableFilter<"Member"> | string | null
    memberPhoto?: StringNullableFilter<"Member"> | string | null
    homeContactNumber?: StringNullableFilter<"Member"> | string | null
    bloodGroup?: StringNullableFilter<"Member"> | string | null
    active?: BoolNullableFilter<"Member"> | boolean | null
    gstNumber?: StringNullableFilter<"Member"> | string | null
    remarks?: StringNullableFilter<"Member"> | string | null
    assignTrainer?: StringNullableFilter<"Member"> | string | null
    gstType?: StringNullableFilter<"Member"> | string | null
    packageType?: StringNullableFilter<"Member"> | string | null
    isMainPackage?: BoolNullableFilter<"Member"> | boolean | null
    packageAmount?: FloatNullableFilter<"Member"> | number | null
    gstamount?: FloatNullableFilter<"Member"> | number | null
    duration?: StringNullableFilter<"Member"> | string | null
    discount?: FloatNullableFilter<"Member"> | number | null
    paidAmount?: FloatNullableFilter<"Member"> | number | null
    paidDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    paymentMode?: StringNullableFilter<"Member"> | string | null
    receiptType?: StringNullableFilter<"Member"> | string | null
    startDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    fitnessDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    weight?: FloatNullableFilter<"Member"> | number | null
    height?: FloatNullableFilter<"Member"> | number | null
    neck?: FloatNullableFilter<"Member"> | number | null
    shoulders?: FloatNullableFilter<"Member"> | number | null
    chest?: FloatNullableFilter<"Member"> | number | null
    biceps?: FloatNullableFilter<"Member"> | number | null
    upperAbs?: FloatNullableFilter<"Member"> | number | null
    waist?: FloatNullableFilter<"Member"> | number | null
    lowerAbs?: FloatNullableFilter<"Member"> | number | null
    hip?: FloatNullableFilter<"Member"> | number | null
    thigh?: FloatNullableFilter<"Member"> | number | null
    calf?: FloatNullableFilter<"Member"> | number | null
    proofType?: StringNullableFilter<"Member"> | string | null
    proofNo?: StringNullableFilter<"Member"> | string | null
    expiryDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    proofDocument?: StringNullableFilter<"Member"> | string | null
    createdAt?: DateTimeFilter<"Member"> | Date | string
    permanentAddress?: StringFilter<"Member"> | string
    communicationAddress?: StringFilter<"Member"> | string
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    memberID?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    mobileNumber?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    memberPhoto?: SortOrderInput | SortOrder
    homeContactNumber?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    active?: SortOrderInput | SortOrder
    gstNumber?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    assignTrainer?: SortOrderInput | SortOrder
    gstType?: SortOrderInput | SortOrder
    packageType?: SortOrderInput | SortOrder
    isMainPackage?: SortOrderInput | SortOrder
    packageAmount?: SortOrderInput | SortOrder
    gstamount?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    paidDate?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    receiptType?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    fitnessDate?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    neck?: SortOrderInput | SortOrder
    shoulders?: SortOrderInput | SortOrder
    chest?: SortOrderInput | SortOrder
    biceps?: SortOrderInput | SortOrder
    upperAbs?: SortOrderInput | SortOrder
    waist?: SortOrderInput | SortOrder
    lowerAbs?: SortOrderInput | SortOrder
    hip?: SortOrderInput | SortOrder
    thigh?: SortOrderInput | SortOrder
    calf?: SortOrderInput | SortOrder
    proofType?: SortOrderInput | SortOrder
    proofNo?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    proofDocument?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    memberID?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    firstName?: StringFilter<"Member"> | string
    lastName?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    mobileNumber?: StringFilter<"Member"> | string
    dateOfBirth?: DateTimeNullableFilter<"Member"> | Date | string | null
    gender?: StringNullableFilter<"Member"> | string | null
    maritalStatus?: StringNullableFilter<"Member"> | string | null
    memberPhoto?: StringNullableFilter<"Member"> | string | null
    homeContactNumber?: StringNullableFilter<"Member"> | string | null
    bloodGroup?: StringNullableFilter<"Member"> | string | null
    active?: BoolNullableFilter<"Member"> | boolean | null
    gstNumber?: StringNullableFilter<"Member"> | string | null
    remarks?: StringNullableFilter<"Member"> | string | null
    assignTrainer?: StringNullableFilter<"Member"> | string | null
    gstType?: StringNullableFilter<"Member"> | string | null
    packageType?: StringNullableFilter<"Member"> | string | null
    isMainPackage?: BoolNullableFilter<"Member"> | boolean | null
    packageAmount?: FloatNullableFilter<"Member"> | number | null
    gstamount?: FloatNullableFilter<"Member"> | number | null
    duration?: StringNullableFilter<"Member"> | string | null
    discount?: FloatNullableFilter<"Member"> | number | null
    paidAmount?: FloatNullableFilter<"Member"> | number | null
    paidDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    paymentMode?: StringNullableFilter<"Member"> | string | null
    receiptType?: StringNullableFilter<"Member"> | string | null
    startDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    fitnessDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    weight?: FloatNullableFilter<"Member"> | number | null
    height?: FloatNullableFilter<"Member"> | number | null
    neck?: FloatNullableFilter<"Member"> | number | null
    shoulders?: FloatNullableFilter<"Member"> | number | null
    chest?: FloatNullableFilter<"Member"> | number | null
    biceps?: FloatNullableFilter<"Member"> | number | null
    upperAbs?: FloatNullableFilter<"Member"> | number | null
    waist?: FloatNullableFilter<"Member"> | number | null
    lowerAbs?: FloatNullableFilter<"Member"> | number | null
    hip?: FloatNullableFilter<"Member"> | number | null
    thigh?: FloatNullableFilter<"Member"> | number | null
    calf?: FloatNullableFilter<"Member"> | number | null
    proofType?: StringNullableFilter<"Member"> | string | null
    proofNo?: StringNullableFilter<"Member"> | string | null
    expiryDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    proofDocument?: StringNullableFilter<"Member"> | string | null
    createdAt?: DateTimeFilter<"Member"> | Date | string
    permanentAddress?: StringFilter<"Member"> | string
    communicationAddress?: StringFilter<"Member"> | string
  }, "id" | "memberID">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    memberID?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    mobileNumber?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    memberPhoto?: SortOrderInput | SortOrder
    homeContactNumber?: SortOrderInput | SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    active?: SortOrderInput | SortOrder
    gstNumber?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    assignTrainer?: SortOrderInput | SortOrder
    gstType?: SortOrderInput | SortOrder
    packageType?: SortOrderInput | SortOrder
    isMainPackage?: SortOrderInput | SortOrder
    packageAmount?: SortOrderInput | SortOrder
    gstamount?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    paidDate?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    receiptType?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    fitnessDate?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    neck?: SortOrderInput | SortOrder
    shoulders?: SortOrderInput | SortOrder
    chest?: SortOrderInput | SortOrder
    biceps?: SortOrderInput | SortOrder
    upperAbs?: SortOrderInput | SortOrder
    waist?: SortOrderInput | SortOrder
    lowerAbs?: SortOrderInput | SortOrder
    hip?: SortOrderInput | SortOrder
    thigh?: SortOrderInput | SortOrder
    calf?: SortOrderInput | SortOrder
    proofType?: SortOrderInput | SortOrder
    proofNo?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    proofDocument?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _avg?: MemberAvgOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
    _sum?: MemberSumOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Member"> | number
    memberID?: StringWithAggregatesFilter<"Member"> | string
    firstName?: StringWithAggregatesFilter<"Member"> | string
    lastName?: StringNullableWithAggregatesFilter<"Member"> | string | null
    email?: StringNullableWithAggregatesFilter<"Member"> | string | null
    mobileNumber?: StringWithAggregatesFilter<"Member"> | string
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Member"> | string | null
    maritalStatus?: StringNullableWithAggregatesFilter<"Member"> | string | null
    memberPhoto?: StringNullableWithAggregatesFilter<"Member"> | string | null
    homeContactNumber?: StringNullableWithAggregatesFilter<"Member"> | string | null
    bloodGroup?: StringNullableWithAggregatesFilter<"Member"> | string | null
    active?: BoolNullableWithAggregatesFilter<"Member"> | boolean | null
    gstNumber?: StringNullableWithAggregatesFilter<"Member"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"Member"> | string | null
    assignTrainer?: StringNullableWithAggregatesFilter<"Member"> | string | null
    gstType?: StringNullableWithAggregatesFilter<"Member"> | string | null
    packageType?: StringNullableWithAggregatesFilter<"Member"> | string | null
    isMainPackage?: BoolNullableWithAggregatesFilter<"Member"> | boolean | null
    packageAmount?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    gstamount?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    duration?: StringNullableWithAggregatesFilter<"Member"> | string | null
    discount?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    paidAmount?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    paidDate?: DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null
    paymentMode?: StringNullableWithAggregatesFilter<"Member"> | string | null
    receiptType?: StringNullableWithAggregatesFilter<"Member"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null
    fitnessDate?: DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null
    weight?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    height?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    neck?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    shoulders?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    chest?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    biceps?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    upperAbs?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    waist?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    lowerAbs?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    hip?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    thigh?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    calf?: FloatNullableWithAggregatesFilter<"Member"> | number | null
    proofType?: StringNullableWithAggregatesFilter<"Member"> | string | null
    proofNo?: StringNullableWithAggregatesFilter<"Member"> | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null
    proofDocument?: StringNullableWithAggregatesFilter<"Member"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    permanentAddress?: StringWithAggregatesFilter<"Member"> | string
    communicationAddress?: StringWithAggregatesFilter<"Member"> | string
  }

  export type EnquiryWhereInput = {
    AND?: EnquiryWhereInput | EnquiryWhereInput[]
    OR?: EnquiryWhereInput[]
    NOT?: EnquiryWhereInput | EnquiryWhereInput[]
    id?: IntFilter<"Enquiry"> | number
    firstName?: StringFilter<"Enquiry"> | string
    lastName?: StringNullableFilter<"Enquiry"> | string | null
    mobileNumber?: StringFilter<"Enquiry"> | string
    email?: StringNullableFilter<"Enquiry"> | string | null
    alternateContact?: StringNullableFilter<"Enquiry"> | string | null
    enquiryFor?: StringFilter<"Enquiry"> | string
    status?: StringFilter<"Enquiry"> | string
    howToKnowAboutUs?: StringFilter<"Enquiry"> | string
    enquiryDate?: DateTimeFilter<"Enquiry"> | Date | string
    expectedJoiningDate?: DateTimeNullableFilter<"Enquiry"> | Date | string | null
    followUpDate?: DateTimeFilter<"Enquiry"> | Date | string
    remarks?: StringNullableFilter<"Enquiry"> | string | null
  }

  export type EnquiryOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    mobileNumber?: SortOrder
    email?: SortOrderInput | SortOrder
    alternateContact?: SortOrderInput | SortOrder
    enquiryFor?: SortOrder
    status?: SortOrder
    howToKnowAboutUs?: SortOrder
    enquiryDate?: SortOrder
    expectedJoiningDate?: SortOrderInput | SortOrder
    followUpDate?: SortOrder
    remarks?: SortOrderInput | SortOrder
  }

  export type EnquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EnquiryWhereInput | EnquiryWhereInput[]
    OR?: EnquiryWhereInput[]
    NOT?: EnquiryWhereInput | EnquiryWhereInput[]
    firstName?: StringFilter<"Enquiry"> | string
    lastName?: StringNullableFilter<"Enquiry"> | string | null
    mobileNumber?: StringFilter<"Enquiry"> | string
    email?: StringNullableFilter<"Enquiry"> | string | null
    alternateContact?: StringNullableFilter<"Enquiry"> | string | null
    enquiryFor?: StringFilter<"Enquiry"> | string
    status?: StringFilter<"Enquiry"> | string
    howToKnowAboutUs?: StringFilter<"Enquiry"> | string
    enquiryDate?: DateTimeFilter<"Enquiry"> | Date | string
    expectedJoiningDate?: DateTimeNullableFilter<"Enquiry"> | Date | string | null
    followUpDate?: DateTimeFilter<"Enquiry"> | Date | string
    remarks?: StringNullableFilter<"Enquiry"> | string | null
  }, "id">

  export type EnquiryOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    mobileNumber?: SortOrder
    email?: SortOrderInput | SortOrder
    alternateContact?: SortOrderInput | SortOrder
    enquiryFor?: SortOrder
    status?: SortOrder
    howToKnowAboutUs?: SortOrder
    enquiryDate?: SortOrder
    expectedJoiningDate?: SortOrderInput | SortOrder
    followUpDate?: SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: EnquiryCountOrderByAggregateInput
    _avg?: EnquiryAvgOrderByAggregateInput
    _max?: EnquiryMaxOrderByAggregateInput
    _min?: EnquiryMinOrderByAggregateInput
    _sum?: EnquirySumOrderByAggregateInput
  }

  export type EnquiryScalarWhereWithAggregatesInput = {
    AND?: EnquiryScalarWhereWithAggregatesInput | EnquiryScalarWhereWithAggregatesInput[]
    OR?: EnquiryScalarWhereWithAggregatesInput[]
    NOT?: EnquiryScalarWhereWithAggregatesInput | EnquiryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Enquiry"> | number
    firstName?: StringWithAggregatesFilter<"Enquiry"> | string
    lastName?: StringNullableWithAggregatesFilter<"Enquiry"> | string | null
    mobileNumber?: StringWithAggregatesFilter<"Enquiry"> | string
    email?: StringNullableWithAggregatesFilter<"Enquiry"> | string | null
    alternateContact?: StringNullableWithAggregatesFilter<"Enquiry"> | string | null
    enquiryFor?: StringWithAggregatesFilter<"Enquiry"> | string
    status?: StringWithAggregatesFilter<"Enquiry"> | string
    howToKnowAboutUs?: StringWithAggregatesFilter<"Enquiry"> | string
    enquiryDate?: DateTimeWithAggregatesFilter<"Enquiry"> | Date | string
    expectedJoiningDate?: DateTimeNullableWithAggregatesFilter<"Enquiry"> | Date | string | null
    followUpDate?: DateTimeWithAggregatesFilter<"Enquiry"> | Date | string
    remarks?: StringNullableWithAggregatesFilter<"Enquiry"> | string | null
  }

  export type DietPlanWhereInput = {
    AND?: DietPlanWhereInput | DietPlanWhereInput[]
    OR?: DietPlanWhereInput[]
    NOT?: DietPlanWhereInput | DietPlanWhereInput[]
    id?: IntFilter<"DietPlan"> | number
    chartName?: StringFilter<"DietPlan"> | string
    chartTable?: StringFilter<"DietPlan"> | string
    file?: StringNullableFilter<"DietPlan"> | string | null
    createdDate?: DateTimeFilter<"DietPlan"> | Date | string
    assignedCount?: IntNullableFilter<"DietPlan"> | number | null
    assign?: StringNullableFilter<"DietPlan"> | string | null
  }

  export type DietPlanOrderByWithRelationInput = {
    id?: SortOrder
    chartName?: SortOrder
    chartTable?: SortOrder
    file?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    assignedCount?: SortOrderInput | SortOrder
    assign?: SortOrderInput | SortOrder
  }

  export type DietPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DietPlanWhereInput | DietPlanWhereInput[]
    OR?: DietPlanWhereInput[]
    NOT?: DietPlanWhereInput | DietPlanWhereInput[]
    chartName?: StringFilter<"DietPlan"> | string
    chartTable?: StringFilter<"DietPlan"> | string
    file?: StringNullableFilter<"DietPlan"> | string | null
    createdDate?: DateTimeFilter<"DietPlan"> | Date | string
    assignedCount?: IntNullableFilter<"DietPlan"> | number | null
    assign?: StringNullableFilter<"DietPlan"> | string | null
  }, "id">

  export type DietPlanOrderByWithAggregationInput = {
    id?: SortOrder
    chartName?: SortOrder
    chartTable?: SortOrder
    file?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    assignedCount?: SortOrderInput | SortOrder
    assign?: SortOrderInput | SortOrder
    _count?: DietPlanCountOrderByAggregateInput
    _avg?: DietPlanAvgOrderByAggregateInput
    _max?: DietPlanMaxOrderByAggregateInput
    _min?: DietPlanMinOrderByAggregateInput
    _sum?: DietPlanSumOrderByAggregateInput
  }

  export type DietPlanScalarWhereWithAggregatesInput = {
    AND?: DietPlanScalarWhereWithAggregatesInput | DietPlanScalarWhereWithAggregatesInput[]
    OR?: DietPlanScalarWhereWithAggregatesInput[]
    NOT?: DietPlanScalarWhereWithAggregatesInput | DietPlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DietPlan"> | number
    chartName?: StringWithAggregatesFilter<"DietPlan"> | string
    chartTable?: StringWithAggregatesFilter<"DietPlan"> | string
    file?: StringNullableWithAggregatesFilter<"DietPlan"> | string | null
    createdDate?: DateTimeWithAggregatesFilter<"DietPlan"> | Date | string
    assignedCount?: IntNullableWithAggregatesFilter<"DietPlan"> | number | null
    assign?: StringNullableWithAggregatesFilter<"DietPlan"> | string | null
  }

  export type ExercisePlanWhereInput = {
    AND?: ExercisePlanWhereInput | ExercisePlanWhereInput[]
    OR?: ExercisePlanWhereInput[]
    NOT?: ExercisePlanWhereInput | ExercisePlanWhereInput[]
    id?: IntFilter<"ExercisePlan"> | number
    planname?: StringFilter<"ExercisePlan"> | string
    warmUp?: StringNullableFilter<"ExercisePlan"> | string | null
    details?: StringFilter<"ExercisePlan"> | string
    assign?: StringNullableFilter<"ExercisePlan"> | string | null
    createdDate?: DateTimeFilter<"ExercisePlan"> | Date | string
    file?: StringNullableFilter<"ExercisePlan"> | string | null
  }

  export type ExercisePlanOrderByWithRelationInput = {
    id?: SortOrder
    planname?: SortOrder
    warmUp?: SortOrderInput | SortOrder
    details?: SortOrder
    assign?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    file?: SortOrderInput | SortOrder
  }

  export type ExercisePlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExercisePlanWhereInput | ExercisePlanWhereInput[]
    OR?: ExercisePlanWhereInput[]
    NOT?: ExercisePlanWhereInput | ExercisePlanWhereInput[]
    planname?: StringFilter<"ExercisePlan"> | string
    warmUp?: StringNullableFilter<"ExercisePlan"> | string | null
    details?: StringFilter<"ExercisePlan"> | string
    assign?: StringNullableFilter<"ExercisePlan"> | string | null
    createdDate?: DateTimeFilter<"ExercisePlan"> | Date | string
    file?: StringNullableFilter<"ExercisePlan"> | string | null
  }, "id">

  export type ExercisePlanOrderByWithAggregationInput = {
    id?: SortOrder
    planname?: SortOrder
    warmUp?: SortOrderInput | SortOrder
    details?: SortOrder
    assign?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    file?: SortOrderInput | SortOrder
    _count?: ExercisePlanCountOrderByAggregateInput
    _avg?: ExercisePlanAvgOrderByAggregateInput
    _max?: ExercisePlanMaxOrderByAggregateInput
    _min?: ExercisePlanMinOrderByAggregateInput
    _sum?: ExercisePlanSumOrderByAggregateInput
  }

  export type ExercisePlanScalarWhereWithAggregatesInput = {
    AND?: ExercisePlanScalarWhereWithAggregatesInput | ExercisePlanScalarWhereWithAggregatesInput[]
    OR?: ExercisePlanScalarWhereWithAggregatesInput[]
    NOT?: ExercisePlanScalarWhereWithAggregatesInput | ExercisePlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExercisePlan"> | number
    planname?: StringWithAggregatesFilter<"ExercisePlan"> | string
    warmUp?: StringNullableWithAggregatesFilter<"ExercisePlan"> | string | null
    details?: StringWithAggregatesFilter<"ExercisePlan"> | string
    assign?: StringNullableWithAggregatesFilter<"ExercisePlan"> | string | null
    createdDate?: DateTimeWithAggregatesFilter<"ExercisePlan"> | Date | string
    file?: StringNullableWithAggregatesFilter<"ExercisePlan"> | string | null
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: IntFilter<"Expense"> | number
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    expenseType?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    paymentMode?: StringFilter<"Expense"> | string
    remarks?: StringNullableFilter<"Expense"> | string | null
    receiptFile?: StringFilter<"Expense"> | string
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    expenseType?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    paymentMode?: SortOrder
    remarks?: SortOrderInput | SortOrder
    receiptFile?: SortOrder
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    expenseType?: StringFilter<"Expense"> | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    paymentMode?: StringFilter<"Expense"> | string
    remarks?: StringNullableFilter<"Expense"> | string | null
    receiptFile?: StringFilter<"Expense"> | string
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    expenseType?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    paymentMode?: SortOrder
    remarks?: SortOrderInput | SortOrder
    receiptFile?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Expense"> | number
    expenseDate?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    expenseType?: StringWithAggregatesFilter<"Expense"> | string
    description?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    amount?: FloatWithAggregatesFilter<"Expense"> | number
    paymentMode?: StringWithAggregatesFilter<"Expense"> | string
    remarks?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    receiptFile?: StringWithAggregatesFilter<"Expense"> | string
  }

  export type BusinessInfoWhereInput = {
    AND?: BusinessInfoWhereInput | BusinessInfoWhereInput[]
    OR?: BusinessInfoWhereInput[]
    NOT?: BusinessInfoWhereInput | BusinessInfoWhereInput[]
    id?: IntFilter<"BusinessInfo"> | number
    businessName?: StringFilter<"BusinessInfo"> | string
    contactPerson?: StringFilter<"BusinessInfo"> | string
    mobileNumber?: StringFilter<"BusinessInfo"> | string
    email?: StringFilter<"BusinessInfo"> | string
    businessLogo?: StringNullableFilter<"BusinessInfo"> | string | null
    packageName?: StringNullableFilter<"BusinessInfo"> | string | null
    paymentAmount?: FloatNullableFilter<"BusinessInfo"> | number | null
    paidAmount?: FloatNullableFilter<"BusinessInfo"> | number | null
    pendingAmount?: FloatNullableFilter<"BusinessInfo"> | number | null
    expiryDate?: DateTimeNullableFilter<"BusinessInfo"> | Date | string | null
    address?: StringFilter<"BusinessInfo"> | string
    district?: StringFilter<"BusinessInfo"> | string
    state?: StringFilter<"BusinessInfo"> | string
    pincode?: StringFilter<"BusinessInfo"> | string
    configurations?: StringFilter<"BusinessInfo"> | string
  }

  export type BusinessInfoOrderByWithRelationInput = {
    id?: SortOrder
    businessName?: SortOrder
    contactPerson?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    businessLogo?: SortOrderInput | SortOrder
    packageName?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    pendingAmount?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    configurations?: SortOrder
  }

  export type BusinessInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BusinessInfoWhereInput | BusinessInfoWhereInput[]
    OR?: BusinessInfoWhereInput[]
    NOT?: BusinessInfoWhereInput | BusinessInfoWhereInput[]
    businessName?: StringFilter<"BusinessInfo"> | string
    contactPerson?: StringFilter<"BusinessInfo"> | string
    mobileNumber?: StringFilter<"BusinessInfo"> | string
    email?: StringFilter<"BusinessInfo"> | string
    businessLogo?: StringNullableFilter<"BusinessInfo"> | string | null
    packageName?: StringNullableFilter<"BusinessInfo"> | string | null
    paymentAmount?: FloatNullableFilter<"BusinessInfo"> | number | null
    paidAmount?: FloatNullableFilter<"BusinessInfo"> | number | null
    pendingAmount?: FloatNullableFilter<"BusinessInfo"> | number | null
    expiryDate?: DateTimeNullableFilter<"BusinessInfo"> | Date | string | null
    address?: StringFilter<"BusinessInfo"> | string
    district?: StringFilter<"BusinessInfo"> | string
    state?: StringFilter<"BusinessInfo"> | string
    pincode?: StringFilter<"BusinessInfo"> | string
    configurations?: StringFilter<"BusinessInfo"> | string
  }, "id">

  export type BusinessInfoOrderByWithAggregationInput = {
    id?: SortOrder
    businessName?: SortOrder
    contactPerson?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    businessLogo?: SortOrderInput | SortOrder
    packageName?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    pendingAmount?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    configurations?: SortOrder
    _count?: BusinessInfoCountOrderByAggregateInput
    _avg?: BusinessInfoAvgOrderByAggregateInput
    _max?: BusinessInfoMaxOrderByAggregateInput
    _min?: BusinessInfoMinOrderByAggregateInput
    _sum?: BusinessInfoSumOrderByAggregateInput
  }

  export type BusinessInfoScalarWhereWithAggregatesInput = {
    AND?: BusinessInfoScalarWhereWithAggregatesInput | BusinessInfoScalarWhereWithAggregatesInput[]
    OR?: BusinessInfoScalarWhereWithAggregatesInput[]
    NOT?: BusinessInfoScalarWhereWithAggregatesInput | BusinessInfoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BusinessInfo"> | number
    businessName?: StringWithAggregatesFilter<"BusinessInfo"> | string
    contactPerson?: StringWithAggregatesFilter<"BusinessInfo"> | string
    mobileNumber?: StringWithAggregatesFilter<"BusinessInfo"> | string
    email?: StringWithAggregatesFilter<"BusinessInfo"> | string
    businessLogo?: StringNullableWithAggregatesFilter<"BusinessInfo"> | string | null
    packageName?: StringNullableWithAggregatesFilter<"BusinessInfo"> | string | null
    paymentAmount?: FloatNullableWithAggregatesFilter<"BusinessInfo"> | number | null
    paidAmount?: FloatNullableWithAggregatesFilter<"BusinessInfo"> | number | null
    pendingAmount?: FloatNullableWithAggregatesFilter<"BusinessInfo"> | number | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"BusinessInfo"> | Date | string | null
    address?: StringWithAggregatesFilter<"BusinessInfo"> | string
    district?: StringWithAggregatesFilter<"BusinessInfo"> | string
    state?: StringWithAggregatesFilter<"BusinessInfo"> | string
    pincode?: StringWithAggregatesFilter<"BusinessInfo"> | string
    configurations?: StringWithAggregatesFilter<"BusinessInfo"> | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: IntFilter<"Attendance"> | number
    memberID?: StringFilter<"Attendance"> | string
    name?: StringFilter<"Attendance"> | string
    biometricID?: StringNullableFilter<"Attendance"> | string | null
    joiningDate?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    inTime?: DateTimeFilter<"Attendance"> | Date | string
    outTime?: StringNullableFilter<"Attendance"> | string | null
    month?: StringFilter<"Attendance"> | string
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    biometricID?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    inTime?: SortOrder
    outTime?: SortOrderInput | SortOrder
    month?: SortOrder
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    memberID?: StringFilter<"Attendance"> | string
    name?: StringFilter<"Attendance"> | string
    biometricID?: StringNullableFilter<"Attendance"> | string | null
    joiningDate?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    inTime?: DateTimeFilter<"Attendance"> | Date | string
    outTime?: StringNullableFilter<"Attendance"> | string | null
    month?: StringFilter<"Attendance"> | string
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    biometricID?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    inTime?: SortOrder
    outTime?: SortOrderInput | SortOrder
    month?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attendance"> | number
    memberID?: StringWithAggregatesFilter<"Attendance"> | string
    name?: StringWithAggregatesFilter<"Attendance"> | string
    biometricID?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    joiningDate?: DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null
    inTime?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    outTime?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    month?: StringWithAggregatesFilter<"Attendance"> | string
  }

  export type StaffAttendanceWhereInput = {
    AND?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    OR?: StaffAttendanceWhereInput[]
    NOT?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    id?: IntFilter<"StaffAttendance"> | number
    employeeCode?: StringFilter<"StaffAttendance"> | string
    name?: StringFilter<"StaffAttendance"> | string
    biometricID?: StringNullableFilter<"StaffAttendance"> | string | null
    joiningDate?: DateTimeNullableFilter<"StaffAttendance"> | Date | string | null
    inTime?: DateTimeFilter<"StaffAttendance"> | Date | string
    outTime?: StringNullableFilter<"StaffAttendance"> | string | null
    month?: StringFilter<"StaffAttendance"> | string
  }

  export type StaffAttendanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    name?: SortOrder
    biometricID?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    inTime?: SortOrder
    outTime?: SortOrderInput | SortOrder
    month?: SortOrder
  }

  export type StaffAttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    OR?: StaffAttendanceWhereInput[]
    NOT?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    employeeCode?: StringFilter<"StaffAttendance"> | string
    name?: StringFilter<"StaffAttendance"> | string
    biometricID?: StringNullableFilter<"StaffAttendance"> | string | null
    joiningDate?: DateTimeNullableFilter<"StaffAttendance"> | Date | string | null
    inTime?: DateTimeFilter<"StaffAttendance"> | Date | string
    outTime?: StringNullableFilter<"StaffAttendance"> | string | null
    month?: StringFilter<"StaffAttendance"> | string
  }, "id">

  export type StaffAttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    name?: SortOrder
    biometricID?: SortOrderInput | SortOrder
    joiningDate?: SortOrderInput | SortOrder
    inTime?: SortOrder
    outTime?: SortOrderInput | SortOrder
    month?: SortOrder
    _count?: StaffAttendanceCountOrderByAggregateInput
    _avg?: StaffAttendanceAvgOrderByAggregateInput
    _max?: StaffAttendanceMaxOrderByAggregateInput
    _min?: StaffAttendanceMinOrderByAggregateInput
    _sum?: StaffAttendanceSumOrderByAggregateInput
  }

  export type StaffAttendanceScalarWhereWithAggregatesInput = {
    AND?: StaffAttendanceScalarWhereWithAggregatesInput | StaffAttendanceScalarWhereWithAggregatesInput[]
    OR?: StaffAttendanceScalarWhereWithAggregatesInput[]
    NOT?: StaffAttendanceScalarWhereWithAggregatesInput | StaffAttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StaffAttendance"> | number
    employeeCode?: StringWithAggregatesFilter<"StaffAttendance"> | string
    name?: StringWithAggregatesFilter<"StaffAttendance"> | string
    biometricID?: StringNullableWithAggregatesFilter<"StaffAttendance"> | string | null
    joiningDate?: DateTimeNullableWithAggregatesFilter<"StaffAttendance"> | Date | string | null
    inTime?: DateTimeWithAggregatesFilter<"StaffAttendance"> | Date | string
    outTime?: StringNullableWithAggregatesFilter<"StaffAttendance"> | string | null
    month?: StringWithAggregatesFilter<"StaffAttendance"> | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    paymentId?: StringFilter<"Payment"> | string
    memberID?: StringFilter<"Payment"> | string
    name?: StringFilter<"Payment"> | string
    mobileNumber?: StringFilter<"Payment"> | string
    packageType?: StringNullableFilter<"Payment"> | string | null
    packageAmount?: FloatNullableFilter<"Payment"> | number | null
    paidAmount?: FloatNullableFilter<"Payment"> | number | null
    pending?: FloatNullableFilter<"Payment"> | number | null
    paidDate?: DateTimeNullableFilter<"Payment"> | Date | string | null
    paymentMode?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    mobileNumber?: SortOrder
    packageType?: SortOrderInput | SortOrder
    packageAmount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    pending?: SortOrderInput | SortOrder
    paidDate?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    paymentId?: StringFilter<"Payment"> | string
    memberID?: StringFilter<"Payment"> | string
    name?: StringFilter<"Payment"> | string
    mobileNumber?: StringFilter<"Payment"> | string
    packageType?: StringNullableFilter<"Payment"> | string | null
    packageAmount?: FloatNullableFilter<"Payment"> | number | null
    paidAmount?: FloatNullableFilter<"Payment"> | number | null
    pending?: FloatNullableFilter<"Payment"> | number | null
    paidDate?: DateTimeNullableFilter<"Payment"> | Date | string | null
    paymentMode?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    mobileNumber?: SortOrder
    packageType?: SortOrderInput | SortOrder
    packageAmount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    pending?: SortOrderInput | SortOrder
    paidDate?: SortOrderInput | SortOrder
    paymentMode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    paymentId?: StringWithAggregatesFilter<"Payment"> | string
    memberID?: StringWithAggregatesFilter<"Payment"> | string
    name?: StringWithAggregatesFilter<"Payment"> | string
    mobileNumber?: StringWithAggregatesFilter<"Payment"> | string
    packageType?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    packageAmount?: FloatNullableWithAggregatesFilter<"Payment"> | number | null
    paidAmount?: FloatNullableWithAggregatesFilter<"Payment"> | number | null
    pending?: FloatNullableWithAggregatesFilter<"Payment"> | number | null
    paidDate?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    paymentMode?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type FileSyncQueueWhereInput = {
    AND?: FileSyncQueueWhereInput | FileSyncQueueWhereInput[]
    OR?: FileSyncQueueWhereInput[]
    NOT?: FileSyncQueueWhereInput | FileSyncQueueWhereInput[]
    id?: IntFilter<"FileSyncQueue"> | number
    localPath?: StringFilter<"FileSyncQueue"> | string
    remoteUrl?: StringNullableFilter<"FileSyncQueue"> | string | null
    fileType?: StringFilter<"FileSyncQueue"> | string
    entityType?: StringFilter<"FileSyncQueue"> | string
    entityId?: IntFilter<"FileSyncQueue"> | number
    fieldName?: StringFilter<"FileSyncQueue"> | string
    status?: StringFilter<"FileSyncQueue"> | string
    errorMessage?: StringNullableFilter<"FileSyncQueue"> | string | null
    retryCount?: IntFilter<"FileSyncQueue"> | number
    createdAt?: DateTimeFilter<"FileSyncQueue"> | Date | string
    updatedAt?: DateTimeFilter<"FileSyncQueue"> | Date | string
    syncedAt?: DateTimeNullableFilter<"FileSyncQueue"> | Date | string | null
  }

  export type FileSyncQueueOrderByWithRelationInput = {
    id?: SortOrder
    localPath?: SortOrder
    remoteUrl?: SortOrderInput | SortOrder
    fileType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    fieldName?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
  }

  export type FileSyncQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    localPath?: string
    AND?: FileSyncQueueWhereInput | FileSyncQueueWhereInput[]
    OR?: FileSyncQueueWhereInput[]
    NOT?: FileSyncQueueWhereInput | FileSyncQueueWhereInput[]
    remoteUrl?: StringNullableFilter<"FileSyncQueue"> | string | null
    fileType?: StringFilter<"FileSyncQueue"> | string
    entityType?: StringFilter<"FileSyncQueue"> | string
    entityId?: IntFilter<"FileSyncQueue"> | number
    fieldName?: StringFilter<"FileSyncQueue"> | string
    status?: StringFilter<"FileSyncQueue"> | string
    errorMessage?: StringNullableFilter<"FileSyncQueue"> | string | null
    retryCount?: IntFilter<"FileSyncQueue"> | number
    createdAt?: DateTimeFilter<"FileSyncQueue"> | Date | string
    updatedAt?: DateTimeFilter<"FileSyncQueue"> | Date | string
    syncedAt?: DateTimeNullableFilter<"FileSyncQueue"> | Date | string | null
  }, "id" | "localPath">

  export type FileSyncQueueOrderByWithAggregationInput = {
    id?: SortOrder
    localPath?: SortOrder
    remoteUrl?: SortOrderInput | SortOrder
    fileType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    fieldName?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    _count?: FileSyncQueueCountOrderByAggregateInput
    _avg?: FileSyncQueueAvgOrderByAggregateInput
    _max?: FileSyncQueueMaxOrderByAggregateInput
    _min?: FileSyncQueueMinOrderByAggregateInput
    _sum?: FileSyncQueueSumOrderByAggregateInput
  }

  export type FileSyncQueueScalarWhereWithAggregatesInput = {
    AND?: FileSyncQueueScalarWhereWithAggregatesInput | FileSyncQueueScalarWhereWithAggregatesInput[]
    OR?: FileSyncQueueScalarWhereWithAggregatesInput[]
    NOT?: FileSyncQueueScalarWhereWithAggregatesInput | FileSyncQueueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FileSyncQueue"> | number
    localPath?: StringWithAggregatesFilter<"FileSyncQueue"> | string
    remoteUrl?: StringNullableWithAggregatesFilter<"FileSyncQueue"> | string | null
    fileType?: StringWithAggregatesFilter<"FileSyncQueue"> | string
    entityType?: StringWithAggregatesFilter<"FileSyncQueue"> | string
    entityId?: IntWithAggregatesFilter<"FileSyncQueue"> | number
    fieldName?: StringWithAggregatesFilter<"FileSyncQueue"> | string
    status?: StringWithAggregatesFilter<"FileSyncQueue"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"FileSyncQueue"> | string | null
    retryCount?: IntWithAggregatesFilter<"FileSyncQueue"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FileSyncQueue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FileSyncQueue"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"FileSyncQueue"> | Date | string | null
  }

  export type StaffCreateInput = {
    employeeCode: string
    firstname: string
    lastname?: string | null
    email?: string | null
    mobileNumber: string
    alternateNumber?: string | null
    gender?: string | null
    age?: number | null
    dateOfBirth?: Date | string | null
    biometricId?: string | null
    joiningDate?: Date | string | null
    bloodGroup?: string | null
    designation?: string | null
    status?: boolean | null
    photoPicture?: string | null
    permanentAddress: string
    communicationAddress: string
  }

  export type StaffUncheckedCreateInput = {
    id?: number
    employeeCode: string
    firstname: string
    lastname?: string | null
    email?: string | null
    mobileNumber: string
    alternateNumber?: string | null
    gender?: string | null
    age?: number | null
    dateOfBirth?: Date | string | null
    biometricId?: string | null
    joiningDate?: Date | string | null
    bloodGroup?: string | null
    designation?: string | null
    status?: boolean | null
    photoPicture?: string | null
    permanentAddress: string
    communicationAddress: string
  }

  export type StaffUpdateInput = {
    employeeCode?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    alternateNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biometricId?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPicture?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type StaffUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeCode?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    alternateNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biometricId?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPicture?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type StaffCreateManyInput = {
    id?: number
    employeeCode: string
    firstname: string
    lastname?: string | null
    email?: string | null
    mobileNumber: string
    alternateNumber?: string | null
    gender?: string | null
    age?: number | null
    dateOfBirth?: Date | string | null
    biometricId?: string | null
    joiningDate?: Date | string | null
    bloodGroup?: string | null
    designation?: string | null
    status?: boolean | null
    photoPicture?: string | null
    permanentAddress: string
    communicationAddress: string
  }

  export type StaffUpdateManyMutationInput = {
    employeeCode?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    alternateNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biometricId?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPicture?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeCode?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    alternateNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biometricId?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableBoolFieldUpdateOperationsInput | boolean | null
    photoPicture?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type PackageCreateInput = {
    packageCode: string
    packageName: string
    month: number
    day: number
    amount: number
    active: boolean
    createdAt?: Date | string
  }

  export type PackageUncheckedCreateInput = {
    id?: number
    packageCode: string
    packageName: string
    month: number
    day: number
    amount: number
    active: boolean
    createdAt?: Date | string
  }

  export type PackageUpdateInput = {
    packageCode?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    packageCode?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageCreateManyInput = {
    id?: number
    packageCode: string
    packageName: string
    month: number
    day: number
    amount: number
    active: boolean
    createdAt?: Date | string
  }

  export type PackageUpdateManyMutationInput = {
    packageCode?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    packageCode?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    day?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateInput = {
    memberID: string
    firstName: string
    lastName?: string | null
    email?: string | null
    mobileNumber: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    maritalStatus?: string | null
    memberPhoto?: string | null
    homeContactNumber?: string | null
    bloodGroup?: string | null
    active?: boolean | null
    gstNumber?: string | null
    remarks?: string | null
    assignTrainer?: string | null
    gstType?: string | null
    packageType?: string | null
    isMainPackage?: boolean | null
    packageAmount?: number | null
    gstamount?: number | null
    duration?: string | null
    discount?: number | null
    paidAmount?: number | null
    paidDate?: Date | string | null
    paymentMode?: string | null
    receiptType?: string | null
    startDate?: Date | string | null
    fitnessDate?: Date | string | null
    weight?: number | null
    height?: number | null
    neck?: number | null
    shoulders?: number | null
    chest?: number | null
    biceps?: number | null
    upperAbs?: number | null
    waist?: number | null
    lowerAbs?: number | null
    hip?: number | null
    thigh?: number | null
    calf?: number | null
    proofType?: string | null
    proofNo?: string | null
    expiryDate?: Date | string | null
    proofDocument?: string | null
    createdAt?: Date | string
    permanentAddress: string
    communicationAddress: string
  }

  export type MemberUncheckedCreateInput = {
    id?: number
    memberID: string
    firstName: string
    lastName?: string | null
    email?: string | null
    mobileNumber: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    maritalStatus?: string | null
    memberPhoto?: string | null
    homeContactNumber?: string | null
    bloodGroup?: string | null
    active?: boolean | null
    gstNumber?: string | null
    remarks?: string | null
    assignTrainer?: string | null
    gstType?: string | null
    packageType?: string | null
    isMainPackage?: boolean | null
    packageAmount?: number | null
    gstamount?: number | null
    duration?: string | null
    discount?: number | null
    paidAmount?: number | null
    paidDate?: Date | string | null
    paymentMode?: string | null
    receiptType?: string | null
    startDate?: Date | string | null
    fitnessDate?: Date | string | null
    weight?: number | null
    height?: number | null
    neck?: number | null
    shoulders?: number | null
    chest?: number | null
    biceps?: number | null
    upperAbs?: number | null
    waist?: number | null
    lowerAbs?: number | null
    hip?: number | null
    thigh?: number | null
    calf?: number | null
    proofType?: string | null
    proofNo?: string | null
    expiryDate?: Date | string | null
    proofDocument?: string | null
    createdAt?: Date | string
    permanentAddress: string
    communicationAddress: string
  }

  export type MemberUpdateInput = {
    memberID?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    memberPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    homeContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignTrainer?: NullableStringFieldUpdateOperationsInput | string | null
    gstType?: NullableStringFieldUpdateOperationsInput | string | null
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    isMainPackage?: NullableBoolFieldUpdateOperationsInput | boolean | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    gstamount?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    receiptType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fitnessDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    neck?: NullableFloatFieldUpdateOperationsInput | number | null
    shoulders?: NullableFloatFieldUpdateOperationsInput | number | null
    chest?: NullableFloatFieldUpdateOperationsInput | number | null
    biceps?: NullableFloatFieldUpdateOperationsInput | number | null
    upperAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    waist?: NullableFloatFieldUpdateOperationsInput | number | null
    lowerAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    hip?: NullableFloatFieldUpdateOperationsInput | number | null
    thigh?: NullableFloatFieldUpdateOperationsInput | number | null
    calf?: NullableFloatFieldUpdateOperationsInput | number | null
    proofType?: NullableStringFieldUpdateOperationsInput | string | null
    proofNo?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofDocument?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type MemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberID?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    memberPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    homeContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignTrainer?: NullableStringFieldUpdateOperationsInput | string | null
    gstType?: NullableStringFieldUpdateOperationsInput | string | null
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    isMainPackage?: NullableBoolFieldUpdateOperationsInput | boolean | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    gstamount?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    receiptType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fitnessDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    neck?: NullableFloatFieldUpdateOperationsInput | number | null
    shoulders?: NullableFloatFieldUpdateOperationsInput | number | null
    chest?: NullableFloatFieldUpdateOperationsInput | number | null
    biceps?: NullableFloatFieldUpdateOperationsInput | number | null
    upperAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    waist?: NullableFloatFieldUpdateOperationsInput | number | null
    lowerAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    hip?: NullableFloatFieldUpdateOperationsInput | number | null
    thigh?: NullableFloatFieldUpdateOperationsInput | number | null
    calf?: NullableFloatFieldUpdateOperationsInput | number | null
    proofType?: NullableStringFieldUpdateOperationsInput | string | null
    proofNo?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofDocument?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type MemberCreateManyInput = {
    id?: number
    memberID: string
    firstName: string
    lastName?: string | null
    email?: string | null
    mobileNumber: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    maritalStatus?: string | null
    memberPhoto?: string | null
    homeContactNumber?: string | null
    bloodGroup?: string | null
    active?: boolean | null
    gstNumber?: string | null
    remarks?: string | null
    assignTrainer?: string | null
    gstType?: string | null
    packageType?: string | null
    isMainPackage?: boolean | null
    packageAmount?: number | null
    gstamount?: number | null
    duration?: string | null
    discount?: number | null
    paidAmount?: number | null
    paidDate?: Date | string | null
    paymentMode?: string | null
    receiptType?: string | null
    startDate?: Date | string | null
    fitnessDate?: Date | string | null
    weight?: number | null
    height?: number | null
    neck?: number | null
    shoulders?: number | null
    chest?: number | null
    biceps?: number | null
    upperAbs?: number | null
    waist?: number | null
    lowerAbs?: number | null
    hip?: number | null
    thigh?: number | null
    calf?: number | null
    proofType?: string | null
    proofNo?: string | null
    expiryDate?: Date | string | null
    proofDocument?: string | null
    createdAt?: Date | string
    permanentAddress: string
    communicationAddress: string
  }

  export type MemberUpdateManyMutationInput = {
    memberID?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    memberPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    homeContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignTrainer?: NullableStringFieldUpdateOperationsInput | string | null
    gstType?: NullableStringFieldUpdateOperationsInput | string | null
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    isMainPackage?: NullableBoolFieldUpdateOperationsInput | boolean | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    gstamount?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    receiptType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fitnessDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    neck?: NullableFloatFieldUpdateOperationsInput | number | null
    shoulders?: NullableFloatFieldUpdateOperationsInput | number | null
    chest?: NullableFloatFieldUpdateOperationsInput | number | null
    biceps?: NullableFloatFieldUpdateOperationsInput | number | null
    upperAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    waist?: NullableFloatFieldUpdateOperationsInput | number | null
    lowerAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    hip?: NullableFloatFieldUpdateOperationsInput | number | null
    thigh?: NullableFloatFieldUpdateOperationsInput | number | null
    calf?: NullableFloatFieldUpdateOperationsInput | number | null
    proofType?: NullableStringFieldUpdateOperationsInput | string | null
    proofNo?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofDocument?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberID?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    memberPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    homeContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignTrainer?: NullableStringFieldUpdateOperationsInput | string | null
    gstType?: NullableStringFieldUpdateOperationsInput | string | null
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    isMainPackage?: NullableBoolFieldUpdateOperationsInput | boolean | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    gstamount?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    receiptType?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fitnessDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    neck?: NullableFloatFieldUpdateOperationsInput | number | null
    shoulders?: NullableFloatFieldUpdateOperationsInput | number | null
    chest?: NullableFloatFieldUpdateOperationsInput | number | null
    biceps?: NullableFloatFieldUpdateOperationsInput | number | null
    upperAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    waist?: NullableFloatFieldUpdateOperationsInput | number | null
    lowerAbs?: NullableFloatFieldUpdateOperationsInput | number | null
    hip?: NullableFloatFieldUpdateOperationsInput | number | null
    thigh?: NullableFloatFieldUpdateOperationsInput | number | null
    calf?: NullableFloatFieldUpdateOperationsInput | number | null
    proofType?: NullableStringFieldUpdateOperationsInput | string | null
    proofNo?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofDocument?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permanentAddress?: StringFieldUpdateOperationsInput | string
    communicationAddress?: StringFieldUpdateOperationsInput | string
  }

  export type EnquiryCreateInput = {
    firstName: string
    lastName?: string | null
    mobileNumber: string
    email?: string | null
    alternateContact?: string | null
    enquiryFor: string
    status: string
    howToKnowAboutUs: string
    enquiryDate: Date | string
    expectedJoiningDate?: Date | string | null
    followUpDate: Date | string
    remarks?: string | null
  }

  export type EnquiryUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName?: string | null
    mobileNumber: string
    email?: string | null
    alternateContact?: string | null
    enquiryFor: string
    status: string
    howToKnowAboutUs: string
    enquiryDate: Date | string
    expectedJoiningDate?: Date | string | null
    followUpDate: Date | string
    remarks?: string | null
  }

  export type EnquiryUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    enquiryFor?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    howToKnowAboutUs?: StringFieldUpdateOperationsInput | string
    enquiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedJoiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnquiryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    enquiryFor?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    howToKnowAboutUs?: StringFieldUpdateOperationsInput | string
    enquiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedJoiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnquiryCreateManyInput = {
    id?: number
    firstName: string
    lastName?: string | null
    mobileNumber: string
    email?: string | null
    alternateContact?: string | null
    enquiryFor: string
    status: string
    howToKnowAboutUs: string
    enquiryDate: Date | string
    expectedJoiningDate?: Date | string | null
    followUpDate: Date | string
    remarks?: string | null
  }

  export type EnquiryUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    enquiryFor?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    howToKnowAboutUs?: StringFieldUpdateOperationsInput | string
    enquiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedJoiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnquiryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    enquiryFor?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    howToKnowAboutUs?: StringFieldUpdateOperationsInput | string
    enquiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedJoiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DietPlanCreateInput = {
    chartName: string
    chartTable: string
    file?: string | null
    createdDate?: Date | string
    assignedCount?: number | null
    assign?: string | null
  }

  export type DietPlanUncheckedCreateInput = {
    id?: number
    chartName: string
    chartTable: string
    file?: string | null
    createdDate?: Date | string
    assignedCount?: number | null
    assign?: string | null
  }

  export type DietPlanUpdateInput = {
    chartName?: StringFieldUpdateOperationsInput | string
    chartTable?: StringFieldUpdateOperationsInput | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCount?: NullableIntFieldUpdateOperationsInput | number | null
    assign?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DietPlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    chartName?: StringFieldUpdateOperationsInput | string
    chartTable?: StringFieldUpdateOperationsInput | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCount?: NullableIntFieldUpdateOperationsInput | number | null
    assign?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DietPlanCreateManyInput = {
    id?: number
    chartName: string
    chartTable: string
    file?: string | null
    createdDate?: Date | string
    assignedCount?: number | null
    assign?: string | null
  }

  export type DietPlanUpdateManyMutationInput = {
    chartName?: StringFieldUpdateOperationsInput | string
    chartTable?: StringFieldUpdateOperationsInput | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCount?: NullableIntFieldUpdateOperationsInput | number | null
    assign?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DietPlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    chartName?: StringFieldUpdateOperationsInput | string
    chartTable?: StringFieldUpdateOperationsInput | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCount?: NullableIntFieldUpdateOperationsInput | number | null
    assign?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExercisePlanCreateInput = {
    planname: string
    warmUp?: string | null
    details: string
    assign?: string | null
    createdDate?: Date | string
    file?: string | null
  }

  export type ExercisePlanUncheckedCreateInput = {
    id?: number
    planname: string
    warmUp?: string | null
    details: string
    assign?: string | null
    createdDate?: Date | string
    file?: string | null
  }

  export type ExercisePlanUpdateInput = {
    planname?: StringFieldUpdateOperationsInput | string
    warmUp?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    assign?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExercisePlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    planname?: StringFieldUpdateOperationsInput | string
    warmUp?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    assign?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExercisePlanCreateManyInput = {
    id?: number
    planname: string
    warmUp?: string | null
    details: string
    assign?: string | null
    createdDate?: Date | string
    file?: string | null
  }

  export type ExercisePlanUpdateManyMutationInput = {
    planname?: StringFieldUpdateOperationsInput | string
    warmUp?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    assign?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExercisePlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    planname?: StringFieldUpdateOperationsInput | string
    warmUp?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    assign?: NullableStringFieldUpdateOperationsInput | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateInput = {
    expenseDate: Date | string
    expenseType: string
    description?: string | null
    amount: number
    paymentMode: string
    remarks?: string | null
    receiptFile: string
  }

  export type ExpenseUncheckedCreateInput = {
    id?: number
    expenseDate: Date | string
    expenseType: string
    description?: string | null
    amount: number
    paymentMode: string
    remarks?: string | null
    receiptFile: string
  }

  export type ExpenseUpdateInput = {
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMode?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptFile?: StringFieldUpdateOperationsInput | string
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMode?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptFile?: StringFieldUpdateOperationsInput | string
  }

  export type ExpenseCreateManyInput = {
    id?: number
    expenseDate: Date | string
    expenseType: string
    description?: string | null
    amount: number
    paymentMode: string
    remarks?: string | null
    receiptFile: string
  }

  export type ExpenseUpdateManyMutationInput = {
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMode?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptFile?: StringFieldUpdateOperationsInput | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMode?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    receiptFile?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessInfoCreateInput = {
    businessName: string
    contactPerson: string
    mobileNumber: string
    email: string
    businessLogo?: string | null
    packageName?: string | null
    paymentAmount?: number | null
    paidAmount?: number | null
    pendingAmount?: number | null
    expiryDate?: Date | string | null
    address: string
    district: string
    state: string
    pincode: string
    configurations: string
  }

  export type BusinessInfoUncheckedCreateInput = {
    id?: number
    businessName: string
    contactPerson: string
    mobileNumber: string
    email: string
    businessLogo?: string | null
    packageName?: string | null
    paymentAmount?: number | null
    paidAmount?: number | null
    pendingAmount?: number | null
    expiryDate?: Date | string | null
    address: string
    district: string
    state: string
    pincode: string
    configurations: string
  }

  export type BusinessInfoUpdateInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pendingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    configurations?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessInfoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pendingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    configurations?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessInfoCreateManyInput = {
    id?: number
    businessName: string
    contactPerson: string
    mobileNumber: string
    email: string
    businessLogo?: string | null
    packageName?: string | null
    paymentAmount?: number | null
    paidAmount?: number | null
    pendingAmount?: number | null
    expiryDate?: Date | string | null
    address: string
    district: string
    state: string
    pincode: string
    configurations: string
  }

  export type BusinessInfoUpdateManyMutationInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pendingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    configurations?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessInfoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    businessLogo?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pendingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    configurations?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceCreateInput = {
    memberID: string
    name: string
    biometricID?: string | null
    joiningDate?: Date | string | null
    inTime?: Date | string
    outTime?: string | null
    month: string
  }

  export type AttendanceUncheckedCreateInput = {
    id?: number
    memberID: string
    name: string
    biometricID?: string | null
    joiningDate?: Date | string | null
    inTime?: Date | string
    outTime?: string | null
    month: string
  }

  export type AttendanceUpdateInput = {
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceCreateManyInput = {
    id?: number
    memberID: string
    name: string
    biometricID?: string | null
    joiningDate?: Date | string | null
    inTime?: Date | string
    outTime?: string | null
    month: string
  }

  export type AttendanceUpdateManyMutationInput = {
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type StaffAttendanceCreateInput = {
    employeeCode: string
    name: string
    biometricID?: string | null
    joiningDate?: Date | string | null
    inTime?: Date | string
    outTime?: string | null
    month: string
  }

  export type StaffAttendanceUncheckedCreateInput = {
    id?: number
    employeeCode: string
    name: string
    biometricID?: string | null
    joiningDate?: Date | string | null
    inTime?: Date | string
    outTime?: string | null
    month: string
  }

  export type StaffAttendanceUpdateInput = {
    employeeCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type StaffAttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type StaffAttendanceCreateManyInput = {
    id?: number
    employeeCode: string
    name: string
    biometricID?: string | null
    joiningDate?: Date | string | null
    inTime?: Date | string
    outTime?: string | null
    month: string
  }

  export type StaffAttendanceUpdateManyMutationInput = {
    employeeCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type StaffAttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    biometricID?: NullableStringFieldUpdateOperationsInput | string | null
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inTime?: DateTimeFieldUpdateOperationsInput | Date | string
    outTime?: NullableStringFieldUpdateOperationsInput | string | null
    month?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateInput = {
    paymentId: string
    memberID: string
    name: string
    mobileNumber: string
    packageType?: string | null
    packageAmount?: number | null
    paidAmount?: number | null
    pending?: number | null
    paidDate?: Date | string | null
    paymentMode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    paymentId: string
    memberID: string
    name: string
    mobileNumber: string
    packageType?: string | null
    packageAmount?: number | null
    paidAmount?: number | null
    pending?: number | null
    paidDate?: Date | string | null
    paymentMode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pending?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pending?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    paymentId: string
    memberID: string
    name: string
    mobileNumber: string
    packageType?: string | null
    packageAmount?: number | null
    paidAmount?: number | null
    pending?: number | null
    paidDate?: Date | string | null
    paymentMode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pending?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    memberID?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    packageType?: NullableStringFieldUpdateOperationsInput | string | null
    packageAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    pending?: NullableFloatFieldUpdateOperationsInput | number | null
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileSyncQueueCreateInput = {
    localPath: string
    remoteUrl?: string | null
    fileType: string
    entityType: string
    entityId: number
    fieldName: string
    status?: string
    errorMessage?: string | null
    retryCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type FileSyncQueueUncheckedCreateInput = {
    id?: number
    localPath: string
    remoteUrl?: string | null
    fileType: string
    entityType: string
    entityId: number
    fieldName: string
    status?: string
    errorMessage?: string | null
    retryCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type FileSyncQueueUpdateInput = {
    localPath?: StringFieldUpdateOperationsInput | string
    remoteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileSyncQueueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    localPath?: StringFieldUpdateOperationsInput | string
    remoteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileSyncQueueCreateManyInput = {
    id?: number
    localPath: string
    remoteUrl?: string | null
    fileType: string
    entityType: string
    entityId: number
    fieldName: string
    status?: string
    errorMessage?: string | null
    retryCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    syncedAt?: Date | string | null
  }

  export type FileSyncQueueUpdateManyMutationInput = {
    localPath?: StringFieldUpdateOperationsInput | string
    remoteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileSyncQueueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    localPath?: StringFieldUpdateOperationsInput | string
    remoteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: IntFieldUpdateOperationsInput | number
    fieldName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    mobileNumber?: SortOrder
    alternateNumber?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    dateOfBirth?: SortOrder
    biometricId?: SortOrder
    joiningDate?: SortOrder
    bloodGroup?: SortOrder
    designation?: SortOrder
    status?: SortOrder
    photoPicture?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type StaffAvgOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    mobileNumber?: SortOrder
    alternateNumber?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    dateOfBirth?: SortOrder
    biometricId?: SortOrder
    joiningDate?: SortOrder
    bloodGroup?: SortOrder
    designation?: SortOrder
    status?: SortOrder
    photoPicture?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    mobileNumber?: SortOrder
    alternateNumber?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    dateOfBirth?: SortOrder
    biometricId?: SortOrder
    joiningDate?: SortOrder
    bloodGroup?: SortOrder
    designation?: SortOrder
    status?: SortOrder
    photoPicture?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type StaffSumOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PackageCountOrderByAggregateInput = {
    id?: SortOrder
    packageCode?: SortOrder
    packageName?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PackageAvgOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
  }

  export type PackageMaxOrderByAggregateInput = {
    id?: SortOrder
    packageCode?: SortOrder
    packageName?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PackageMinOrderByAggregateInput = {
    id?: SortOrder
    packageCode?: SortOrder
    packageName?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PackageSumOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    day?: SortOrder
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    memberID?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobileNumber?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    memberPhoto?: SortOrder
    homeContactNumber?: SortOrder
    bloodGroup?: SortOrder
    active?: SortOrder
    gstNumber?: SortOrder
    remarks?: SortOrder
    assignTrainer?: SortOrder
    gstType?: SortOrder
    packageType?: SortOrder
    isMainPackage?: SortOrder
    packageAmount?: SortOrder
    gstamount?: SortOrder
    duration?: SortOrder
    discount?: SortOrder
    paidAmount?: SortOrder
    paidDate?: SortOrder
    paymentMode?: SortOrder
    receiptType?: SortOrder
    startDate?: SortOrder
    fitnessDate?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    neck?: SortOrder
    shoulders?: SortOrder
    chest?: SortOrder
    biceps?: SortOrder
    upperAbs?: SortOrder
    waist?: SortOrder
    lowerAbs?: SortOrder
    hip?: SortOrder
    thigh?: SortOrder
    calf?: SortOrder
    proofType?: SortOrder
    proofNo?: SortOrder
    expiryDate?: SortOrder
    proofDocument?: SortOrder
    createdAt?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type MemberAvgOrderByAggregateInput = {
    id?: SortOrder
    packageAmount?: SortOrder
    gstamount?: SortOrder
    discount?: SortOrder
    paidAmount?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    neck?: SortOrder
    shoulders?: SortOrder
    chest?: SortOrder
    biceps?: SortOrder
    upperAbs?: SortOrder
    waist?: SortOrder
    lowerAbs?: SortOrder
    hip?: SortOrder
    thigh?: SortOrder
    calf?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    memberID?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobileNumber?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    memberPhoto?: SortOrder
    homeContactNumber?: SortOrder
    bloodGroup?: SortOrder
    active?: SortOrder
    gstNumber?: SortOrder
    remarks?: SortOrder
    assignTrainer?: SortOrder
    gstType?: SortOrder
    packageType?: SortOrder
    isMainPackage?: SortOrder
    packageAmount?: SortOrder
    gstamount?: SortOrder
    duration?: SortOrder
    discount?: SortOrder
    paidAmount?: SortOrder
    paidDate?: SortOrder
    paymentMode?: SortOrder
    receiptType?: SortOrder
    startDate?: SortOrder
    fitnessDate?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    neck?: SortOrder
    shoulders?: SortOrder
    chest?: SortOrder
    biceps?: SortOrder
    upperAbs?: SortOrder
    waist?: SortOrder
    lowerAbs?: SortOrder
    hip?: SortOrder
    thigh?: SortOrder
    calf?: SortOrder
    proofType?: SortOrder
    proofNo?: SortOrder
    expiryDate?: SortOrder
    proofDocument?: SortOrder
    createdAt?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    memberID?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobileNumber?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    memberPhoto?: SortOrder
    homeContactNumber?: SortOrder
    bloodGroup?: SortOrder
    active?: SortOrder
    gstNumber?: SortOrder
    remarks?: SortOrder
    assignTrainer?: SortOrder
    gstType?: SortOrder
    packageType?: SortOrder
    isMainPackage?: SortOrder
    packageAmount?: SortOrder
    gstamount?: SortOrder
    duration?: SortOrder
    discount?: SortOrder
    paidAmount?: SortOrder
    paidDate?: SortOrder
    paymentMode?: SortOrder
    receiptType?: SortOrder
    startDate?: SortOrder
    fitnessDate?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    neck?: SortOrder
    shoulders?: SortOrder
    chest?: SortOrder
    biceps?: SortOrder
    upperAbs?: SortOrder
    waist?: SortOrder
    lowerAbs?: SortOrder
    hip?: SortOrder
    thigh?: SortOrder
    calf?: SortOrder
    proofType?: SortOrder
    proofNo?: SortOrder
    expiryDate?: SortOrder
    proofDocument?: SortOrder
    createdAt?: SortOrder
    permanentAddress?: SortOrder
    communicationAddress?: SortOrder
  }

  export type MemberSumOrderByAggregateInput = {
    id?: SortOrder
    packageAmount?: SortOrder
    gstamount?: SortOrder
    discount?: SortOrder
    paidAmount?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    neck?: SortOrder
    shoulders?: SortOrder
    chest?: SortOrder
    biceps?: SortOrder
    upperAbs?: SortOrder
    waist?: SortOrder
    lowerAbs?: SortOrder
    hip?: SortOrder
    thigh?: SortOrder
    calf?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnquiryCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    alternateContact?: SortOrder
    enquiryFor?: SortOrder
    status?: SortOrder
    howToKnowAboutUs?: SortOrder
    enquiryDate?: SortOrder
    expectedJoiningDate?: SortOrder
    followUpDate?: SortOrder
    remarks?: SortOrder
  }

  export type EnquiryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnquiryMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    alternateContact?: SortOrder
    enquiryFor?: SortOrder
    status?: SortOrder
    howToKnowAboutUs?: SortOrder
    enquiryDate?: SortOrder
    expectedJoiningDate?: SortOrder
    followUpDate?: SortOrder
    remarks?: SortOrder
  }

  export type EnquiryMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    alternateContact?: SortOrder
    enquiryFor?: SortOrder
    status?: SortOrder
    howToKnowAboutUs?: SortOrder
    enquiryDate?: SortOrder
    expectedJoiningDate?: SortOrder
    followUpDate?: SortOrder
    remarks?: SortOrder
  }

  export type EnquirySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DietPlanCountOrderByAggregateInput = {
    id?: SortOrder
    chartName?: SortOrder
    chartTable?: SortOrder
    file?: SortOrder
    createdDate?: SortOrder
    assignedCount?: SortOrder
    assign?: SortOrder
  }

  export type DietPlanAvgOrderByAggregateInput = {
    id?: SortOrder
    assignedCount?: SortOrder
  }

  export type DietPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    chartName?: SortOrder
    chartTable?: SortOrder
    file?: SortOrder
    createdDate?: SortOrder
    assignedCount?: SortOrder
    assign?: SortOrder
  }

  export type DietPlanMinOrderByAggregateInput = {
    id?: SortOrder
    chartName?: SortOrder
    chartTable?: SortOrder
    file?: SortOrder
    createdDate?: SortOrder
    assignedCount?: SortOrder
    assign?: SortOrder
  }

  export type DietPlanSumOrderByAggregateInput = {
    id?: SortOrder
    assignedCount?: SortOrder
  }

  export type ExercisePlanCountOrderByAggregateInput = {
    id?: SortOrder
    planname?: SortOrder
    warmUp?: SortOrder
    details?: SortOrder
    assign?: SortOrder
    createdDate?: SortOrder
    file?: SortOrder
  }

  export type ExercisePlanAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExercisePlanMaxOrderByAggregateInput = {
    id?: SortOrder
    planname?: SortOrder
    warmUp?: SortOrder
    details?: SortOrder
    assign?: SortOrder
    createdDate?: SortOrder
    file?: SortOrder
  }

  export type ExercisePlanMinOrderByAggregateInput = {
    id?: SortOrder
    planname?: SortOrder
    warmUp?: SortOrder
    details?: SortOrder
    assign?: SortOrder
    createdDate?: SortOrder
    file?: SortOrder
  }

  export type ExercisePlanSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    expenseType?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    paymentMode?: SortOrder
    remarks?: SortOrder
    receiptFile?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    expenseType?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    paymentMode?: SortOrder
    remarks?: SortOrder
    receiptFile?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    expenseType?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    paymentMode?: SortOrder
    remarks?: SortOrder
    receiptFile?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type BusinessInfoCountOrderByAggregateInput = {
    id?: SortOrder
    businessName?: SortOrder
    contactPerson?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    businessLogo?: SortOrder
    packageName?: SortOrder
    paymentAmount?: SortOrder
    paidAmount?: SortOrder
    pendingAmount?: SortOrder
    expiryDate?: SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    configurations?: SortOrder
  }

  export type BusinessInfoAvgOrderByAggregateInput = {
    id?: SortOrder
    paymentAmount?: SortOrder
    paidAmount?: SortOrder
    pendingAmount?: SortOrder
  }

  export type BusinessInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    businessName?: SortOrder
    contactPerson?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    businessLogo?: SortOrder
    packageName?: SortOrder
    paymentAmount?: SortOrder
    paidAmount?: SortOrder
    pendingAmount?: SortOrder
    expiryDate?: SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    configurations?: SortOrder
  }

  export type BusinessInfoMinOrderByAggregateInput = {
    id?: SortOrder
    businessName?: SortOrder
    contactPerson?: SortOrder
    mobileNumber?: SortOrder
    email?: SortOrder
    businessLogo?: SortOrder
    packageName?: SortOrder
    paymentAmount?: SortOrder
    paidAmount?: SortOrder
    pendingAmount?: SortOrder
    expiryDate?: SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    configurations?: SortOrder
  }

  export type BusinessInfoSumOrderByAggregateInput = {
    id?: SortOrder
    paymentAmount?: SortOrder
    paidAmount?: SortOrder
    pendingAmount?: SortOrder
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    biometricID?: SortOrder
    joiningDate?: SortOrder
    inTime?: SortOrder
    outTime?: SortOrder
    month?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    biometricID?: SortOrder
    joiningDate?: SortOrder
    inTime?: SortOrder
    outTime?: SortOrder
    month?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    biometricID?: SortOrder
    joiningDate?: SortOrder
    inTime?: SortOrder
    outTime?: SortOrder
    month?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StaffAttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    name?: SortOrder
    biometricID?: SortOrder
    joiningDate?: SortOrder
    inTime?: SortOrder
    outTime?: SortOrder
    month?: SortOrder
  }

  export type StaffAttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StaffAttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    name?: SortOrder
    biometricID?: SortOrder
    joiningDate?: SortOrder
    inTime?: SortOrder
    outTime?: SortOrder
    month?: SortOrder
  }

  export type StaffAttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeCode?: SortOrder
    name?: SortOrder
    biometricID?: SortOrder
    joiningDate?: SortOrder
    inTime?: SortOrder
    outTime?: SortOrder
    month?: SortOrder
  }

  export type StaffAttendanceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    mobileNumber?: SortOrder
    packageType?: SortOrder
    packageAmount?: SortOrder
    paidAmount?: SortOrder
    pending?: SortOrder
    paidDate?: SortOrder
    paymentMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    packageAmount?: SortOrder
    paidAmount?: SortOrder
    pending?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    mobileNumber?: SortOrder
    packageType?: SortOrder
    packageAmount?: SortOrder
    paidAmount?: SortOrder
    pending?: SortOrder
    paidDate?: SortOrder
    paymentMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    memberID?: SortOrder
    name?: SortOrder
    mobileNumber?: SortOrder
    packageType?: SortOrder
    packageAmount?: SortOrder
    paidAmount?: SortOrder
    pending?: SortOrder
    paidDate?: SortOrder
    paymentMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    packageAmount?: SortOrder
    paidAmount?: SortOrder
    pending?: SortOrder
  }

  export type FileSyncQueueCountOrderByAggregateInput = {
    id?: SortOrder
    localPath?: SortOrder
    remoteUrl?: SortOrder
    fileType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    fieldName?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type FileSyncQueueAvgOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    retryCount?: SortOrder
  }

  export type FileSyncQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    localPath?: SortOrder
    remoteUrl?: SortOrder
    fileType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    fieldName?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type FileSyncQueueMinOrderByAggregateInput = {
    id?: SortOrder
    localPath?: SortOrder
    remoteUrl?: SortOrder
    fileType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    fieldName?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type FileSyncQueueSumOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    retryCount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StaffDefaultArgs instead
     */
    export type StaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PackageDefaultArgs instead
     */
    export type PackageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PackageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberDefaultArgs instead
     */
    export type MemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EnquiryDefaultArgs instead
     */
    export type EnquiryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EnquiryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DietPlanDefaultArgs instead
     */
    export type DietPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DietPlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExercisePlanDefaultArgs instead
     */
    export type ExercisePlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExercisePlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenseDefaultArgs instead
     */
    export type ExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BusinessInfoDefaultArgs instead
     */
    export type BusinessInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BusinessInfoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttendanceDefaultArgs instead
     */
    export type AttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StaffAttendanceDefaultArgs instead
     */
    export type StaffAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffAttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FileSyncQueueDefaultArgs instead
     */
    export type FileSyncQueueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FileSyncQueueDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}