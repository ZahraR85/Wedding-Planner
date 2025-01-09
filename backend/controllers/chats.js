




import OpenAI from 'openai';
import OpenAIMock from '../utils/OpenAIMock.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createChat = asyncHandler(async (req, res) => {
  const {
    body: { model, messages },
  } = req;

  console.log("createChat function was triggered in development mode.");

  // Use mock environment for development
  const openai = new OpenAIMock();

  const completion = await openai.chat.completions.create({
    model,
    messages,
  });

  res.json({ choices: [{ message: completion.choices[0].message }] });
});





// import OpenAI from 'openai';
// import OpenAIMock from '../utils/OpenAIMock.js';
// import asyncHandler from '../utils/asyncHandler.js';

// export const createChat = asyncHandler(async (req, res) => {

//   console.log("createChat function was triggered");

//   const {
//     body: { stream, ...request },
//     headers: { mode }
//   } = req;

//   let openai;

//   mode === 'production'
//     ? (openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }))
//     : (openai = new OpenAIMock());

//     console.log("Mode:", mode);


//   const completion = await openai.chat.completions.create({
//     stream,
//     ...request
//   });

//   if (stream) {
//     res.writeHead(200, {
//       Connection: 'keep-alive',
//       'Cache-Control': 'no-cache',
//       'Content-Type': 'text/event-stream'
//     });
//     for await (const chunk of completion) {
//       res.write(`data: ${JSON.stringify(chunk)}\n\n`);
//     }
//     res.end();
//     res.on('close', () => res.end());
//   } else {
//     res.json(completion.choices[0]);
//   }
// });
