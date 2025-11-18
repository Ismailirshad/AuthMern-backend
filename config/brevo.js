import SibApiV3Sdk from "@getbrevo/brevo";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();

export default brevo;

console.log("BREVO_KEY_LOADED:", !!process.env.BREVO_API_KEY);


