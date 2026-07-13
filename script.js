// Hide boot screen safely once the layout script initializes
window.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bm-boot-screen');
    if (bootScreen) {
        bootScreen.classList.add('bm-hide');
    }
    document.documentElement.classList.remove('bm-booting');
});

// ============================================================================
// LOCAL STORAGE DATABASES MANAGEMENT
// ============================================================================
const STORAGE_KEY = "bizmanage-commerce-os-imported-sales-v1";

function initializeDatabase() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
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
                { id: "p1", businessId: "b1", name: "Pearl Bow Earrings", sku: "SIA-ER-001", categoryId: "c1", stock: 42, reserved: 2, reorder: 12, price: 699, cost: 260, image: "" }
            ],
            orders: [],
            sales: [],
            expenses: [],
            marketing: [],
            purchases: [],
            suppliers: [],
            customers: [],
            returns: [],
            locations: [],
            packaging: [],
            packagingRules: []
        }));
    }
}

initializeDatabase();

// ============================================================================
// EXPERT INTEGRATION ROUTERS & WORKSPACE LIFECYCLE
// ============================================================================
console.log("BizManage Modular System Loaded. Workspace active.");
