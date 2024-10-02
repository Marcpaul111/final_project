export async function getCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return [];
  }
}

export async function getRelatedProducts(category:string){
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const relatedProduct = await response.json();
    return relatedProduct;
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}


