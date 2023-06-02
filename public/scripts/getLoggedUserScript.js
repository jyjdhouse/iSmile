import { getLoggedUser } from './utils.js';
let getLoggedUserId = null;
// Cuando carga hagon el fetch
window.addEventListener('load', async () => {
    getLoggedUserId = (await getLoggedUser()).userId;
});


