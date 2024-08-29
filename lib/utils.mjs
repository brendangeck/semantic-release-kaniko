export function parseArrayOrString(value, envVar) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'string') {
        return [value];
    }
    if (envVar) {
        try {
            return JSON.parse(envVar);
        } catch (error) {
            return [envVar];
        }
    }
    return undefined;
}

export function toBoolean(value) {
    return value === true || value === 'true';
}
