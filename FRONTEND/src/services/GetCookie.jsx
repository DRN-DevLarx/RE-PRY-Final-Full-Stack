
function getCookie(name) {
const cookies = document.cookie.split(';');

for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
    return value;
    }
}
return null;
}

 export default {getCookie}