const TYPES = {
  // Routes
  BaseRoutes: Symbol.for('BaseRoutes'),
  AuthRoutes: Symbol.for('AuthRoutes'),

  //auth
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),

  //user
  UserRepository: Symbol.for('UserRepository'),

  //Utils
  PasswordHasher: Symbol.for('PasswordHasher'),
}

export default TYPES
