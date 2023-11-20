function SendTags(data) {
    fetch("/sendtag", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => console.error(err));
}

document.querySelector('#sendtags').addEventListener('click', (event) => {
    event.preventDefault()
    let taglist = {
        tag_1: document.forms.GetTags.elements.tag_1.value,
        tag_2: document.forms.GetTags.elements.tag_2.value,
        tag_3: document.forms.GetTags.elements.tag_3.value,
    }
    document.querySelectorAll("input[type='text']").forEach(elem => {
        elem.setAttribute('disabled', 'disabled')
    })
    document.querySelector('#sendtags').innerHTML = 'Отправка...'
    document.querySelector('#sendtags').setAttribute('disabled', 'disabled')
    delay = getRandomInt(0, 50) * 100
    SendTags(taglist)
    setTimeout(() => {
        document.querySelectorAll("input[type='text']").forEach(elem => {
            elem.removeAttribute('disabled')
        })
        document.querySelector('#sendtags').innerHTML = 'Отправить'
        document.querySelector('#sendtags').removeAttribute('disabled')
    }, delay);

    document.forms.GetTags.reset()
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}