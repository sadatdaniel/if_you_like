import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';

process.env.OPENAI_API_KEY;

let apiKey;
if (process.env.NODE_ENV === 'production') {
  apiKey = process.env.OPENAI_API_KEY;
} else {
  apiKey = OPENAI_API_KEY;
}

const configuration = new Configuration({
  apiKey: apiKey
});

const openai = new OpenAIApi(configuration);

export const POST = async ({ request }) => {
  const body = await request.json();
  console.log(body.options);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `The choices are: ${body.options},  
        only return 5 other suggestions in valid JSON object and nothing else, in the following format:
        [
            {
              "id": ID,
              "name": NAME,
              "details": WHO MADE/DEVELOPED IT (only name)
              "url": if a book Goodreads link/ if music Spotify link, if game store link (prefer steam), if person/animal wikipedia link, if movie imdb link, and for everything else wikipedia link
            },
        ]`
      }
    ],
    temperature: 1,
    top_p: 1.0,
    n: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  if (response.data.choices.length > 0 && response.data.choices[0].message !== undefined) {
    console.log('here is my body from openai/response');
    console.log(response.data.choices[0].message.content);

    const data = JSON.parse(response.data.choices[0].message.content);

    return new Response(JSON.stringify(data), {
      status: 201
    });
  }
};
