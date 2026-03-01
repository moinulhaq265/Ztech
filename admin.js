document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const adminPassword = document.getElementById('admin-password');
    const tableBody = document.getElementById('applications-table-body');
    const exportBtn = document.getElementById('export-btn');
    const statusFilter = document.getElementById('status-filter');

    const API_URL = '/api';
    let allApplications = [];

    // Check for existing token
    const token = localStorage.getItem('ztech_admin_token');
    if (token) {
        showDashboard();
    }

    async function handleLogin() {
        const password = adminPassword.value;
        const submitBtn = loginBtn;
        submitBtn.innerText = 'AUTHENTICATING...';
        submitBtn.style.opacity = '0.7';

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.status === 401) {
                alert('🔴 Invalid Access Key. Access Denied.');
                submitBtn.innerText = 'AUTHENTICATE';
                submitBtn.style.opacity = '1';
                return;
            }

            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('API Entry Point Not Found (404). Ensure files are inside the "api" folder on GitHub.');
                } else {
                    const errText = await res.text();
                    throw new Error(`Nexus Error (${res.status}): ${errText.substring(0, 50)}...`);
                }
            }

            const data = await res.json();
            if (data.token) {
                localStorage.setItem('ztech_admin_token', data.token);
                showDashboard();
            } else {
                alert('Invalid Response from Nexus.');
            }
        } catch (err) {
            console.error('Nexus Connection Error:', err);
            alert(`🚨 CONNECTION FAILED!\n\nError: ${err.message}\n\nChecklist:\n1. Are files inside "api" folder on GitHub?\n2. Did you set MONGODB_URI in Vercel?\n3. Check Vercel build logs for errors.`);
            submitBtn.innerText = 'AUTHENTICATE';
            submitBtn.style.opacity = '1';
        }
    }

    loginBtn.addEventListener('click', handleLogin);
    adminPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('ztech_admin_token');
        location.reload();
    });

    function showDashboard() {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        logoutBtn.style.display = 'block';
        document.body.style.alignItems = 'flex-start';
        fetchApplications();
    }

    async function fetchApplications() {
        try {
            const res = await fetch(`${API_URL}/admin/applications`, {
                headers: { 'x-auth-token': localStorage.getItem('ztech_admin_token') }
            });
            if (res.status === 401) {
                localStorage.removeItem('ztech_admin_token');
                location.reload();
                return;
            }
            allApplications = await res.json();
            applyFilter();
        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    function applyFilter() {
        const filterValue = statusFilter.value;
        const filtered = filterValue === 'All'
            ? allApplications
            : allApplications.filter(app => app.status === filterValue);
        renderTable(filtered);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilter);
    }

    function renderTable(apps) {
        tableBody.innerHTML = '';
        apps.forEach(app => {
            const row = document.createElement('tr');
            const date = new Date(app.createdAt).toLocaleDateString();
            const statusClass = app.status.toLowerCase().replace(/ /g, '-');

            row.innerHTML = `
                <td>${date}</td>
                <td style="font-weight: 600;">${app.name}</td>
                <td>
                    <div style="font-size: 0.8rem; opacity: 0.7;">${app.email}</div>
                    <div style="color: var(--neon-cyan);">${app.contact}</div>
                </td>
                <td><span class="gradient-text">${app.course.toUpperCase()}</span></td>
                <td style="text-transform: capitalize; font-size: 0.8rem;">${app.type}</td>
                <td><span class="status-badge status-${statusClass}">${app.status}</span></td>
                <td>
                    <select class="status-select" onchange="updateStatus('${app._id}', this.value)">
                        <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                        <option value="Selected" ${app.status === 'Selected' ? 'selected' : ''}>Selected</option>
                        <option value="Not Selected" ${app.status === 'Not Selected' ? 'selected' : ''}>Not Selected</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.updateStatus = async (id, status) => {
        try {
            await fetch(`${API_URL}/applications`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('ztech_admin_token')
                },
                body: JSON.stringify({ id, status })
            });
            fetchApplications();
        } catch (err) {
            console.error('Update Error:', err);
        }
    };

    exportBtn.addEventListener('click', () => {
        const filterValue = statusFilter.value;
        const appsToExport = filterValue === 'All'
            ? allApplications
            : allApplications.filter(app => app.status === filterValue);

        let csvContent = "data:text/csv;charset=utf-8,"
            + "Date,Name,Email,Contact,Course,Type,Status\n"
            + appsToExport.map(app => `${new Date(app.createdAt).toLocaleDateString()},${app.name},${app.email},${app.contact},${app.course},${app.type},${app.status}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ztech_applications_${filterValue}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
