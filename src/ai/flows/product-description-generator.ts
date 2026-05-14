'use server';
/**
 * @fileOverview A Genkit flow to generate compelling and SEO-friendly product descriptions.
 *
 * - generateProductDescription - A function that handles the product description generation process.
 * - ProductDescriptionGeneratorInput - The input type for the generateProductDescription function.
 * - ProductDescriptionGeneratorOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionGeneratorInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  features: z.array(z.string()).describe('A list of key features for the product.'),
});
export type ProductDescriptionGeneratorInput = z.infer<typeof ProductDescriptionGeneratorInputSchema>;

const ProductDescriptionGeneratorOutputSchema = z.object({
  description: z.string().describe('A compelling and SEO-friendly product description.'),
});
export type ProductDescriptionGeneratorOutput = z.infer<typeof ProductDescriptionGeneratorOutputSchema>;

export async function generateProductDescription(input: ProductDescriptionGeneratorInput): Promise<ProductDescriptionGeneratorOutput> {
  return productDescriptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productDescriptionGeneratorPrompt',
  input: {schema: ProductDescriptionGeneratorInputSchema},
  output: {schema: ProductDescriptionGeneratorOutputSchema},
  prompt: `You are an expert e-commerce copywriter specializing in creating compelling and SEO-friendly product descriptions for the "Klass Kart" website.
The descriptions should be engaging, highlight key benefits, and encourage purchases, while also being optimized for search engines.

Generate a product description for the following product:

Product Name: {{{productName}}}

Key Features:
{{#each features}}- {{{this}}}
{{/each}}

Ensure the description is a minimum of 150 words and maximum of 300 words. Focus on benefits and how the features enhance the user experience.`,
});

const productDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'productDescriptionGeneratorFlow',
    inputSchema: ProductDescriptionGeneratorInputSchema,
    outputSchema: ProductDescriptionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
