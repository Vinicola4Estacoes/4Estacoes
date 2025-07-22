// Dados dos produtos (simulando um banco de dados)
let produtos = {
    vinhos: [
        { id: 'vinho-1', nome: 'Vinho Tinto Premium', preco: 89.90, estoque: 25, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho tinto encorpado com notas de frutas vermelhas.' },
        { id: 'vinho-2', nome: 'Vinho Branco Seco', preco: 75.90, estoque: 18, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho branco seco e refrescante, ideal para peixes.' },
        { id: 'vinho-3', nome: 'Vinho Rosé Elegante', preco: 65.90, estoque: 32, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho rosé delicado com aroma floral.' },
        { id: 'vinho-4', nome: 'Espumante Premium', preco: 120.90, estoque: 12, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Espumante fino para ocasiões especiais.' },
        { id: 'vinho-5', nome: 'Vinho Tinto Arte', preco: 95.90, estoque: 15, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho tinto artesanal com personalidade única.' },
        { id: 'vinho-6', nome: 'Vinho Branco Colonial', preco: 68.90, estoque: 28, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho branco tradicional com sabor marcante.' },
        { id: 'vinho-7', nome: 'Vinho Rosé Garcia', preco: 72.90, estoque: 22, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho rosé premium da família Garcia.' },
        { id: 'vinho-8', nome: 'Espumante Moscatel', preco: 98.90, estoque: 20, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Espumante moscatel doce e aromático.' },
        { id: 'vinho-9', nome: 'Vinho Tinto Portuga', preco: 82.90, estoque: 35, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho tinto português de excelente qualidade.' },
        { id: 'vinho-10', nome: 'Vinho Branco Praia', preco: 78.90, estoque: 24, imagem: 'images/vinhos/vinho_teste.jpg', descricao: 'Vinho branco leve e refrescante.' }
    ],
    cervejas: [
        { id: 'cerveja-1', nome: 'Cerveja IPA Schornstein', preco: 12.90, estoque: 48, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'IPA artesanal com lúpulo americano.' },
        { id: 'cerveja-2', nome: 'Cerveja Lager Corujinha', preco: 9.90, estoque: 62, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Lager suave e refrescante.' },
        { id: 'cerveja-3', nome: 'Cerveja Stout Ekäut', preco: 14.90, estoque: 36, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Stout escura com notas de café e chocolate.' },
        { id: 'cerveja-4', nome: 'Cerveja Weiss Füder', preco: 11.90, estoque: 54, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Cerveja de trigo alemã tradicional.' },
        { id: 'cerveja-5', nome: 'IPA Premium Info', preco: 16.90, estoque: 28, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'IPA premium com amargor equilibrado.' },
        { id: 'cerveja-6', nome: 'Lager Hop Campinas', preco: 13.90, estoque: 42, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Lager com toque de lúpulo.' },
        { id: 'cerveja-7', nome: 'Stout Mel Engenho', preco: 15.90, estoque: 31, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Stout adocicada com mel de engenho.' },
        { id: 'cerveja-8', nome: 'Weiss Schornstein', preco: 12.90, estoque: 39, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Weiss artesanal com fermento alemão.' },
        { id: 'cerveja-9', nome: 'IPA Baden Baden', preco: 18.90, estoque: 26, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'IPA premium da Baden Baden.' },
        { id: 'cerveja-10', nome: 'Lager Artesanal Premium', preco: 14.90, estoque: 33, imagem: 'images/cervejas/cerveja_teste.jpg', descricao: 'Lager artesanal de alta qualidade.' }
    ]
};

// Estado da aplicação
let currentPage = 'home';
let isLoggedIn = false;
let currentEditingProduct = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupCarousels();
    showPage('home');
    updateProductDisplays();
}

// Event Listeners
function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.getElementById('closeSidebar');

    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    overlay.addEventListener('click', closeSidebarMenu);

    // Navigation
    const navLinks = document.querySelectorAll('.sidebar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            closeSidebarMenu();
        });
    });

    // Admin button
    const adminBtn = document.getElementById('adminBtn');
    adminBtn.addEventListener('click', function() {
        if (isLoggedIn) {
            showPage('admin');
        } else {
            showLoginModal();
        }
    });

    // Login modal
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const loginClose = loginModal.querySelector('.close');

    loginClose.addEventListener('click', () => loginModal.style.display = 'none');
    loginForm.addEventListener('submit', handleLogin);

    // Edit modal
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const editClose = editModal.querySelector('.close');

    editClose.addEventListener('click', () => editModal.style.display = 'none');
    editForm.addEventListener('submit', handleEditProduct);

    // Admin tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            showAdminTab(tab);
        });
    });

    // Carousel buttons
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const carousel = this.getAttribute('data-carousel');
            const direction = this.classList.contains('next') ? 1 : -1;
            moveCarousel(carousel, direction);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.getElementById('menuToggle');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeSidebarMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.getElementById('menuToggle');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update admin content if showing admin page
        if (pageId === 'admin' && isLoggedIn) {
            updateAdminContent();
        }
    }
}

// Carousel functionality
function setupCarousels() {
    const carousels = ['destaques', 'promocoes', 'vinhos', 'cervejas'];
    
    
}

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(`carousel-${carouselId}`);
    const track = carousel.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    
    if (slides.length === 0) return;
    
    const slideWidth = slides[0].offsetWidth + 20; // 20px margin
    const currentTransform = track.style.transform || 'translateX(0px)';
    const currentX = parseInt(currentTransform.match(/-?\d+/) || [0]);
    
    let newX = currentX - (direction * slideWidth);
    
    // Loop carousel
    const maxX = -(slideWidth * (slides.length - 1));
    if (newX < maxX) {
        newX = 0;
    } else if (newX > 0) {
        newX = maxX;
    }
    
    track.style.transform = `translateX(${newX}px)`;
}

// Login functionality
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin') {
        isLoggedIn = true;
        document.getElementById('loginModal').style.display = 'none';
        showPage('admin');
        
        // Clear form
        document.getElementById('loginForm').reset();
        
        alert('Login realizado com sucesso!');
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

// Admin functionality
function showAdminTab(tabId) {
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    if (tabId === 'produtos') {
        updateAdminProductsGrid();
    } else if (tabId === 'estoque') {
        updateStockControls();
    }
}

function updateAdminContent() {
    updateAdminProductsGrid();
    updateStockControls();
}

function updateAdminProductsGrid() {
    const grid = document.getElementById('admin-products-grid');
    grid.innerHTML = '';
    
    // Combine all products
    const allProducts = [...produtos.vinhos, ...produtos.cervejas];
    
    allProducts.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'admin-product-card';
        card.innerHTML = `
            <h4>${produto.nome}</h4>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
            <p><strong>Estoque:</strong> ${produto.estoque} unidades</p>
            <p><strong>ID:</strong> ${produto.id}</p>
            <button class="edit-btn" onclick="editProduct('${produto.id}')">Editar</button>
        `;
        grid.appendChild(card);
    });
}

function updateStockControls() {
    const controls = document.getElementById('stock-controls');
    controls.innerHTML = '';
    
    // Combine all products
    const allProducts = [...produtos.vinhos, ...produtos.cervejas];
    
    allProducts.forEach(produto => {
        const item = document.createElement('div');
        item.className = 'stock-item';
        item.innerHTML = `
            <div class="stock-info">
                <h4>${produto.nome}</h4>
                <p>Estoque atual: ${produto.estoque} unidades</p>
            </div>
            <div class="stock-controls-buttons">
                <button class="stock-btn" onclick="adjustStock('${produto.id}', -1)">-1</button>
                <button class="stock-btn" onclick="adjustStock('${produto.id}', -5)">-5</button>
                <button class="stock-btn" onclick="adjustStock('${produto.id}', 5)">+5</button>
                <button class="stock-btn" onclick="adjustStock('${produto.id}', 1)">+1</button>
            </div>
        `;
        controls.appendChild(item);
    });
}

function editProduct(productId) {
    const produto = findProductById(productId);
    if (!produto) return;
    
    currentEditingProduct = productId;
    
    // Fill form with current data
    document.getElementById('editName').value = produto.nome;
    document.getElementById('editPrice').value = produto.preco;
    document.getElementById('editStock').value = produto.estoque;
    document.getElementById('editImage').value = produto.imagem;
    document.getElementById('editDescription').value = produto.descricao;
    
    // Show modal
    document.getElementById('editModal').style.display = 'block';
}

function handleEditProduct(e) {
    e.preventDefault();
    
    if (!currentEditingProduct) return;
    
    const produto = findProductById(currentEditingProduct);
    if (!produto) return;
    
    // Update product data
    produto.nome = document.getElementById('editName').value;
    produto.preco = parseFloat(document.getElementById('editPrice').value);
    produto.estoque = parseInt(document.getElementById('editStock').value);
    produto.imagem = document.getElementById('editImage').value;
    produto.descricao = document.getElementById('editDescription').value;
    
    // Close modal
    document.getElementById('editModal').style.display = 'none';
    
    // Update displays
    updateProductDisplays();
    updateAdminContent();
    
    alert('Produto atualizado com sucesso!');
}

function adjustStock(productId, adjustment) {
    const produto = findProductById(productId);
    if (!produto) return;
    
    produto.estoque = Math.max(0, produto.estoque + adjustment);
    
    // Update displays
    updateProductDisplays();
    updateStockControls();
}

function findProductById(productId) {
    const allProducts = [...produtos.vinhos, ...produtos.cervejas];
    return allProducts.find(p => p.id === productId);
}

// Update product displays
function updateProductDisplays() {
    updateVinhosGrid();
    updateCervejasGrid();
    updateDestaquesGrid();
}

function updateVinhosGrid() {
    const grid = document.getElementById('vinhos-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    produtos.vinhos.forEach(vinho => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product', vinho.id);
        card.innerHTML = `
            <img src="${vinho.imagem}" alt="${vinho.nome}">
            <h3>${vinho.nome}</h3>
            <p class="price">R$ ${vinho.preco.toFixed(2)}</p>
            <p class="stock">Estoque: ${vinho.estoque} unidades</p>
            <button class="buy-btn" onclick="comprarProduto('${vinho.nome}')">Comprar</button>
        `;
        grid.appendChild(card);
    });
}

