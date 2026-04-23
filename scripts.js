/**
 * Logica de interacțiune pentru Grădina de Vis
 */

document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;
    const cartCountEl = document.getElementById('cart-count');
    const toast = document.getElementById('toast-notification');
    let toastTimer;

    // --- 1. Feedback Vizual Bogat (RVMF) ---
    function showNotification(productName) {
        toast.querySelector('p').textContent = `„${productName}” a fost adăugat în coș!`;
        toast.hidden = false;
        
        // Efect vizual pe coș
        const cartIcon = document.querySelector('.cart-status');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.hidden = true;
        }, 3000);
    }

    // --- 2. Bounded Inputs (Controale Limitate) ---
    document.querySelectorAll('.qty-selector').forEach(selector => {
        const input = selector.querySelector('input');
        const btnMinus = selector.querySelector('.qty-minus');
        const btnPlus = selector.querySelector('.qty-plus');

        btnPlus.addEventListener('click', () => {
            let val = parseInt(input.value);
            if (val < 99) input.value = val + 1;
        });

        btnMinus.addEventListener('click', () => {
            let val = parseInt(input.value);
            if (val > 1) input.value = val - 1;
        });
    });

    // --- 3. Filtrare prin Obiective (Model Mental) ---
    const goalMap = {
        'rasaduri': 'amelioratori',
        'flori': 'universal',
        'sustenabilitate': 'amelioratori'
    };

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const goal = e.target.closest('.goal-card').dataset.goal;
            const targetCategory = goalMap[goal];
            
            document.getElementById('category-select').value = targetCategory;
            filterProducts(targetCategory);
            
            document.getElementById('produse').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const categorySelect = document.getElementById('category-select');
    categorySelect.addEventListener('change', (e) => filterProducts(e.target.value));

    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const matches = category === 'all' || product.dataset.category === category;
            product.style.display = matches ? 'flex' : 'none';
        });
    }

    // --- 4. Adăugare în Coș ---
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const qty = parseInt(card.querySelector('input').value);

            cartCount += qty;
            cartCountEl.textContent = cartCount;
            showNotification(name);
        });
    });
});