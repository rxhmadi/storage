/* ==========================================
   MODERN GAMING WEBSITE JAVASCRIPT
   Mobile-First Interactive Features
   ========================================== */

// Main App Object
const ModernPlay = {
    // App initialization
    init: function() {
        this.initializeComponents();
        this.bindEvents();
        this.setupIntersectionObserver();
        this.loadUserPreferences();
        console.log('ModernPlay initialized successfully');
    },

    // Initialize all components
    initializeComponents: function() {
        this.header = document.getElementById('header');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.mobileNavOverlay = document.getElementById('mobileNavOverlay');
        this.mobileNavClose = document.getElementById('mobileNavClose');
        this.searchToggle = document.getElementById('searchToggle');
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchClose = document.getElementById('searchClose');
        this.searchInput = document.getElementById('searchInput');
        this.backToTop = document.getElementById('backToTop');
        this.cookieConsent = document.getElementById('cookieConsent');
        this.cookieAccept = document.getElementById('cookieAccept');
        this.cookieSettings = document.getElementById('cookieSettings');
        
        // Initialize mobile navigation accordion
        this.initMobileAccordion();
        
        // Initialize search functionality
        this.initSearch();
        
        // Show cookie consent if not accepted
        this.checkCookieConsent();
    },

    // Bind all event handlers
    bindEvents: function() {
        // Mobile menu events
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        if (this.mobileNavClose) {
            this.mobileNavClose.addEventListener('click', () => this.closeMobileMenu());
        }
        
        if (this.mobileNavOverlay) {
            this.mobileNavOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileNavOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // Search events
        if (this.searchToggle) {
            this.searchToggle.addEventListener('click', () => this.toggleSearch());
        }
        
        if (this.searchClose) {
            this.searchClose.addEventListener('click', () => this.closeSearch());
        }
        
        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) {
                    this.closeSearch();
                }
            });
        }

        // Back to top
        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => this.scrollToTop());
        }

        // Cookie consent
        if (this.cookieAccept) {
            this.cookieAccept.addEventListener('click', () => this.acceptCookies());
        }
        
        if (this.cookieSettings) {
            this.cookieSettings.addEventListener('click', () => this.showCookieSettings());
        }

        // Scroll events
        window.addEventListener('scroll', this.debounce(() => {
            this.handleScroll();
        }, 16)); // 60fps

        // Resize events
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Game item interactions
        this.initGameInteractions();

        // Smooth scroll for anchor links
        this.initSmoothScroll();
    },

    // Mobile menu functions
    toggleMobileMenu: function() {
        const isActive = this.mobileNavOverlay.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    openMobileMenu: function() {
        this.mobileNavOverlay.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusableElement = this.mobileNavOverlay.querySelector('a, button');
        if (firstFocusableElement) {
            setTimeout(() => firstFocusableElement.focus(), 300);
        }
    },

    closeMobileMenu: function() {
        this.mobileNavOverlay.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to menu toggle
        setTimeout(() => this.mobileMenuToggle.focus(), 300);
    },

    // Initialize mobile navigation accordion
    initMobileAccordion: function() {
        const accordionToggles = document.querySelectorAll('.mobile-nav-toggle');
        
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const submenu = this.parentNode.querySelector('.mobile-nav-submenu');
                const isActive = this.classList.contains('active');
                
                // Close all other accordions
                accordionToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.classList.remove('active');
                        const otherSubmenu = otherToggle.parentNode.querySelector('.mobile-nav-submenu');
                        if (otherSubmenu) {
                            otherSubmenu.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current accordion
                if (isActive) {
                    this.classList.remove('active');
                    submenu.classList.remove('active');
                } else {
                    this.classList.add('active');
                    submenu.classList.add('active');
                }
            });
        });
    },

    // Search functionality
    toggleSearch: function() {
        const isActive = this.searchOverlay.classList.contains('active');
        
        if (isActive) {
            this.closeSearch();
        } else {
            this.openSearch();
        }
    },

    openSearch: function() {
        this.searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on search input
        setTimeout(() => {
            if (this.searchInput) {
                this.searchInput.focus();
            }
        }, 300);
    },

    closeSearch: function() {
        this.searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear search results
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.innerHTML = '';
        }
        
        // Return focus to search toggle
        setTimeout(() => this.searchToggle.focus(), 300);
    },

    // Initialize search with debounced input
    initSearch: function() {
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', this.debounce((e) => {
            this.performSearch(e.target.value);
        }, 300));
        
        // Handle search form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch(this.searchInput.value);
            });
        }
    },

    // Perform search functionality
    performSearch: function(query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults || !query.trim()) {
            if (searchResults) searchResults.innerHTML = '';
            return;
        }

        // Simulate search results (replace with actual search API)
        const games = [
            { title: 'Super Adventure', category: 'Action', slug: 'super-adventure' },
            { title: 'Mind Puzzle', category: 'Puzzle', slug: 'mind-puzzle' },
            { title: 'Speed Racer', category: 'Racing', slug: 'speed-racer' },
            { title: 'Space Explorer', category: 'Adventure', slug: 'space-explorer' }
        ];

        const filteredGames = games.filter(game => 
            game.title.toLowerCase().includes(query.toLowerCase()) ||
            game.category.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredGames.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i data-lucide="search-x"></i>
                    <p>No games found for "${query}"</p>
                </div>
            `;
        } else {
            const resultsHTML = filteredGames.map(game => `
                <a href="/game/${game.slug}" class="search-result-item">
                    <div class="search-result-info">
                        <h4 class="search-result-title">${game.title}</h4>
                        <p class="search-result-category">${game.category}</p>
                    </div>
                    <i data-lucide="arrow-right"></i>
                </a>
            `).join('');
            
            searchResults.innerHTML = `
                <div class="search-results-list">
                    ${resultsHTML}
                </div>
            `;
        }

        // Re-initialize Lucide icons for new content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    // Scroll handling
    handleScroll: function() {
        const scrollY = window.scrollY;
        
        // Header scroll effect
        if (this.header) {
            if (scrollY > 100) {
                this.header.style.background = 'rgba(15, 15, 35, 0.98)';
                this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.background = 'rgba(15, 15, 35, 0.95)';
                this.header.style.boxShadow = 'none';
            }
        }
        
        // Back to top button
        if (this.backToTop) {
            if (scrollY > 500) {
                this.backToTop.classList.add('visible');
            } else {
                this.backToTop.classList.remove('visible');
            }
        }
    },

    // Resize handling
    handleResize: function() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 1024) {
            this.closeMobileMenu();
            this.closeSearch();
        }
    },

    // Keyboard event handling
    handleKeyboard: function(e) {
        // Escape key handling
        if (e.key === 'Escape') {
            if (this.mobileNavOverlay.classList.contains('active')) {
                this.closeMobileMenu();
            }
            if (this.searchOverlay.classList.contains('active')) {
                this.closeSearch();
            }
        }
        
        // Search shortcut (Ctrl/Cmd + K)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.openSearch();
        }
    },

    // Scroll to top smoothly
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Game interactions
    initGameInteractions: function() {
        const gameItems = document.querySelectorAll('.game-item');
        
        gameItems.forEach(item => {
            // Add click handler for entire game card
            item.addEventListener('click', function(e) {
                if (!e.target.closest('.play-btn')) {
                    const playBtn = this.querySelector('.play-btn');
                    if (playBtn) {
                        window.location.href = playBtn.href;
                    }
                }
            });
            
            // Add keyboard support
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Add touch feedback
            if ('ontouchstart' in window) {
                item.addEventListener('touchstart', function() {
                    this.style.transform = 'translateY(-4px) scale(1.02)';
                });
                
                item.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            }
        });
    },

    // Smooth scroll for anchor links
    initSmoothScroll: function() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Intersection Observer for animations
    setupIntersectionObserver: function() {
        if (!('IntersectionObserver' in window)) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.game-item, .category-card, .feature-card, .section-header'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    },

    // Cookie consent handling
    checkCookieConsent: function() {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent && this.cookieConsent) {
            setTimeout(() => {
                this.cookieConsent.classList.add('visible');
            }, 2000);
        }
    },

    acceptCookies: function() {
        localStorage.setItem('cookie-consent', 'accepted');
        this.cookieConsent.classList.remove('visible');
        
        // Enable analytics and other cookies here
        this.enableAnalytics();
    },

    showCookieSettings: function() {
        // Redirect to cookie settings page or show modal
        window.location.href = '/cookie-policy';
    },

    enableAnalytics: function() {
        // Enable Google Analytics or other tracking
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    },

    // Load user preferences
    loadUserPreferences: function() {
        // Load saved preferences from localStorage
        const preferences = JSON.parse(localStorage.getItem('user-preferences') || '{}');
        
        // Apply preferences
        if (preferences.darkMode !== undefined) {
            document.body.classList.toggle('light-theme', !preferences.darkMode);
        }
    },

    // Save user preferences
    saveUserPreferences: function(preferences) {
        const current = JSON.parse(localStorage.getItem('user-preferences') || '{}');
        const updated = { ...current, ...preferences };
        localStorage.setItem('user-preferences', JSON.stringify(updated));
    },

    // Utility function: Debounce
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Utility function: Throttle
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Touch gesture detection
    initTouchGestures: function() {
        if (!('ontouchstart' in window)) return;
        
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            ModernPlay.handleSwipeGesture();
        });
        
        this.handleSwipeGesture = function() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > minSwipeDistance) {
                    // Swipe right
                    if (this.mobileNavOverlay.classList.contains('active')) {
                        this.closeMobileMenu();
                    }
                } else if (deltaX < -minSwipeDistance) {
                    // Swipe left
                    // Could open quick actions or similar
                }
            }
        };
    },

    // Performance monitoring
    initPerformanceMonitoring: function() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.measurePerformance();
            });
        } else {
            setTimeout(() => this.measurePerformance(), 2000);
        }
    },

    measurePerformance: function() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                const loadTime = navigation.loadEventEnd - navigation.fetchStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Send to analytics if needed
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        value: Math.round(loadTime)
                    });
                }
            }
        }
    },

    // Error handling
    initErrorHandling: function() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
            
            // Send to error reporting service
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: e.error.toString(),
                    fatal: false
                });
            }
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled Promise Rejection:', e.reason);
            
            // Send to error reporting service
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: e.reason.toString(),
                    fatal: false
                });
            }
        });
    }
};

// Additional CSS for search results and animations
const additionalCSS = `
.search-results-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.search-result-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);
}

.search-result-item:hover {
    border-color: var(--border-accent);
    background: var(--bg-tertiary);
}

.search-result-title {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
}

.search-result-category {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

.search-no-results {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--text-secondary);
}

.search-no-results i {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-md);
    opacity: 0.5;
}

.animate-in {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Loading spinner */
.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-primary);
    border-radius: 50%;
    border-top-color: var(--primary-color);
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

// Inject additional CSS
function injectCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Inject additional CSS
    injectCSS(additionalCSS);
    
    // Initialize touch gestures
    ModernPlay.initTouchGestures();
    
    // Initialize performance monitoring
    ModernPlay.initPerformanceMonitoring();
    
    // Initialize error handling
    ModernPlay.initErrorHandling();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPlay;
}

