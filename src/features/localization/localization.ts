export const localization = {
  en: {
    app: {
      appName: 'Personal Finance Tracker',
    },
    user: {
      username: 'Username:',
      email: 'Email:',
      password: 'Password:',
    },
    loginForm: {
      login: 'Login',
      logout: 'Logout',
      loginError: 'Username or password is incorrect',
    },
    registerForm: {
      register: 'Register',
      loginLink: 'return to login page',
      accountCreated: 'Account successfully created.',
      request: {
        usernameError: 'Username is already taken.',
        emailError: 'This email is already associated with an account.',
        success: 'Your account was successfully created, you can now login.',
      },
      validation: {
        usernameError: 'Please enter a valid username.',
        emailError: 'Please enter a valid email.',
        passwordError: 'Please enter a valid password.',
      },
      tooltip: {
        username:
          'Username must be 6 to 20 characters long and can only contain letters, numbers, underscores and dots. No dots or underscores at the beginning or end, and no consecutive dots or underscores.',
        email: 'Must be a valid email address.',
        password: 'Password must be at least 8 characters long and contain at least one letter and one number.',
      },
    },
    categories: {
      title: 'Categories',
      categoryExist: 'Category already exists.',
      addCategorySuccess: 'Category successfully added.',
      addCategory: 'Add New category',
    },
    entries: {
      nonexistentCategory: 'Category does not exist.',
      entryAdded: 'Entry successfully added.',
      serverValidationError: 'Server validation error.',
      validation: {
        title: 'Title must be between 3 and 20 characters.',
        category: 'Please select a category.',
        date: "Injecting state, aren't we?",
      },
    },
    errors: {
      networkError: 'Network error, please try again later.',
      unexpectedPrismaError: 'DB error, please contact admin.',
      invalidToken: 'Invalid token, please login again.',
    },
    general: {
      changesSaved: 'Changes successfully saved.',
    },
  },
}
