export = TokenBuilder;

declare class TokenBuilder {

  static init(appId: string, key: string): TokenBuilder;

  expires(exp: number): TokenBuilder;

  user(userId: string): Promise<string>;

  app(): Promise<string>;

  anonymous(): Promise<string>;
}