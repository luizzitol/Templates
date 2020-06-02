const validation = (username, name, password, password2) => {
  let errors = [];
  if (!username || !name || !password || !password2) {
    errors.push("Please fill in all fields");
    return errors;
  }
  if (password !== password2) {
    errors.push("Passwords do not match");
  }
  if (password.length < 6) {
    errors.push("Password should be at least 6 characters");
  }

  return errors;
};

module.exports = validation;
