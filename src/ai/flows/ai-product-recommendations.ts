
'use server';
/**
 * @fileOverview Provides personalized product recommendations based on user browsing history, trending items, and past purchases.
 *
 * - getAIProductRecommendations - A function that handles the AI product recommendation process.
 * - AIProductRecommendationsInput - The input type for the getAIProductRecommendations function.
 * - AIProductRecommendationsOutput - The return type for the getAIProductRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIProductRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting recommendations.'),
  browsingHistory: z
    .array(z.string())
    .describe('A list of product IDs or category names the user has recently viewed.'),
  trendingItems: z.array(z.string()).describe('A list of currently trending product names or IDs.'),
  pastPurchases: z
    .array(z.string())
    .describe('A list of product IDs or names that the user has previously purchased.'),
});
export type AIProductRecommendationsInput = z.infer<typeof AIProductRecommendationsInputSchema>;

const AIProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        productId: z.string().describe('The ID of the recommended product.'),
        productName: z.string().describe('The name of the recommended product.'),
        reason: z.string().describe('A brief explanation of why this product is recommended.'),
      })
    )
    .describe('A list of personalized product recommendations.'),
});
export type AIProductRecommendationsOutput = z.infer<typeof AIProductRecommendationsOutputSchema>;

export async function getAIProductRecommendations(
  input: AIProductRecommendationsInput
): Promise<AIProductRecommendationsOutput> {
  return aiProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductRecommendationsPrompt',
  input: { schema: AIProductRecommendationsInputSchema },
  output: { schema: AIProductRecommendationsOutputSchema },
  prompt: `You are a helpful and enthusiastic personal shopper for 'Klass Kart'. Your goal is to provide personalized product recommendations to users based on their activities and trending items.

Here's the user's information:
User ID: {{{userId}}}
Browsing History: {{{browsingHistory}}}
Trending Items: {{{trendingItems}}}
Past Purchases: {{{pastPurchases}}}

Based on this information, recommend 3-5 products that the user might be interested in. For each recommendation, provide a product ID, product name, and a short, compelling reason why you are recommending it. Ensure the recommendations are distinct and relevant to the user's potential interests, considering both their past behavior and what's popular.`,
});

const aiProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiProductRecommendationsFlow',
    inputSchema: AIProductRecommendationsInputSchema,
    outputSchema: AIProductRecommendationsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) throw new Error("No output generated from AI");
      return output;
    } catch (error: any) {
      console.error("AI Flow execution error:", error);
      // Surface a more descriptive error message
      throw new Error(`AI Recommendation service failed: ${error.message || 'Unknown error'}`);
    }
  }
);
