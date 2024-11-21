document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');

    // Fetch books and find the one matching the title
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const book = data.books.find(b => b.title === bookTitle);
            if (book) displayBookDetails(book);
        })
        .catch(error => console.error('Erreur:', error));

    // Display the details of the selected book
    function displayBookDetails(book) {
        const defaultCover = 'default-cover.jpg';
        document.getElementById('bookCover').src = book.cover || defaultCover;
        document.getElementById('bookTitle').textContent = book.title;
        document.getElementById('bookCategory').textContent = book.category || 'Not specified';
        document.getElementById('bookDate').textContent = new Date(book.releaseDate).getFullYear();
        document.getElementById('bookDescription').textContent = book.description || 'No description available.';
        document.getElementById('authorName').textContent = book.author.name;
        document.getElementById('authorBio').textContent = book.author.biography || 'No biography available.';
        document.getElementById('readBtn').href = book.linkPdf || '#';

        // Wishlist functionality
        const wishlist = getWishlist();
        const isInWishlist = checkWishlist(book.title, wishlist);
        const wishlistBtn = document.getElementById('wishlistBtn');
        setWishlistBtnState(isInWishlist, wishlistBtn);

        wishlistBtn.addEventListener('click', () => toggleWishlist(book, wishlistBtn));
    }

    // Get the wishlist from localStorage
    function getWishlist() {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }

    // Check if the book is in the wishlist using a simple loop
    function checkWishlist(title, wishlist) {
        for (const item of wishlist) {
            if (item.title === title) {
                return true;
            }
        }
        return false;
    }

    // Set the wishlist button state based on whether the book is in the wishlist
    function setWishlistBtnState(isInWishlist, wishlistBtn) {
        if (isInWishlist) {
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from wishlist';
            wishlistBtn.classList.add('in-wishlist');
        } else {
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Add to wishlist';
            wishlistBtn.classList.remove('in-wishlist');
        }
    }

    // Add or remove the book from the wishlist
    function toggleWishlist(book, wishlistBtn) {
        let wishlist = getWishlist();
        let isBookInWishlist = false;

        // Simple loop to find and remove the book
        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].title === book.title) {
                wishlist.splice(i, 1);
                isBookInWishlist = true;
                break;
            }
        }

        if (!isBookInWishlist) {
            wishlist.push(book);
            showNotification('Book added to your wishlist');
        } else {
            showNotification('Book removed from your wishlist');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setWishlistBtnState(!isBookInWishlist, wishlistBtn); // Update the button state
    }

    // Display a notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }
});
