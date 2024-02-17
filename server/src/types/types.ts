export interface JWTPayload {
  userId: String, name: String, email: String, exp: number, iat: number
}