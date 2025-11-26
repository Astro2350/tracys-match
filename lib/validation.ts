const emailRegex =
  /^(?:[a-zA-Z0-9_'^&+%*-]+(?:\.[a-zA-Z0-9_'^&+%*-]+)*|"(?:["]|\\")+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export function isValidEmail(email: string) {
  return emailRegex.test(email.trim());
}

export function passwordIssues(password: string) {
  const issues: string[] = [];

  if (password.length < 10) issues.push("At least 10 characters");
  if (!/[A-Z]/.test(password)) issues.push("One uppercase letter");
  if (!/[a-z]/.test(password)) issues.push("One lowercase letter");
  if (!/[0-9]/.test(password)) issues.push("One number");
  if (!/[\W_]/.test(password)) issues.push("One symbol");

  return issues;
}
