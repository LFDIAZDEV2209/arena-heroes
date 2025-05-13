const API_URL = import.meta.env.VITE_API_URL;
const myHeader = new Headers({
    'Content-Type': 'application/json',
});

export const getCharacters = async () => {
    try {
        const response = await fetch(`${API_URL}/api/characters`);
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

export const getCharacterById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/characters/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch character by id');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching character by id:', error);
        throw error;
    }
}

export const getCharacterByType = async (type) => {
    try {
        const response = await fetch(`${API_URL}/api/characters?type=${type}`);
        if (!response.ok) {
            throw new Error('Failed to fetch character by type');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching character by type:', error);
        throw error;
    }
}

export const getRandomCharacter = async () => {
    try {
        const characters = await getCharacters();
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    } catch (error) {
        console.error('Error getting random character:', error);
        throw error;
    }
}

export const getRandomCharacters = async (count) => {
    try {
        const characters = await getCharacters();
        const shuffled = characters.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    } catch (error) {
        console.error('Error getting random characters:', error);
        throw error;
    }
}

export const calculateDamage = (attacker, defender) => {
    const baseDamage = attacker.abilities.attack;
    const strengthMultiplier = attacker.abilities.strength / 100;
    const weaknessMultiplier = defender.abilities.weakness === attacker.name ? 1.5 : 1;
    
    return Math.floor(baseDamage * strengthMultiplier * weaknessMultiplier);
}

export const updateCharacterHealth = (character, damage) => {
    const currentHealth = character.abilities.strength;
    const newHealth = Math.max(0, currentHealth - damage);
    return {
        ...character,
        abilities: {
            ...character.abilities,
            strength: newHealth
        }
    };
}



