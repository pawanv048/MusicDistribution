export const validateLogin = (userName, password) => {
  const errors = [];

  // Check if email is valid
  if (!userName || !userName.trim()) {
    errors.push('userName is required');
  } else if (!/\S+@\S+\.\S+/.test(userName)) {
    errors.push('userName is invalid');
  }

  // Check if password is valid
  if (!password || !password.trim()) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


const validate = {validateLogin}