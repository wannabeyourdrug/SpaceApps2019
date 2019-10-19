export default async function api(query, data) {
    let result = await fetch('/api/' + query.toString(), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        result = await result.json();
        if (!result) return null;
        if (result.success) {
            return result.data;
        } else {
            if (result.error) {
                console.log(`[api] request error:`, result.error, '(', result.statusCode, ')');
            }
            if (result.redirect) {
                // TODO: Олег, сделай редирект
            }
        }
    } catch (error) {
        console.error(`[api] result parse error:`, error);
        return false;
    }
}