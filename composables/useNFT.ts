export function useNFT() {
  const postMintNFT = async (tokenUrl: string) => {
    try {
      const response = await $fetch(`/api/nft/mint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          tokenUrl: tokenUrl,
        },
      });
      return response;
    } catch (error) {
      throw new Error("Error while fetching global data");
    }
  };

  return {
    postMintNFT,
  };
}
