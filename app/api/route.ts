let storedNumber: number | null = 1;

export async function POST(request: Request) {
  const { number } = await request.json();

  if (typeof number !== 'number' || number < 1 || number > 5) {
    return new Response(JSON.stringify({ error: 'Number must be between 1 and 5' }), {
      status: 400,
    });
  }

  storedNumber = number;

  return new Response(JSON.stringify({ message: 'Number stored successfully', number }), {
    status: 200,
  });
}

export async function GET() {
  if (storedNumber === null) {
    return new Response(JSON.stringify({ error: 'No number stored yet' }), {
      status: 404,
    });
  }
  console.log(storedNumber);

  return new Response(JSON.stringify({ number: storedNumber }), {
    status: 200,
  });
}