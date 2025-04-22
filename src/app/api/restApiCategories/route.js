import { api } from "../WooCommerceRestApiConnect";

export async function GET() {
  try {
    // Fetch categories from WooCommerce API
    const response = await api.get("products/categories", {
      per_page: 20,
      status: "publish",         
      _fields: "id,name,image",
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
