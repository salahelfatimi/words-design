import { api } from "../WooCommerceRestApiConnect";

export async function GET(request) {
  const { searchParams } = await new URL(request.url);
  const category = await searchParams.has("category") ? parseInt(searchParams.get("category"), 10) : null; 

  try {
    const response = await api.get(`products`, {
      category: category ,
      _fields: 'id,name,date_created,status,description,price,categories,tags,images,attributes'
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
