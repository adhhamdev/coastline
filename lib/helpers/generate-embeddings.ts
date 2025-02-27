import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export default async function generateEmbeddings(input: string) {
      const embeddingData  = await supabase.functions.invoke("generate_embeddings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              (
                await supabase.auth.getSession()
              ).data.session?.access_token
            }`,
          },
          body: JSON.stringify({
            input,
          }),
        });
  
    return embeddingData.data.embedding;
  }