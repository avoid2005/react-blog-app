export function userSignUpFormat({ signUpTime, id, username, email }) {
  return `  
================================================================
  signup   = ${signUpTime}
  type     = User SignUp To Our Website
  id       = ${id} 
  username = ${username} 
  email    = ${email}
================================================================
`;
}

export function userSignInFormat({ signInTime, id, username, email }) {
  return `  
================================================================
  signin   = ${signInTime}
  type     = User SignIn To Our Website
  id       = ${id} 
  username = ${username} 
  email    = ${email}
================================================================
`;
}
