import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PassThrough } from 'stream';
import ErrorResponse from './ErrorResponse.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

class StreamMock {
  constructor(words) {
    this.words = words;
    this.iterator = this[Symbol.asyncIterator];
    this.controller = new AbortController();
  }

  async *[Symbol.asyncIterator]() {
    for (let [i, v] of this.words.entries()) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (this.controller.signal.aborted) {
        break;
      }
      if (i === this.words.length - 1) {
        yield {
          id: 'chatcmpl-UNIQUEID',
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'gpt-3.5-mock',
          system_fingerprint: 'fp_c2295e73ad',
          choices: [
            { index: 0, delta: { content: `${v} ` }, logprobs: null, finish_reason: 'stop' }
          ]
        };
      } else {
        yield {
          id: 'chatcmpl-UNIQUEID',
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'gpt-3.5-mock',
          system_fingerprint: 'fp_c2295e73ad',
          choices: [{ index: 0, delta: { content: `${v} ` }, logprobs: null, finish_reason: null }]
        };
      }
    }
  }
}

class ChatMock {
  completions = {
    create({ messages, model, stream }) {
      if (!model) throw new ErrorResponse('400 you must provide a model parameter', 400);
      if (!messages) throw new ErrorResponse("400 Missing required parameter: 'messages'", 400);

      const text = (() => {
        const userMessage = messages[messages.length - 1]?.content.toLowerCase();
        if (userMessage.includes('guests answered')) return 'You can view guest responses in the home page under the "Guest List" section.';
        if (userMessage.includes('how many guests are coming')) return 'Currently, 7 guests have confirmed their attendance.';
        if (userMessage.includes('weather')) return 'The forecast for your wedding day is sunny with a high of 5°C.';
        if (userMessage.includes('can i pay by loan')) return 'Yes, we offer flexible payment options, including loans. Please contact us for more details.';
        if (userMessage.includes('makeup artist')) return 'You can choose your preferred makeup artist from our vendor list in the "Services" section.';
        if (userMessage.includes('venue to city center')) return 'The venue is approximately 20 minutes by car from the city center.';
        if (userMessage.includes('catering options')) return 'We provide a variety of catering options, including vegetarian, vegan, and gluten-free menus.';
        if (userMessage.includes('photography packages')) return 'Our photography packages include pre-wedding shoots, wedding day coverage, and post-event albums.';
        if (userMessage.includes('wedding dress options')) return 'We partner with leading bridal shops to offer you a selection of wedding dresses. Visit the "Dress" section for more.';
        if (userMessage.includes('music band')) return 'Our platform features several music bands. You can listen to samples and book them directly in the "Music" section.';
        if (userMessage.includes('payment conditions')) return 'We require a 50% deposit upfront, with the balance due two weeks before the event.';
        if (userMessage.includes('hello')) return 'Hi there! How can I assist you today?';
        if (userMessage.includes('hi')) return 'Hello there! How can I assist you today?';
        if (userMessage.includes('how are you')) return 'I am good, and you?';
        if (userMessage.includes('hi')) return 'I am good, and you?';
        return 'I am sorry, I may not have a real answer to your question. For better assistance, please call us.';
      })();
      if (stream) {
        return new StreamMock(text.split(' '));
      } else {
        return {
          id: 'chatcmpl-9GkKWpvJxL7CCdq3xulB1WIgH4oLT',
          object: 'chat.completion',
          created: 1713778368,
          model: 'gpt-3.5-turbo-0125',
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: text
              },
              logprobs: null,
              finish_reason: 'stop'
            }
          ],
          usage: { prompt_tokens: 27, completion_tokens: 29, total_tokens: 56 },
          system_fingerprint: 'fp_c2295e73ad'
        };
      }
    }
  };
}

class ImageMock {
  async generate({ ...request }) {
    const { size, response_format, prompt, ...rest } = request;
    let width = 1024;
    let height = 1024;
    if (size) {
      const [w, h] = size.split('x');
      width = parseInt(w);
      height = parseInt(h);
    }
    const data = [
      {
        revised_prompt: prompt
      }
    ];
    const url = `https://placedog.net/${width}/${height}?r`;
    if (response_format === 'b64_json') {
      const res = await fetch(`https://placedog.net/${width}/${height}?r`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      data[0].b64_json = base64;
      return { data };
    }
    data[0].url = url;
    return { data };
  }
}

class AudioMock {
  speech = {
    async create() {
      const filePath = join(__dirname, '../rr.mp3');
      const rr = await readFile(filePath);
      const passThrough = new PassThrough();
      passThrough.write(rr);
      passThrough.end();
      return { body: passThrough };
    }
  };
}

class OpenAIMock {
  constructor() {}

  chat = new ChatMock();
  images = new ImageMock();
  audio = new AudioMock();
}

export default OpenAIMock;
