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

export interface Return_FoundUser {
    id: string
    firstName: string
    lastName: string;
    email: string;
    password: string;
    recoverToken: string | null;
    createdAt: string;
    updatedAt: string;
    role: {
        id: number,
        name: string
    },
    profile: {
        id: string
        avatarUrl: string
        bio: string
        phoneNumber: string
        dateOfBirth: Date
    }
    addresses: []
}

interface partialUserData {
    id: string
    email: string
    role: string
}

export interface AxiosCustomResponse {
    data: any,
    status?: number,
}

export interface ErrorLoginResponse {
    message: string
    error: string
    statusCode: number
}

export interface Return_UserLogin {
    token: string,
    statusCode: 200,
    userData: partialUserData
}

interface New_CreatedUser {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    recoverToken: string | null
    createdAt: string
    updatedAt: string
    role: {
        id: number
        name: string
    }
    profile: {
        id: string
        avatarUrl: string
        bio: string
        phoneNumber: string
        dateOfBirth: Date        
    }    
}

export interface Return_CreatedUser {
    message: string
    user: New_CreatedUser
}