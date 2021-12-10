if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: (process.env.PORT as string) || 3000,
  cors: process.env.CORS as string,
  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbHost: process.env.DB_HOST as string,
  dbName: process.env.DB_NAME as string,
  dbPort: (process.env.DB_PORT as string) || '',
};

export default config;
