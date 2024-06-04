$(document).ready(function() {
    const foodItemsUrl = 'data.json';
    let cartItems = [];
    const usdToInrRate = 75.0; // Conversion rate from USD to INR (Indian Rupees)

    // Ajax request to fetch food items
    $.ajax({
        url: foodItemsUrl,
        dataType: 'json',
        success: function(data) {
            if (data && data.length > 0) {
                displayFoodItems(data);
            } else {
                $('#foodItemsContainer').html('<p>No food items available.</p>');
            }
        },
        error: function() {
            $('#foodItemsContainer').html('<p>Error fetching food items.</p>');
        }
    });

    // Function to display food items on the webpage with animations
    function displayFoodItems(items) {
        let delay = 0;
        items.forEach(item => {
            const card = $(`
                <div class="col-md-4 mb-4" style="opacity: 0; transform: translateY(50px); transition: opacity 0.5s ease, transform 0.5s ease ${delay}ms;">
                    <div class="card">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text">₹${convertToINR(item.price)}</p>
                            <button class="btn btn-primary addToCartBtn" data-id="${item.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `);
            $('#foodItemsContainer').append(card);
            setTimeout(() => {
                card.css({ opacity: 1, transform: 'translateY(0)' });
            }, delay);
            delay += 100;
        });

        // Add event listener for Add to Cart buttons with hover effect
        $('.addToCartBtn').hover(
            function() {
                $(this).addClass('animate__pulse');
            },
            function() {
                $(this).removeClass('animate__pulse');
            }
        );

        // Add event listener for Add to Cart buttons
        $('.addToCartBtn').click(function() {
            const itemId = $(this).data('id');
            const selectedItem = items.find(item => item.id === itemId);
            if (selectedItem) {
                cartItems.push(selectedItem);
                updateCart();
            }
        });
    }

    // Function to convert USD price to INR
    function convertToINR(usdPrice) {
        return (usdPrice * usdToInrRate).toFixed(2); // Convert USD price to INR and return formatted string
    }

    // Function to update the cart display with animations
    function updateCart() {
        $('#cartItems').empty();
        let total = 0;
        cartItems.forEach(item => {
            const cartItem = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center" style="opacity: 0; transform: translateX(50px); transition: opacity 0.5s ease, transform 0.5s ease;">
                    ${item.name} - ₹${convertToINR(item.price)}
                </li>
            `);
            $('#cartItems').append(cartItem);
            setTimeout(() => {
                cartItem.css({ opacity: 1, transform: 'translateX(0)' });
            }, 100);
            total += item.price;
        });
        $('#cartTotal').text(`₹${convertToINR(total)}`); // Display total cart amount in INR
    }

    // Checkout button click handler with bounce animation
    $('#checkoutBtn').click(function() {
        $(this).addClass('animate__animated animate__bounce');
        setTimeout(() => {
            $(this).removeClass('animate__animated animate__bounce');
            alert('Checkout functionality is not implemented in this project.');
            // (send to backend for order processing)
        }, 1000);
    });
});
