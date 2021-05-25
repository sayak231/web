export const getErrorMessage = (err) => {
  return err.message.replace("GraphQL error: ", "");
};
