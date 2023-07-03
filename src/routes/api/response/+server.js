import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// export const GET = async ({ request }) => {
//   const authHeader = request.headers.get('Authorization');

//   if (authHeader !== 'Myauthheader') {
//     return new Response(JSON.stringify({ message: 'Invalid Creadentials' }), {
//       status: 401
//     });
//   }

//   //   let data;
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     // prompt: `${options}`,
//     prompt: `these are my favorite books, ${prop}. can you suggest me some more like these?`,
//     temperature: 0,
//     max_tokens: 2000
//   });
//   //   data = response.data;

//   return new Response(JSON.stringify(response.data), { status: 200 });
// };

export const POST = async ({ request }) => {
  const body = await request.json();
  console.log('here is my body from api/response/+server.js');
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

    // Parse the content of the API response into a JSON array
    const data = JSON.parse(response.data.choices[0].message.content);

    // Send the array as a response body
    return new Response(JSON.stringify(data), {
      status: 201
    });
  }
};
