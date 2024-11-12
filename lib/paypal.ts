export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
export const base = "https://api-m.sandbox.paypal.com";

interface PayPalResponse {
  access_token?: string;
  [key: string]: any;
}

export async function generateAccessToken(): Promise<string> {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }

    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data: PayPalResponse = await response.json();
    return data.access_token || '';
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
  }
}

export async function handleResponse(response: Response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    console.log(err)
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}