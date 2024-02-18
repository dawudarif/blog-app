export interface JWTPayload {
  userId: string, name: string, email: string, exp: number, iat: number
}
