/**
 * Check if value is empty or not.
 *
 * @param {Array|Object|null|undefined|String} value
 * @returns {Boolean}
 */
export const isEmpty = (
  value: Array<any> | Object | null | undefined | String
): boolean => {
  return (
    value == null || // value == null will check for null and undefined
    (typeof value === "object" && Object.keys(value).length === 0) || // typeof value === 'object' will check for object and array
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const interpolate = (str: string, params: object = {}): string => {
  if (!params) {
    return str;
  }

  let formattedString = str;

  for (const [key, value] of Object.entries(params)) {
    const val = value || "";

    formattedString = formattedString.replace(
      new RegExp(`:${key}`, "gi"),
      val.toString()
    );
  }

  return formattedString;
};

export const checkIfStringContainsSpaceInStartAndEnd = (
  str: string
): Boolean => {
  return str.startsWith(" ") || str.endsWith(" ");
};
