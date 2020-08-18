export interface IMongoDescriptor {
  /**
   * the URL to connect to
   */
  mongoDbUrl: string;

  /**
   * the db to use for the project
   */
  mongoDbName?: string;

  /**
   * a username to use to connect to the database
   */

  mongoDbUser?: string;

  /**
   * an optional password that will be replace <PASSWORD> in the connection string
   */
  mongoDbPass?: string;
}
