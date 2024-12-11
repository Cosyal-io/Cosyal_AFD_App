import xrpl from "xrpl";
import { sha512 } from "js-sha512";

const SEED = process.env.XRPL_SEED;

export default defineEventHandler(async (event) => {
  if (SEED === undefined) {
    throw Error("seed is missing");
  }
  try {
    const body = await readBody(event);
    //the token url is the hash of the document
    // TODO upload the docs and hash them in the back
    const {
      tokenUrl,
      flags = 8, // Default to allowing third-party transfers
      transferFee = 0,
      network = "testnet", // Default to testnet for safety
    } = body;
    // Validate required fields
    if (!tokenUrl) {
      throw createError({
        statusCode: 400,
        message: "Seed and tokenUrl are required",
      });
    }

    // Get network URL based on environment
    const getNetworkUrl = (network: string) => {
      switch (network) {
        case "testnet":
          return "wss://s.altnet.rippletest.net:51233";
        case "devnet":
          return "wss://s.devnet.rippletest.net:51233";
        case "mainnet":
          return "wss://xrplcluster.com";
        default:
          return "wss://s.altnet.rippletest.net:51233";
      }
    };

    // Connect to the ledger
    const wallet = xrpl.Wallet.fromSeed(SEED);
    const client = new xrpl.Client(getNetworkUrl(network));
    await client.connect();

    // Prepare the transaction
    const transactionJson: any = {
      TransactionType: "NFTokenMint",
      Account: wallet.classicAddress,
      URI: xrpl.convertStringToHex(sha512(tokenUrl)),
      Flags: parseInt(flags.toString()),
      TransferFee: parseInt(transferFee.toString()),
      NFTokenTaxon: 0,
    };

    try {
      const prepared = await client.autofill(transactionJson);
      const sign = wallet.sign(prepared);
      const tx: any = await client.submitAndWait(sign.tx_blob);
      await client.disconnect();
      return {
        success: true,
        transaction: {
          hash: tx.result.hash,
          nftoken_id: tx.result.meta.nftoken_id,
        },
      };
    } catch (error) {
      // Ensure client disconnects even if transaction fails
      await client.disconnect();
      throw error;
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    throw createError({
      statusCode: 500,
      message: "Error minting NFT",
    });
  }
});
