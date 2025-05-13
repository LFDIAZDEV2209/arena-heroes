const API_URL = import.meta.env.VITE_API_URL;
const myHeader = new Headers({
    'Content-Type': 'application/json',
});

export const createBattle = async (battleData) => {
    try {
        const response = await fetch(`${API_URL}/api/battles`, {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify({
                mode: battleData.mode,
                character1: battleData.character1,
                character2: battleData.character2,
                winner: battleData.winner,
                date: new Date().toISOString()
            })
        });
        if (!response.ok) {
            throw new Error('Failed to create battle');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating battle:', error);
        throw error;
    }
}

export const updateBattle = async (battleId, battleData) => {
    try {
        const response = await fetch(`${API_URL}/api/battles/${battleId}`, {
            method: 'PUT',
            headers: myHeader,
            body: JSON.stringify(battleData)
        });
        if (!response.ok) {
            throw new Error('Failed to update battle');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating battle:', error);
        throw error;
    }
}

export const getBattleById = async (battleId) => {
    try {
        const response = await fetch(`${API_URL}/api/battles/${battleId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch battle');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching battle:', error);
        throw error;
    }
}

export const getAllBattles = async () => {
    try {
        const response = await fetch(`${API_URL}/api/battles`);
        if (!response.ok) {
            throw new Error('Failed to fetch battles');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching battles:', error);
        throw error;
    }
}

export const getBattlesByMode = async (mode) => {
    try {
        const response = await fetch(`${API_URL}/api/battles?mode=${mode}`);
        if (!response.ok) {
            throw new Error('Failed to fetch battles by mode');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching battles by mode:', error);
        throw error;
    }
}
