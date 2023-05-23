import { Configuration, OpenAIApi } from "openai";
import { createReadStream } from 'fs'

class OpenAI {

  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }
  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async chat(messages) {
    try {
      const res = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      })
      return res.data.choices[0].message;
    } catch (e) {
      console.log('Error while GPT chat', e.message)
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filepath),
        'whisper-1'
      )
      return response.data.text;
    } catch (e) {
      console.log('Error while transcription', e.message)
    }
  }
}
export const openAI = new OpenAI(process.env.OPENAI_API_KEY);
