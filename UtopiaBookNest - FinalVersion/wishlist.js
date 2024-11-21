document.addEventListener('DOMContentLoaded', function () {
    displayWishlist();

    function displayWishlist(filteredBooks = null) {
        const wishlist = filteredBooks || getWishlist(); // Use filtered books if provided, otherwise get from localStorage
        const emptyWishlist = document.getElementById('emptyWishlist');
        const wishlistGrid = document.getElementById('wishlistGrid');
    
        // Clear existing books immediately
        while (wishlistGrid.firstChild) {
            wishlistGrid.removeChild(wishlistGrid.firstChild);
        }
    
        if (wishlist.length === 0) {
            emptyWishlist.classList.remove('hidden');
            wishlistGrid.classList.add('hidden');
        } else {
            emptyWishlist.classList.add('hidden');
            wishlistGrid.classList.remove('hidden');
    
            // Add books to the grid
            for (let book of wishlist) {
                const bookCard = createBookCard(book);
                wishlistGrid.appendChild(bookCard);
            }
        }
    }
    
    function getWishlist() {
        const storedWishlist = localStorage.getItem('wishlist');
        if (!storedWishlist) return [];
        try {
            return JSON.parse(storedWishlist);
        } catch (error) {
            console.error('Error parsing wishlist:', error);
            return [];
        }
    }

    function getReadBooks() {
        const storedReadBooks = localStorage.getItem('readBooks');
        if (!storedReadBooks) return [];
        try {
            return JSON.parse(storedReadBooks);
        } catch (error) {
            console.error('Error parsing read books:', error);
            return [];
        }
    }

    function saveReadBooks(readBooks) {
        localStorage.setItem('readBooks', JSON.stringify(readBooks));
    }

    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'wishlist-book-card';

        const cover = book.cover || 'default-cover.jpg';
        const title = book.title || 'Untitled';
        const author = book.author.name;
        const description = book.description;
        const pdfLink = book.linkPdf || '#';

        // Check if the book is in the read list
        const readBooks = getReadBooks();
        const isRead = readBooks.some(rb => rb.title === title);

        card.innerHTML = `
            <div class="book-cover-container">
                <img src="${cover}" alt="${title}" class="book-cover">
                <div class="book-status">
                    <button class="status-btn ${isRead ? 'read' : ''}" data-title="${title}">
                        <i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i>
                        ${isRead ? 'Read' : 'Mark as read'}
                    </button>
                </div>
            </div>
            <div class="book-info">
                <h3 id="wishlist-title">${title}</h3>
                <p class="author">${author}</p>
                <div class="book-actions">
                    <a href="${pdfLink}" class="read-btn" target="_blank">
                        <i class="fa-solid fa-file-pdf"></i> Read
                    </a>
                    <button class="remove-btn" data-title="${title}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.remove-btn').addEventListener('click', function () {
            removeFromWishlist(title);
        });
        card.querySelector('.status-btn').addEventListener('click', function () {
            toggleReadStatus(book);
        });

        return card;
    }

    function removeFromWishlist(title) {
        // Update the wishlist
        const wishlist = getWishlist();
        const updatedWishlist = [];
        
        for (let book of wishlist) {
            if (book.title !== title) {
                updatedWishlist.push(book);
            }
        }
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
        // Update the readBooks list
        const readBooks = getReadBooks();
        const updatedReadBooks = [];
        
        for (let book of readBooks) {
            if (book.title !== title) {
                updatedReadBooks.push(book);
            }
        }
        saveReadBooks(updatedReadBooks);
    
        showNotification('Book removed from your wishlist and "Read" list if applicable');
        displayWishlist();
    }
    
    
    function toggleReadStatus(book) {
        const readBooks = getReadBooks();
        const bookIndex = readBooks.findIndex(rb => rb.title === book.title);
    
        if (bookIndex !== -1) {
            // Remove from readBooks
            readBooks.splice(bookIndex, 1);
            showNotification('Book removed from "Read" list');
        } else {
            // Add to readBooks
            readBooks.push(book);
            showNotification('Book added to "Read" list');
        }
    
        saveReadBooks(readBooks);
        displayWishlist();
    }

    // Search books by title or author (including the new 'All' option)
    document.getElementById('searchBtn').addEventListener('click', function () {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const searchCriteria = document.getElementById('searchCriteria').value;
        const books = getWishlist(); // Use wishlist from localStorage
    
        if (books.length === 0) {
            showNotification('No books available in your wishlist.');
            return;
        }
    
        const filteredBooks = books.filter(book => {
            if (searchCriteria === 'title') return book.title.toLowerCase().includes(searchInput);
            if (searchCriteria === 'author') return book.author.name.toLowerCase().includes(searchInput);
            if (searchCriteria === 'all') {
                return book.title.toLowerCase().includes(searchInput) || book.author.name.toLowerCase().includes(searchInput);
            }
            return false; 
        });
    
        if (filteredBooks.length === 0) {
            showNotification('No books found matching your search criteria.');
        }
    
        displayWishlist(filteredBooks); 
    });
    

    document.getElementById('clearBtn').addEventListener('click', function () {
        document.getElementById('searchInput').value = ''; 
        displayWishlist(); 
    });
    
    // 
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
});

// localStorage.clear();