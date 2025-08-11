const dragButton = document.getElementById('dragButton');
const sidebar = document.getElementById('sidebar');

function togglePoweredByMob() {
    const poweredBy = $('#poweredBy');
    const poweredBymob = $('#poweredBymob');

    // Check if the window width is 600px or less
    if (window.innerWidth <= 600) {
        poweredBymob.css('display', 'block');
        poweredBy.css('display', 'none');
    } else {
        poweredBymob.css('display', 'none');
        poweredBy.css('display', 'block');
    }
}
// Call this function to adjust initial state
togglePoweredByMob();

let isDragging = false;
let startX;
let maxSidebarWidth = getSidebarWidth();
let sidebarOpen = false; // Track the sidebar state

function getSidebarWidth() {
    return window.innerWidth < 600 ? window.innerWidth * 0.7 : window.innerWidth * 0.3;
}

function onStart(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onStop);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', onStop);
}

function onDrag(e) {
    if (!isDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    const newLeft = Math.min(Math.max(0, deltaX), maxSidebarWidth); // Restrict dragging between 0 and maxSidebarWidth

    dragButton.style.left = `${newLeft}px`;
    sidebar.style.left = `${newLeft - maxSidebarWidth}px`; // Sidebar follows the button
}

function onStop() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onStop);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', onStop);

    const finalLeft = parseInt(dragButton.style.left, 10);
    if (finalLeft > maxSidebarWidth / 2) { // If dragged more than halfway, open fully
        openSidebar();
    } else { // Otherwise, close
        closeSidebar();
    }
}

function openSidebar() {
    dragButton.style.left = `${maxSidebarWidth}px`;
    sidebar.style.left = '0';
    sidebarOpen = true;
}

function closeSidebar() {
    dragButton.style.left = '0';
    sidebar.style.left = `-${maxSidebarWidth}px`;
    sidebarOpen = false;
}

// Click functionality
dragButton.addEventListener('click', () => {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Update the maxSidebarWidth if the window is resized
window.addEventListener('resize', () => {
    maxSidebarWidth = getSidebarWidth();
    if (parseInt(dragButton.style.left, 10) > maxSidebarWidth) {
        openSidebar();
    }
});

// Drag functionality
dragButton.addEventListener('mousedown', onStart);
dragButton.addEventListener('touchstart', onStart); // Support for touch devices
