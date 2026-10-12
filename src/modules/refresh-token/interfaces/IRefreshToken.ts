export interface IRefreshToken {
  id: string;
  userId: string;
  issuedAt: Date;
  expiresAt: Date;
}
