export interface IBlogItem { id: string, cover: string, title: string, summary: string, createdAt: string, updatedAt: string, account: { id: string, name: string } }

export interface ISingleBlogItem { id: string, cover: string, title: string, summary: string, content: string; createdAt: string, updatedAt: string, account: { id: string, name: string } }