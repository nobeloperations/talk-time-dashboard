window.onload = function () {
    let _chatContainer = document.querySelector('.meeting__chat')
    let _chatText = document.querySelector('.non__formatted__chat').innerText

    _chatText = _chatText.split(/\n\s*\n/).filter(_chatLine => !!_chatLine)
    _chatText.forEach(_chatLine => {
        _chatLineFormatted = _chatLine.split('\n')
        let _messageTime = _chatLineFormatted[0]
        let _message = _chatLineFormatted[1]
        _messageTime = _messageTime.slice(0, 8)
        const _chatItem = document.createElement('div')
        _chatItem.className = 'chat__item'
        _chatItem.innerHTML = `
                <span class="chat__message">${_messageTime}</span><br/>
                <span class="chat__message">${_message}</span>
        `
        _chatContainer.appendChild(_chatItem)
    })
}
