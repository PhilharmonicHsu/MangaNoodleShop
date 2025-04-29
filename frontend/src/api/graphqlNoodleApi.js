import api from './api'

export const getReceipts = async () => {
    try {  
        const response = await api.post(
            '/graphql', 
            {
                query: `
                    query Receipts {
                        receipts {
                            calories
                            id
                            image
                            ingredients
                            name
                            price
                            rates
                        }
                    }
                `
            },
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            },
        );
        
        return response.data.data.receipts;
    } catch (error) {
        throw error;
    }
}

export const getBanners = async () => {
    try {  
        const response = await api.post(
            '/graphql', 
            {
                query: `
                    query Query {
                        banners {
                            id
                            image
                            name
                        }
                    }
                `
            },
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            },
        );
        
        return response.data.data.banners;
    } catch (error) {
        throw error;
    }
}