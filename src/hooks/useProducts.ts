import products from '../data/data.json';

export function useProducts() {

    const categories = Array.from(new Set(products.map((p) => p.category)));

    return {products, categories};
}