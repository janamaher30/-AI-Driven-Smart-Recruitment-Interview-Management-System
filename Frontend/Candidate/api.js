const API_BASE = "http://127.0.0.1:8000/api";

async function apiRequest(url, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(API_BASE + url, options);
    const payload = await res.json();

    if (!res.ok) {
        throw new Error(payload.message || ("API Error: " + res.status));
    }

    return payload;
}