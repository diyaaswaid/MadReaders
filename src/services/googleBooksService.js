import { GOOGLE_BOOKS_API_KEY, GOOGLE_BOOKS_API_URL, MAX_RESULTS, DEFAULT_CATEGORY } from '../config';

export const searchBooks = async (query, options = {}) => {
    try {
        const { category, orderBy = 'relevance', startIndex = 0 } = options;
        const categoryFilter = category ? `+subject:${category}` : '';
        const response = await fetch(
            `${GOOGLE_BOOKS_API_URL}/volumes?q=${encodeURIComponent(query)}${categoryFilter}&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=${MAX_RESULTS}&key=${GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        return {
            items: data.items || [],
            totalItems: data.totalItems || 0
        };
    } catch (error) {
        console.error('Error searching books:', error);
        return { items: [], totalItems: 0 };
    }
};

export const getFeaturedBooks = async () => {
    try {
        const response = await fetch(
            `${GOOGLE_BOOKS_API_URL}/volumes?q=subject:${DEFAULT_CATEGORY}&orderBy=newest&maxResults=${MAX_RESULTS}&key=${GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching featured books:', error);
        return [];
    }
};

export const getBestsellers = async () => {
    try {
        const response = await fetch(
            `${GOOGLE_BOOKS_API_URL}/volumes?q=subject:${DEFAULT_CATEGORY}&orderBy=relevance&maxResults=${MAX_RESULTS}&key=${GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching bestsellers:', error);
        return [];
    }
};

export const getBookDetails = async (bookId) => {
    try {
        const response = await fetch(
            `${GOOGLE_BOOKS_API_URL}/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
};

export const getBooksByCategory = async (category) => {
    try {
        const response = await fetch(
            `${GOOGLE_BOOKS_API_URL}/volumes?q=subject:${category}&maxResults=${MAX_RESULTS}&key=${GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching books by category:', error);
        return [];
    }
}; 