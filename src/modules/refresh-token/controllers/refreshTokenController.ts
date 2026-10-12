import type { Request, Response } from 'express';
import type { RefreshTokenUseCase } from "../useCases/refreshTokenUseCase";

export class RefreshTokenController {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) { }

  async handle(request: Request, response: Response) {
    const refreshTokenId = request.cookies.refreshToken;

    if (!refreshTokenId) {
      return response.status(401).json({ message: 'Refresh token not provided' });
    }

    try {
      const { accessToken, refreshTokenId: newRefreshTokenId } = await this.refreshTokenUseCase.execute(refreshTokenId);

      return response.status(200)
        .cookie('token', accessToken, { httpOnly: true })
        .cookie('refreshToken', newRefreshTokenId, { httpOnly: true })
        .json({ message: 'access token refreshed' });
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }
  }
}
