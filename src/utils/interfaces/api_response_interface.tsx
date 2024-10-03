export interface Api_Paginate_response {
    meta: {
        totalItems: number,
        itemCount: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number,
    },
    links: {
        first: string,
        previous: string,
        next: string,
        last: string;
    }
}

export interface FoundUser {
    id: string
    name: string
    lastname: string;
    email: string;
    avatar: string;
    password: string;
    recoverToken: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface UserDataLogin {
    email: string;
    id: string;
    role: string
}