function updateCervejasGrid() {
    const grid = document.getElementById('cervejas-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    produtos.cervejas.forEach(cerveja => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product', cerveja.id);
        card.innerHTML = `
            <img src="${cerveja.imagem}" alt="${cerveja.nome}">
            <h3>${cerveja.nome}</h3>
            <p class="price">R$ ${cerveja.preco.toFixed(2)}</p>
            <p class="stock">Estoque: ${cerveja.estoque} unidades</p>
            <button class="buy-btn" onclick="comprarProduto('${cerveja.nome}')">Comprar</button>
        `;
        grid.appendChild(card);
    });
}

function updateDestaquesGrid() {
    const grid = document.querySelector('#destaques .products-grid');
    if (!grid) return;
    
    // Get featured products (first 4 products)
    const featuredProducts = [
        produtos.vinhos[0],
        produtos.cervejas[0],
        produtos.vinhos[1],
        produtos.vinhos[3]
    ];
    
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        if (featuredProducts[index]) {
            const produto = featuredProducts[index];
            card.querySelector('img').src = produto.imagem;
            card.querySelector('img').alt = produto.nome;
            card.querySelector('h3').textContent = produto.nome;
            card.querySelector('.price').textContent = `R$ ${produto.preco.toFixed(2)}`;
            card.querySelector('.stock').textContent = `Estoque: ${produto.estoque} unidades`;
            card.querySelector('.buy-btn').setAttribute('onclick', `comprarProduto('${produto.nome}')`);
        }
    });
}

