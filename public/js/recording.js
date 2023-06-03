window.onload = function () {
    let chatContainer = document.querySelector('.meeting__chat')
    let chatText = document.querySelector('.non__formatted__chat').textContent

    chatText = chatText.split(/\n\s*\n/).filter(chatLine => !!chatLine)
    chatText.forEach(chatLine => {
        chatLine = chatLine.split('\n')
        let [ messageTime, ...messages ] = chatLine
        messageTime = messageTime.slice(0, 8)
        if(messages.length >= 2) {
            messages = [messages.join('\n')];
        }
        const chatItem = document.createElement('div')
        chatItem.className = 'chat__item'
        chatItem.innerHTML = `
            <span class="chat__message">${messages[0]}</span>
        `
        chatContainer.appendChild(chatItem)
    })
}