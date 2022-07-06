import axios, { AxiosInstance } from "axios";
import addOAuthInterceptor from "axios-oauth-1.0a";
import Twit from "twit";

// Use API v1.1
export class Twitter{
  // Get Access Token API v1.1
  static getOauth1Token():AxiosInstance {
    const instance = axios.create({
      baseURL: 'https://api.twitter.com/'
    });

    // Oauth 1.0a Authentication
    addOAuthInterceptor(instance, {
      algorithm: 'HMAC-SHA1',
      key: process.env.TWITTER_API_KEY,
      secret: process.env.TWITTER_API_SECRET_KEY
    });

    return instance;
  };

  // Use Oauth1.0a API v1.1
  static instanceOauth1(accessToken: string, accessTokenSecret: string): Twit{
    const twit = new Twit({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET_KEY,
      access_token: accessToken,
      access_token_secret: accessTokenSecret
    });

    return twit;
  };

  // Get Bearer Token API v2.0
  static async getOauth2Token(): Promise<string> {
    // Basic Authentication
    const auth = {
      username: process.env.TWITTER_API_KEY,
      password: process.env.TWITTER_API_SECRET_KEY
    }
    const result = await axios.post(`https://api.twitter.com/oauth2/token?grant_type=client_credentials`, {}, {auth});
    const accessToken = result.data.access_token;

    return accessToken;
  };

  // Use Oauth2.0 API v2.0
  static instanceOauth2(bearerToken: string): AxiosInstance {
    const instance = axios.create({
      baseURL: 'https://api.twitter.com/2/',
      headers: {
        "Authorization": `Bearer ${bearerToken}`
      },
    });

    return instance;
  };
};
