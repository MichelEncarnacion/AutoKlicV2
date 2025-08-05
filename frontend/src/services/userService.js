// src/services/userService.js
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
});

export async function getUsers() {
    const res = await fetch(`${API_URL}/users`, { headers: headers() });
    if (!res.ok) throw new Error('Error fetching users');
    return res.json();
}

export async function changeUserRole(id, role) {
    const res = await fetch(`${API_URL}/users/${id}/role`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ rol: role })
    });
    if (!res.ok) throw new Error('Error changing role');
    return res;
}

export async function resetPassword(id, password) {
    const res = await fetch(`${API_URL}/users/${id}/password`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ password })
    });
    if (!res.ok) throw new Error('Error resetting password');
    return res;
}

export async function deactivateUser(id) {
    const res = await fetch(`${API_URL}/users/${id}/deactivate`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Error deactivating user');
    return res;
}

export async function activateUser(id) {
    const res = await fetch(`${API_URL}/users/${id}/activate`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Error activating user');
    return res;
}


export async function registerEmployeeUser(data) {
    const res = await fetch(`${API_URL}/users`, {      // <- Asegúrate de que aquí sea exactamente /users
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        let errMsg = 'Error registering';
        try {
            const err = await res.json();
            errMsg = err.error || errMsg;
        } catch {
        }
        throw new Error(errMsg);
    }
    return res.json();
}
