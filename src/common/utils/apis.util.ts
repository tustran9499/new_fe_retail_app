export const handleResponseError = (error: any) => {
  return Promise.reject(error);
};

export const removeConfirmationFields = (object: any) => {
  const keysWithConfirmation = Object.keys(object).filter((key) =>
    key.includes('confirm')
  );

  const excludedFiltered = { ...object };
  keysWithConfirmation.map((key) => delete excludedFiltered[key]);
  return excludedFiltered;
};

export const removeUnusedProps = (object: any) => {
  let temp = {};
  Object.keys(object).forEach((key) => {
    if (object[key] !== undefined) temp = { ...temp, [key]: object[key] };
  });
  return temp;
};
