const TYPES = {
  // Routes
  BaseRoutes: Symbol.for('BaseRoutes'),
  AuthRoutes: Symbol.for('AuthRoutes'),

  //auth
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),
  AuthMiddleware: Symbol.for('AuthMiddleware'),

  //user
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenRepo: Symbol.for('RefreshTokenRepo'),

  //Utils
  PasswordHasher: Symbol.for('PasswordHasher'),
  AuthToken: Symbol.for('AuthToken'),
}

export default TYPES
