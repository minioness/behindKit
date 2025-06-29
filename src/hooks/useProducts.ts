import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  description: string;
  fileUrl: string;
}


export function useProducts() {

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList: Product[] = querySnapshot.docs.map(doc => ({
                    id: Number(doc.id), // Firestore의 문서 ID는 string이니까 number로 변환
                    ...doc.data() as Omit<Product, "id"> // 나머지 데이터는 Product에서 id 빼고 맞춘다
                }));
                setProducts(productList);

                // products 로드된 후 categories 뽑기
                const uniqueCategories = Array.from(new Set(productList.map(p => p.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Firestore fetch error:", error);
            }
        }

        fetchProducts();
    }, [])

    return {products, categories};
}