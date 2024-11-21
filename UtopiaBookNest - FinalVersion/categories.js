document.addEventListener('DOMContentLoaded', function() {
    const categoryTable = document.querySelector('.category-table');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryBooksGrid = document.getElementById('categoryBooksGrid');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category') || 'Fantasy'; 

    // Fetch books data and handle display
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            window.booksData = data.books;
            populateCategoryTable(data.books);
            displayCategoryBooks(selectedCategory);
        })
        .catch(error => console.error('Erreur:', error));

    // Populate the category table with unique categories
    function populateCategoryTable(books) {
        const categories = [...new Set(books.map(book => book.category))];
        const tableBody = categoryTable.querySelector('tbody') || document.createElement('tbody');
        tableBody.innerHTML = ''; 

        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-category="${category}">
                    <i class="${getCategoryIcon(category)}"></i>
                    <span>${category}</span>
                </td>
            `;
            tableBody.appendChild(row);
        });

        categoryTable.appendChild(tableBody);

        // Add click event listeners for category selection
        tableBody.querySelectorAll('td').forEach(row => {
            row.addEventListener('click', () => displayCategoryBooks(row.dataset.category));
        });
    }

    // Get appropriate icon for the category
    function getCategoryIcon(category) {
        const icons = {
            'Fantasy': 'fas fa-dragon',
            'Dystopian': 'fas fa-city',
            'Classic Literature': 'fa-solid fa-building-columns',
        };
        return icons[category];
    }

    // Display books for the selected category
    function displayCategoryBooks(category) {
        categoryTitle.textContent = category;
        categoryBooksGrid.innerHTML = ''; // Clear previous books

        const filteredBooks = booksData.filter(book => book.category === category);

        filteredBooks.forEach(book => {
            const bookElement = createBookElement(book);
            categoryBooksGrid.appendChild(bookElement);
        });
    }

    // Create a book element for the category grid
    function createBookElement(book) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-card');

        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isInWishlist = wishlist.some(item => item.title === book.title);

        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author.name}</p>
            </div>
            <div class="book-actions">
                <a href="details.html?title=${encodeURIComponent(book.title)}" class="details-btn">
                   <i class="fa-solid fa-circle-info"></i>  See Details</a>
                </a>
                <button class="favorite-btn" data-title="${book.title}">
                    <i class="fas fa-heart ${isInWishlist ? 'active' : ''}"></i>
                </button>
            </div>
        `;

        // Add event listener for wishlist toggle
        bookElement.querySelector('.favorite-btn').addEventListener('click', function() {
            toggleWishlist(book);
            this.querySelector('i').classList.toggle('active');
        });

        return bookElement;
    }

    // Toggle book between wishlist and remove
    function toggleWishlist(book) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const index = wishlist.findIndex(item => item.title === book.title);

        if (index === -1) {
            wishlist.push(book);
            showNotification('Book added to your wishlist');
        } else {
            wishlist.splice(index, 1);
            showNotification('Book removed from your wishlist');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Show notification message
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }
});

