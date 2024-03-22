window.onload = function() {
    const hallOfFameUsersContent = document.querySelectorAll('.hall__of__fame__user__content');

    const placesImages = ["https://cdn-icons-png.flaticon.com/32/2583/2583344.png", "https://cdn-icons-png.flaticon.com/32/11166/11166468.png", "https://cdn-icons-png.flaticon.com/32/11006/11006261.png"]

    hallOfFameUsersContent.forEach(hallOfFameUserContent => {
        const firstThreeUsers = Array.from(hallOfFameUserContent.querySelectorAll('.hall__of__fame__user')).slice(0,3);
        
        firstThreeUsers.forEach((user, idx) => {
            const userPlaceImage = user.querySelector('.user__place__image');
            userPlaceImage.src = placesImages[idx]
        })
    })
}