// Purchase functionality
function comprarProduto(nomeProduto) {
    const mensagem = `Olá! Gostaria de comprar: ${nomeProduto}`;
    const whatsappUrl = `https://wa.me/5542988194349?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

// Utility functions
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Erro na aplicação:', e.error);
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive carousel adjustment
function adjustCarouselForMobile() {
    if (window.innerWidth <= 768) {
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach(slide => {
            slide.style.minWidth = '250px';
        });
    }
}

// Initialize responsive adjustments
window.addEventListener('resize', debounce(adjustCarouselForMobile, 250));

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const carouselId = carousel.id.replace('carousel-', '');
            if (diff > 0) {
                // Swipe left - next
                moveCarousel(carouselId, 1);
            } else {
                // Swipe right - previous
                moveCarousel(carouselId, -1);
            }
        });
    }
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
        
        // Close sidebar
        closeSidebarMenu();
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Loading animation (optional enhancement)
function showLoading() {
    // Could add a loading spinner here
}

function hideLoading() {
    // Hide loading spinner
}

// Local storage for persistence (optional enhancement)
function saveToLocalStorage() {
    localStorage.setItem('4estacoes_produtos', JSON.stringify(produtos));
    localStorage.setItem('4estacoes_login', isLoggedIn);
}

function loadFromLocalStorage() {
    const savedProducts = localStorage.getItem('4estacoes_produtos');
    const savedLogin = localStorage.getItem('4estacoes_login');
    
    if (savedProducts) {
        produtos = JSON.parse(savedProducts);
    }
    
    if (savedLogin === 'true') {
        isLoggedIn = true;
    }
}

// Initialize local storage on load
// loadFromLocalStorage();

// Save to local storage on changes
// setInterval(saveToLocalStorage, 30000); // Save every 30 seconds

