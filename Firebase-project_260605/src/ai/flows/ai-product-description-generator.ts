'use server';
/**
 * @fileOverview An AI tool to automatically generate engaging product descriptions.
 *
 * - aiProductDescriptionGenerator - A function that handles the generation of product descriptions.
 * - AiProductDescriptionGeneratorInput - The input type for the aiProductDescriptionGenerator function.
 * - AiProductDescriptionGeneratorOutput - The return type for the aiProductDescriptionGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiProductDescriptionGeneratorInputSchema = z.object({
  name: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product.'),
  features: z.array(z.string()).describe('An array of key features for the product.'),
});
export type AiProductDescriptionGeneratorInput = z.infer<typeof AiProductDescriptionGeneratorInputSchema>;

const AiProductDescriptionGeneratorOutputSchema = z.object({
  description: z.string().describe('The generated engaging product description.'),
});
export type AiProductDescriptionGeneratorOutput = z.infer<typeof AiProductDescriptionGeneratorOutputSchema>;

export async function aiProductDescriptionGenerator(
  input: AiProductDescriptionGeneratorInput
): Promise<AiProductDescriptionGeneratorOutput> {
  return aiProductDescriptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: { schema: AiProductDescriptionGeneratorInputSchema },
  output: { schema: AiProductDescriptionGeneratorOutputSchema },
  prompt: `You are an expert marketing copywriter. Your task is to create a compelling and engaging product description based on the provided product details. The description should be concise, highlight key benefits, and encourage customers to purchase.

Product Name: {{{name}}}
Category: {{{category}}}
Key Features:
{{#each features}}
- {{{this}}}
{{/each}}

Generate an engaging product description:`,
});

const aiProductDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'aiProductDescriptionGeneratorFlow',
    inputSchema: AiProductDescriptionGeneratorInputSchema,
    outputSchema: AiProductDescriptionGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
