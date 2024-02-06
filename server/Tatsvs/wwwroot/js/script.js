function openAuth(){
    auth.classList.remove('dn')
}
function closeAuth(){
    auth.classList.add('dn')
}

function removeBoxShadow(event) {
    const input = event.target;
    const parentContainer = input.parentNode;
    parentContainer.style.boxShadow = 'none';
}

function restoreBoxShadow(event) {
    const input = event.target;
    const parentContainer = input.parentNode;
    parentContainer.style.boxShadow = '0px 8px 22px 1px rgba(0, 0, 0, 0.25)';
}

const inputElements = document.querySelectorAll('input');

inputElements.forEach(function (input) {
    input.addEventListener('focus', removeBoxShadow);
    input.addEventListener('blur', restoreBoxShadow);
});