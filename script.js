// ============================================================================
// 1. STABLE DESKTOP ROUTING AND INTERFACE CONTROL HOOKS
// ============================================================================
function releaseApplicationBootScreen() {
    const bootScreen = document.getElementById('bm-boot-screen');
    if (bootScreen) {
        bootScreen.classList.add('bm-hide');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 250);
    }
    document.documentElement.classList.remove('bm-booting');
}

// ============================================================================
// 2. CENTRAL LOCAL STORAGE DATA INITIALIZER
// ============================================================================
const DATA_STORE_KEY = "bizmanage-commerce-os-imported-sales-v1";

function verifyLocalDatabaseStructure() {
    if (!localStorage.getItem(DATA_STORE_KEY)) {
        localStorage.setItem(DATA_STORE_KEY, JSON.stringify({
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

// Initialize database mapping before runtime mounts
verifyLocalDatabaseStructure();

// ============================================================================
// 3. RUNTIME SYSTEM EXECUTION LIFECYCLE
// ============================================================================
window.addEventListener('load', () => {
    console.log("React Ecosystem initialized successfully inside the workspace context.");
    
    // Smooth transition from boot loader screen to application dashboard
    setTimeout(() => {
        releaseApplicationBootScreen();
    }, 300);
});

// Polyfill hook for workspace modifications tracking
window.addEventListener("bizmanage-data-updated", (event) => {
    console.log(`E-commerce master records updated for module: ${event.detail.module}`);
});
