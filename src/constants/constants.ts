/**
 * Error messages used in the application.
 */
export const ERROR_MESSAGES = {
  BAD_REQUEST: 'Bad request.',
  INCORRECT_CREDENTIALS: 'Incorrect login or password.',
  INVALID_REFRESH_TOKEN: 'Refresh token is invalid or expired.',
  OLD_PASSWORD_IS_WRONG: 'Old password is wrong.',
  RECORD_NOT_FOUND: (recordType: string, id: string) =>
    `${recordType} with id: ${id} does not exist.`,
  RECORD_NOT_IN_FAVORITES: (recordType: string, id: string) =>
    `${recordType} with id: ${id} is not in favorites.`,
};

/**
 * JWT constants used in the application.
 */
export const JWT_CONSTANTS = {
  CRYPT_SALT: 'CRYPT_SALT',
  JWT_SECRET_KEY: 'JWT_SECRET_KEY',
  JWT_SECRET_REFRESH_KEY: 'JWT_SECRET_REFRESH_KEY',
  TOKEN_EXPIRE_TIME: 'TOKEN_EXPIRE_TIME',
  TOKEN_REFRESH_EXPIRE_TIME: 'TOKEN_REFRESH_EXPIRE_TIME',
};

export const uuidVersion = '4';
export const LOGIN_FIELD = 'login';
