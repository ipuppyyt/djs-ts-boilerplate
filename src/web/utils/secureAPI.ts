import axios, { AxiosResponse } from "axios";

interface SecurePostResponse<T> {
    data: T | null;
    error: string | null;
    status: number | null;
    isComplete: boolean;
}

export const securePost = async <T>(url: string, data?: any): Promise<SecurePostResponse<T>> => {
    try {
        const tokenResponse: AxiosResponse<{ token: string }> = await axios.post('/auth/token/generate');

        const response: AxiosResponse<T> = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.token}`,
            },
        });

        return { data: response.data, status: response.status, error: null, isComplete: true };
    } catch (error) {
        if (error instanceof Error) {
            return { data: null, status: (error as any).status || 500, error: error.message, isComplete: true };
        } else {
            return { data: null, status: (error as any).status || 500, error: 'An error occurred', isComplete: true };
        }
    }
};
