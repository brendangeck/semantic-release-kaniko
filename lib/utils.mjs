export function parseArrayOrString(value, envVar) {
    const parseValue = (val) => {
        // Attempt to parse as JSON
        try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
                return parsed;
            }
            return [parsed];
        } catch (error) {
            // If not JSON, assume it's a comma-separated list
            return val.split(',').map(item => item.trim());
        }
    };

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === 'string') {
        return parseValue(value);
    }

    if (envVar) {
        return parseValue(envVar);
    }

    return undefined;
}

export function toBoolean(value) {
    return value === true || value === 'true';
}
