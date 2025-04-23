export const setupTabNavigation = () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            window.location.href = tabId === "" ? "/" : `/${tabId}`;
        });
    });
}

export default { setupTabNavigation };