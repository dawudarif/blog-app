export interface JWTPayload {
  userId: string, name: string, email: string, exp: number, iat: number
}


export interface ICreateBlogInput { title: string, summary: string, content: string }