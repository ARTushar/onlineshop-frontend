export const loadFromLocalStorage = (key) => {
    try{
        const serializedCart = localStorage.getItem(key);
        if(serializedCart === null)
            return undefined;
        return JSON.parse(serializedCart);
    } catch(err) {
        return undefined;
    }
};

export const saveToLocalStorage = (state, key) => {
    try {
        const serializedCart = JSON.stringify(state);
        localStorage.setItem(key, serializedCart);
    } catch {

    }
};