import { api } from "../WooCommerceRestApiConnect";

export async function GET(request) {
  const { searchParams } = await new URL(request.url);
  const page = await searchParams.get("page") || 1; 
  const perPage = await searchParams.get("perPage") || 10;
  const type = await parseInt(searchParams.get("type"), 10) || null; 

  try {
    const response = await api.get('products', {
      per_page: perPage,
      status: 'publish',
      category: type, 
      page: page,
      _fields: 'id,name,date_created,status,description,price,categories,tags,images,attributes'
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
