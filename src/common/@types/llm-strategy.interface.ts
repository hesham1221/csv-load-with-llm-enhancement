export interface LLMStrategy {
  /**
 * Executes the given prompt using the LLM strategy and returns the response.
 *
 * @param {string} prompt - The prompt to be executed.
 * @return {Promise<string>} A promise that resolves to the response.
 */
  executePrompt(prompt: string): Promise<string>;
}
