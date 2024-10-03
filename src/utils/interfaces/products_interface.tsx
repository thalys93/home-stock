import { Api_Paginate_response } from "./api_response_interface";

export interface API_Product_Response extends Api_Paginate_response {
    items: API_Product[],
}

export interface API_Found_Product {
    found: API_Product
}

export interface API_Product {
    id?: string;
    name: string;
    quantity: number;
    image: string;
    categoryID?: number; // é apenas usada para ser selecionada na hora da criação
    category?: API_Category; // é retornada no found
}

export interface API_Category_Response extends Api_Paginate_response {
    items: API_Category[]
}

export interface API_Found_Category {
    found: API_Category
}

export interface API_Category {
    id?: number;
    category_name: string;
    products?: API_Product[]
}