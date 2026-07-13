// ============================================================================
// 1. SAFE BOOT SCREEN CONTROL OPERATIONS
// ============================================================================
function clearSystemBootScreen() {
    const screen = document.getElementById('bm-boot-screen');
    if (screen) {
        screen.classList.add('bm-hide');
        setTimeout(() => {
            screen.style.display = 'none';
        }, 300);
    }
    document.documentElement.classList.remove('bm-booting');
}

// ============================================================================
// 2. CENTRAL LOCAL STORAGE WORKSPACE REGISTER
// ============================================================================
const DATABASE_KEY = "bizmanage-commerce-os-imported-sales-v1";

function setupWorkspaceDatabase() {
    if (!localStorage.getItem(DATABASE_KEY)) {
        localStorage.setItem(DATABASE_KEY, JSON.stringify({
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

// Execute core sequence
setupWorkspaceDatabase();

// ============================================================================
// 3. APPLICATION INITIALIZATION LIFECYCLE
// ============================================================================
window.addEventListener('load', () => {
    console.log("Core Business Engine compiled successfully. Router Active.");
    
    // Simulate safe mount delay to prevent engine flashes
    setTimeout(() => {
        clearSystemBootScreen();
    }, 400);
});

// Polyfill hook for system data synchronization
window.addEventListener("bizmanage-data-updated", (e) => {
    console.log(`System module dataset changed: ${e.detail.module}`);
});
