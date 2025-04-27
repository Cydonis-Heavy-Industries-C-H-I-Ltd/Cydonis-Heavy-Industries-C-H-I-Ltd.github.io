document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const menuWrapper = document.querySelector('.menu-wrapper');
    const menuItems = document.querySelector('.menu-items');
    let isExpanded = false;

    menuButton.addEventListener('click', () => {
        if (!isExpanded) {
            // Expand the menu
            menuWrapper.classList.add('expanded');
            setTimeout(() => {
                menuItems.classList.add('visible');
            }, 150);
        } else {
            // Collapse the menu
            menuItems.classList.remove('visible');
            setTimeout(() => {
                menuWrapper.classList.remove('expanded');
            }, 150);
        }
        isExpanded = !isExpanded;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (isExpanded && 
            !menuWrapper.contains(event.target) && 
            !menuButton.contains(event.target)) {
            menuItems.classList.remove('visible');
            setTimeout(() => {
                menuWrapper.classList.remove('expanded');
            }, 150);
            isExpanded = false;
        }
    });
});