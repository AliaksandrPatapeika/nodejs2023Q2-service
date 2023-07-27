/**
 * Error messages used in the application.
 */
export const ERROR_MESSAGES = {
  OLD_PASSWORD_IS_WRONG: 'Old password is wrong.',
  RECORD_NOT_FOUND: (recordType: string, id: string) =>
    `${recordType} with id: ${id} does not exist.`,
};

export const uuidVersion = '4';
