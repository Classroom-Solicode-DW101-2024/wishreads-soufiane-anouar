// JavaScript for controlling the slideshow
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide-show img");
    const buttonsContainer = document.getElementById("slide-buttons");
    let currentIndex = 0;
    let autoSlideInterval; 


    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove("active", "previous");
            if (index === currentIndex) {
                slide.classList.add("active");
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add("previous");
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
    }

    // add buttons foreach slide
    slides.forEach((_, index) => {
        const button = document.createElement("button");
        button.textContent = ".";
        button.addEventListener("click", () => goToSlide(index));
        buttonsContainer.appendChild(button);
    });

    // function to move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide, and wrap around at the end
        updateSlides();
    }

    // Start the automatic slideshow
    function startAutoSlide() {
        // Automatically change the slide every 3 seconds (3000ms)
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    // Initialize the slideshow
    updateSlides();

    // Start the automatic slide show
    startAutoSlide();

    buttonsContainer.addEventListener("click", () => {
        clearInterval(autoSlideInterval);  // Stop the automatic slideshow
        startAutoSlide();  // Restart it 
    });
});

// 

document.addEventListener('DOMContentLoaded', function () {
    let booksData = []; // Global variable to store books

    // Fetch books from the JSON file
    function fetchBooks() {
        fetch('books.json')
            .then(response => {
                if (!response.ok) {
                    return Promise.reject('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                booksData = data.books; // Store books data globally
                displayBooks(booksData); // Display all books
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Display books in the grid
    function displayBooks(books) {
        const container = document.getElementById('booksGrid');
        container.innerHTML = ''; // Clear previous content

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            const isInWishlist = isBookInWishlist(book);

            card.innerHTML = `
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
                <button class="favorite-btn" data-title="${book.title}">
                    <i class="fas fa-heart ${isInWishlist ? 'active' : ''}"></i>
                </button>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author.name}</p>
                </div>
                <a href="details.html?title=${encodeURIComponent(book.title)}" class="details-btn"><i class="fa-solid fa-circle-info"></i>  See Details</a>
            `;

            const favBtn = card.querySelector('.favorite-btn');
            favBtn.addEventListener('click', function () {
                toggleWishlist(book, favBtn); // Pass the button element to update it directly
            });

            container.appendChild(card);
        });
    }

    // Check if the book is already in the wishlist
    function isBookInWishlist(book) {
        const wishlist = getWishlist();
        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].title === book.title) {
                return true;
            }
        }
        return false;
    }

    // Get the wishlist from localStorage
    function getWishlist() {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }

    // Add or remove book from wishlist
    function toggleWishlist(book, favBtn) {
        const wishlist = getWishlist();
        let index = -1;
        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].title === book.title) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            wishlist.push(book);
            showNotification('Book added to your wishlist');
            favBtn.querySelector('i').classList.add('active'); // Update icon immediately
        } else {
            wishlist.splice(index, 1);
            showNotification('Book removed from your wishlist');
            favBtn.querySelector('i').classList.remove('active'); // Update icon immediately
        }

        // Store the updated wishlist in localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Show a notification message
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }

    // Search books by title, author, or both
    document.getElementById('searchBtn').addEventListener('click', function () {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const searchCriteria = document.getElementById('searchCriteria').value;
        const filteredBooks = [];
    
        for (let i = 0; i < booksData.length; i++) {
            const book = booksData[i];
            if (searchCriteria === 'title' && book.title.toLowerCase().includes(searchInput)) {
                filteredBooks.push(book);
            } else if (searchCriteria === 'author' && book.author.name.toLowerCase().includes(searchInput)) {
                filteredBooks.push(book);
            } else if (searchCriteria === 'all' && (
                book.title.toLowerCase().includes(searchInput) || book.author.name.toLowerCase().includes(searchInput)
            )) {
                filteredBooks.push(book); // Check both title and author when 'All' is selected
            }
        }
    
        if (filteredBooks.length === 0) {
            showNotification('No books found matching your search criteria.');
        }
    
        displayBooks(filteredBooks); // Re-render books with search results
    });
    
    // Function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Clear the search input and show all books
    document.getElementById('clearBtn').addEventListener('click', function () {
        document.getElementById('searchInput').value = ''; 
        displayBooks(booksData); 
    });

    fetchBooks(); // Load books when the page loads
});
