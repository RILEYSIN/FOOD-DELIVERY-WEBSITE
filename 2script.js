document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.main-nav');
    const cartSidebar = document.querySelector('.cart-sidebar');

    // --- Unified Sidebar & Overlay Logic ---

    // Function to close all active sidebars and the overlay
    const closeAllSidebars = () => {
        if (navMenu) navMenu.classList.remove('active');
        if (cartSidebar) cartSidebar.classList.remove('active');
    };

    // Function to open the navigation menu
    const openNav = () => {
        if (cartSidebar) cartSidebar.classList.remove('active'); // Close cart if open
        if (navMenu) navMenu.classList.add('active');
    };

    // Function to open the shopping cart
    const openCart = () => {
        if (navMenu) navMenu.classList.remove('active'); // Close nav if open
        if (cartSidebar) cartSidebar.classList.add('active');
    };

    // --- Mobile Navigation Listeners ---
    if (navMenu) {
        const navToggle = document.querySelector('.nav-toggle');
        const navClose = document.querySelector('.nav-close');
        const navLinks = document.querySelectorAll('.main-nav a');

        if (navToggle) navToggle.addEventListener('click', openNav);
        if (navClose) navClose.addEventListener('click', closeAllSidebars);
        navLinks.forEach(link => link.addEventListener('click', closeAllSidebars));
    }

    // --- Shopping Cart Logic & Listeners ---
    // Only run cart logic if cart elements exist on the page
    if (cartSidebar) {
        const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
        const cartClose = document.querySelector('.cart-close');
        const cancelBtn = document.querySelector('.btn-cancel');
        const cartContent = document.querySelector('.cart-content');
        const totalPriceEl = document.querySelector('.total-price');
        const cartItemCountEl = document.querySelector('.cart-item-count');
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        const checkoutBtn = document.querySelector('.btn-checkout');

        // Load cart from localStorage or initialize as empty
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const saveCart = () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        };

        const updateCartCounter = () => {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartItemCountEl.textContent = totalItems;
            if (totalItems > 0) {
                cartItemCountEl.classList.add('visible');
            } else {
                cartItemCountEl.classList.remove('visible');
            }
        };

        const updateTotal = () => {
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalPriceEl.textContent = `$${total.toFixed(2)}`;
            updateCartCounter();
        };

        const renderCartItems = () => {
            cartContent.innerHTML = ''; // Clear current items
            if (cartItems.length === 0) {
                cartContent.innerHTML = '<p style="text-align: center;">Your cart is empty.</p>';
                updateTotal();
                return;
            }

            cartItems.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.classList.add('cart-item');
                // Use a unique ID for each item to handle removal correctly
                cartItemEl.dataset.name = item.name;
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <i class='bx bx-minus quantity-btn decrease-quantity'></i>
                        <span class="quantity-text">${item.quantity}</span>
                        <i class='bx bx-plus quantity-btn increase-quantity'></i>
                    </div>
                    <i class='bx bx-trash cart-item-remove'></i>
                `;
                cartContent.appendChild(cartItemEl);
            });
            updateTotal();
        };

        const handleAddToCart = (e) => {
            const button = e.currentTarget;
            const foodItem = button.closest('.food-item');

            const name = foodItem.querySelector('h3').textContent;
            const price = parseFloat(foodItem.dataset.price);
            const image = foodItem.querySelector('img').src;

            const existingItem = cartItems.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, image, quantity: 1 });
            }

            saveCart();
            renderCartItems();
            openCart();
        };

        const handleCartActions = (e) => {
            const itemEl = e.target.closest('.cart-item');
            if (!itemEl) return;

            const name = itemEl.dataset.name;
            const item = cartItems.find(i => i.name === name);

            if (e.target.classList.contains('increase-quantity')) {
                if (item) item.quantity++;
            } else if (e.target.classList.contains('decrease-quantity')) {
                if (item) {
                    item.quantity--;
                    if (item.quantity === 0) {
                        cartItems = cartItems.filter(i => i.name !== name);
                    }
                }
            } else if (e.target.classList.contains('cart-item-remove')) {
                cartItems = cartItems.filter(i => i.name !== name);
            }

            saveCart();
            renderCartItems();
        };

        // Initial render on page load
        renderCartItems();

        // --- Event Listeners ---
        if (cartIconWrapper) cartIconWrapper.addEventListener('click', openCart);
        if (cartClose) cartClose.addEventListener('click', closeAllSidebars);
        if (cancelBtn) cancelBtn.addEventListener('click', closeAllSidebars);

        addToCartButtons.forEach(button => button.addEventListener('click', handleAddToCart));
        cartContent.addEventListener('click', handleCartActions);

        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length > 0) {
                alert(`Thank you for your order! Your total is ${totalPriceEl.textContent}.`);
                cartItems = []; // Clear the cart
                saveCart();
                renderCartItems();
                closeAllSidebars();
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Add listener to close sidebars when clicking outside of them
    document.addEventListener('click', (e) => {
        const isNavOpen = navMenu && navMenu.classList.contains('active');
        const isCartOpen = cartSidebar && cartSidebar.classList.contains('active');

        // If no sidebar is open, do nothing
        if (!isNavOpen && !isCartOpen) return;

        const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
        const navToggle = document.querySelector('.nav-toggle');

        if (isCartOpen && !cartSidebar.contains(e.target) && !cartIconWrapper.contains(e.target)) closeAllSidebars();
        if (isNavOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) closeAllSidebars();
    });

    // --- Logout Logic ---
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');

    const handleLogout = (e) => {
        e.preventDefault();
        // In a real app, you would also clear session storage or cookies.
        alert('You have been logged out.');
        window.location.href = 'login.html';
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (logoutBtnMobile) {
        logoutBtnMobile.addEventListener('click', handleLogout);
    }
});