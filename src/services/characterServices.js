// Configuración de la API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Headers para las peticiones
const myHeader = new Headers({
    'Content-Type': 'application/json',
});

// Verificar la configuración al inicio
console.log('API URL configurada:', API_URL);
console.log('Variable de entorno VITE_API_URL:', import.meta.env.VITE_API_URL);

export const getCharacters = async () => {
    try {
        const response = await fetch(`${API_URL}/api`);
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        console.log('Total characters fetched:', data.characters.length);
        return data.characters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

export const getCharacterById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api`);
        if (!response.ok) {
            throw new Error('Failed to fetch character by id');
        }
        const data = await response.json();
        const character = data.characters.find(char => char.id === id);
        if (!character) {
            throw new Error(`Character with id ${id} not found`);
        }
        return character;
    } catch (error) {
        console.error('Error fetching character by id:', error);
        throw error;
    }
}

export const getCharactersByType = async (type) => {
    try {
        const response = await fetch(`${API_URL}/api`);
        if (!response.ok) {
            throw new Error('Failed to fetch characters by type');
        }
        const data = await response.json();
        const filteredCharacters = data.characters.filter(char => char.type === type);
        console.log(`Found ${filteredCharacters.length} characters of type ${type}`);
        return filteredCharacters;
    } catch (error) {
        console.error('Error fetching characters by type:', error);
        throw error;
    }
}

export const getRandomCharacter = async () => {
    try {
        const characters = await getCharacters();
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters[randomIndex];
        console.log('Selected random character:', randomCharacter.name);
        return randomCharacter;
    } catch (error) {
        console.error('Error getting random character:', error);
        throw error;
    }
}

export const getRandomCharacters = async (count) => {
    try {
        const characters = await getCharacters();
        const shuffled = characters.sort(() => 0.5 - Math.random());
        const selectedCharacters = shuffled.slice(0, count);
        console.log(`Selected ${selectedCharacters.length} random characters:`, 
            selectedCharacters.map(char => char.name).join(', '));
        return selectedCharacters;
    } catch (error) {
        console.error('Error getting random characters:', error);
        throw error;
    }
}

export const calculateDamage = (attacker, defender) => {
    const baseDamage = attacker.abilities.attack;
    const strengthMultiplier = attacker.abilities.damage / 100;
    const weaknessMultiplier = defender.abilities.weakness === attacker.abilities.strength ? 1.5 : 1;
    
    const damage = Math.floor(baseDamage * strengthMultiplier * weaknessMultiplier);
    console.log(`Damage calculation for ${attacker.name} vs ${defender.name}:`, {
        baseDamage,
        strengthMultiplier,
        weaknessMultiplier,
        finalDamage: damage
    });
    return damage;
}

export const updateCharacterHealth = (character, damage) => {
    const currentHealth = character.hp;
    const newHealth = Math.max(0, currentHealth - damage);
    console.log(`${character.name}'s health: ${currentHealth} -> ${newHealth} (-${damage})`);
    return {
        ...character,
        hp: newHealth
    };
}



