module.exports = {
	rdbms: {
		username: process.env.RDBMS_DATABASE_USERNAME,
		password: process.env.RDBMS_DATABASE_PASSWORD,
		name: process.env.RDBMS_DATABASE_NAME,
		host: process.env.RDBMS_DATABASE_HOST,
		port: process.env.RDBMS_DATABASE_PORT,
		dialect: 'postgres',
		isEnableSqlLogging: process.env.RDBMS_DATABASE_IS_SQL_LOGGING_ENABLED === "true",
		dialectStatementTimeout: parseInt(process.env.RDBMS_DATABASE_DIALECT_STATEMENT_TIMEOUT) ?? 1000,
		idleInTransactionSessionTimeout: parseInt(process.env.RDBMS_DATABASE_DIALECT_TXN_SESSION_TIMEOUT) ?? 1000,
		pool: {
			min: parseInt(process.env.RDBMS_POOL_MIN_CONNECTIONS) ?? 5,
			max: parseInt(process.env.RDBMS_POOL_MAX_CONNECTIONS) ?? 20,
			acquire: parseInt(process.env.RDBMS_POOL_ACQUIRE_CONNECTION_TIMEOUT) ?? 100000,
			idle: parseInt(process.env.RDBMS_POOL_IDLE_CONNECTION_TIMEOUT) ?? 1000,
			evict: parseInt(process.env.RDBMS_POOL_EVICT_CONNECTION_TIMEOUT) ?? 1000
		},
		connectorConfiguration: {
			charset: 'utf8',
			dialectOptions: {
				collate: 'utf8_general_ci',
				timezone: process.env.RDBMS_CONNECTION_TIMEZONE,
				statement_timeout: parseInt(process.env.RDBMS_POOL_STATEMENT_TIMEOUT) ?? 1000,
				idle_in_transaction_session_timeout: parseInt(process.env.RDBMS_POOL_IDLE_IN_TXN_SESSION_TIMEOUT) ?? 1000
			},
			timestamps: true,
			underscored: false,
			underscoredAll: false,
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
			deletedAt: 'deletedAt',
			paranoid: false,
		}
	},
};
