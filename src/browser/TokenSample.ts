import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/identity";

export class Sample implements TokenCredential {
	public async getToken(scopes: string | string[], option?: GetTokenOptions): Promise<AccessToken> {
		const token: AccessToken = { token: "test_Sample", expiresOnTimestamp: 3 };
		return token;
	}
}
