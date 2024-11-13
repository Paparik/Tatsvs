function setTableActive(elem){
    elem.parentNode.classList.toggle("table_active")
}
    
function setActive(elem){
    elem.parentNode.classList.toggle("item_active")
}

function setSubActive(elem){
    elem.parentNode.classList.toggle("sub-table_active")
}

function openSliderConstructor(elem){
    elem.parentNode.classList.toggle("slider_active")
}
function closeSliderConstructor(elem){
    elem.parentNode.parentNode.classList.toggle("slider_active")
}
function openItemSlot(elem){
    elem.parentNode.classList.toggle("item-slot_active")
}