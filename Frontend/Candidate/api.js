const API_BASE = "../../Backend/routes/api.php";

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

    if (!res.ok) {
        throw new Error("API Error: " + res.status);
    }

    return await res.json();
}