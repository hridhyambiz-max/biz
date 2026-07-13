// ============================================================================
// 1. BUSINESS MASTER DATABASE CONFIGURATION (RESTORED HISTORICAL RECORDS)
// ============================================================================
const CORE_DB_KEY = "bizmanage-commerce-os-imported-sales-v1";

const INITIAL_WORKSPACE_DATA = {
    profile: { name: "Sandhya Owner", email: "owner@bizmanage.demo" },
    activeBusinessId: "b1",
    businesses: [
        { id: "b1", name: "SIA Jewels", industry: "Jewellery", color: "#6d5dfc" },
        { id: "b2", name: "Westory Fashion", industry: "Fashion", color: "#111827" },
        { id: "b3", name: "SBX Media", industry: "Services", color: "#0ea5e9" }
    ],
    categories: [
        { id: "c1", businessId: "b1", name: "Earrings", parent: "Jewellery" },
        { id: "c2", businessId: "b1", name: "Necklaces", parent: "Jewellery" }
    ],
    products: [
        { id: "p1", businessId: "b1", name: "Pearl Bow Earrings", sku: "SIA-ER-001", categoryId: "c1", stock: 42, reserved: 2, reorder: 12, price: 699, cost: 260, image: "" },
        { id: "p2", businessId: "b1", name: "Victoria Charm Necklace", sku: "SIA-NK-004", categoryId: "c2", stock: 9, reserved: 1, reorder: 10, price: 1299, cost: 510, image: "" }
    ],
    orders: [
        { id: "o1", businessId: "b1", number: "ORD-1001", customerName: "Riya Sharma", status: "Processing", amount: 1398, items: 2 },
        { id: "o2", businessId: "b1", number: "ORD-1002", customerName: "Aditi Roy", status: "Packed", amount: 1299, items: 1 }
    ],
    sales: [], expenses: [], marketing: [], purchases: [], suppliers: [], customers: [], returns: [], locations: [], packaging: [], packagingRules: []
};

function verifyAndMountDatabase() {
    if (!localStorage.getItem(CORE_DB_KEY)) {
        localStorage.setItem(CORE_DB_KEY, JSON.stringify(INITIAL_WORKSPACE_DATA));
    }
}
verifyAndMountDatabase();

// ============================================================================
// 2. STABLE VANILLA ROUTING & ENGINE MOUNT
// ============================================================================
let currentRoute = window.location.hash || '#/';

function renderActiveView() {
    const rootNode = document.getElementById('root');
    if (!rootNode) return;

    const localData = JSON.parse(localStorage.getItem(CORE_DB_KEY));
    const activeBiz = localData.businesses.find(b => b.id === localData.activeBusinessId) || localData.businesses[0];
    const productsCount = localData.products.filter(p => p.businessId === activeBiz.id).length;
    const ordersCount = localData.orders.filter(o => o.businessId === activeBiz.id).length;

    rootNode.innerHTML = `
        <div class="app-shell">
            <aside class="sidebar">
                <div class="brand">
                    <span class="brand-mark">B</span>
                    <div><b>BizManage</b><small>Commerce OS</small></div>
                </div>
                <nav>
                    <div class="nav-section">
                        <span class="nav-label">Overview</span>
                        <a class="${currentRoute === '#/' ? 'active' : ''}" href="#/"><span>Dashboard</span></a>
                        <a class="${currentRoute === '#/products' ? 'active' : ''}" href="#/products"><span>Products</span></a>
                        <a class="${currentRoute === '#/orders' ? 'active' : ''}" href="#/orders"><span>Orders</span></a>
                    </div>
                </nav>
            </aside>
            <main class="main-area">
                <header class="topbar">
                    <div class="business-switch">
                        <select id="biz-selector">
                            ${localData.businesses.map(b => `<option value="${b.id}" ${b.id === activeBiz.id ? 'selected' : ''}>${b.name}</option>`).join('')}
                        </select>
                    </div>
                </header>
                <div class="content">
                    ${renderRouteContent(currentRoute, activeBiz, productsCount, ordersCount, localData)}
                </div>
            </main>
        </div>`;

    document.getElementById('biz-selector').onchange = (e) => {
        localData.activeBusinessId = e.target.value;
        localStorage.setItem(CORE_DB_KEY, JSON.stringify(localData));
        renderActiveView();
    };
}

function renderRouteContent(route, activeBiz, prodCount, ordCount, localData) {
    if (route === '#/products') {
        const filteredProducts = localData.products.filter(p => p.businessId === activeBiz.id);
        return `
            <div class="page-head">
                <div><h1>Products Catalog</h1><p>Master products management for ${activeBiz.name}.</p></div>
            </div>
            <div class="card">
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr><th>Name</th><th>SKU</th><th>Price</th><th>Stock</th></tr>
                        </thead>
                        <tbody>
                            ${filteredProducts.map(p => `<tr><td><b>${p.name}</b></td><td>${p.sku}</td><td>₹${p.price}</td><td>${p.stock} units</td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    if (route === '#/orders') {
        const filteredOrders = localData.orders.filter(o => o.businessId === activeBiz.id);
        return `
            <div class="page-head">
                <div><h1>Orders Registry</h1><p>Track fulfillment pipelines.</p></div>
            </div>
            <div class="card">
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr><th>Order Number</th><th>Customer</th><th>Amount</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            ${filteredOrders.map(o => `<tr><td><b>${o.number}</b></td><td>${o.customerName}</td><td>₹${o.amount}</td><td><span class="pill ok">${o.status}</span></td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    // Default Dashboard Route
    return `
        <div class="page-head">
            <div><h1>${activeBiz.name} Dashboard</h1><p>Live revenue and operations workflow tracking.</p></div>
        </div>
        <div class="stats-grid">
            <div class="card stat-card"><div class="stat-icon">₹</div><div><span>Active Catalog</span><strong>${prodCount} Items</strong></div></div>
            <div class="card stat-card"><div class="stat-icon">▣</div><div><span>Total Orders</span><strong>${ordCount} Orders</strong></div></div>
        </div>`;
}

window.addEventListener('hashchange', () => {
    currentRoute = window.location.hash || '#/';
    renderActiveView();
});

window.addEventListener('load', renderActiveView);
