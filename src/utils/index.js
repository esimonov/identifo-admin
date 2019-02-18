export const pause = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const getError = (axiosErr) => {
  if (axiosErr.response && axiosErr.response.data) {
    return new Error(axiosErr.response.data.message);
  }

  return axiosErr;
};

export const getInitials = (fullName, email) => {
  const firstNOf = n => str => str.slice(0, n);
  const firstTwoOf = firstNOf(2);
  const firstOneOf = firstNOf(1);

  const [firstName, lastName] = fullName.split(/\s/);

  if (!firstName && !lastName) {
    return firstTwoOf(email).toUpperCase();
  }

  if (!lastName) {
    return firstTwoOf(firstName).toUpperCase();
  }

  return `${firstOneOf(firstName)}${firstOneOf(lastName)}`.toUpperCase();
};
