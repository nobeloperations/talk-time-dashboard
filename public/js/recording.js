window.onload = function () {
    let _chatContainer = document.querySelector('.meeting__chat')
    let _chatText = document.querySelector('.non__formatted__chat').textContent

    _chatText = _chatText.split(/\n\s*\n/).filter(_chatLine => !!_chatLine)
    _chatText.forEach(chatLine => {
        _chatLine = chatLine.split('\n')
        let [ _messageTime, ..._messages ] = chatLine
        _messageTime = _messageTime.slice(0, 8)
        if(_messages.length >= 2) {
            _messages = [_messages.join('\n')];
        }
        const _chatItem = document.createElement('div')
        _chatItem.className = 'chat__item'
        _chatItem.innerHTML = `
                <span class="chat__message">${_messages[0]}</span>
        `
        _chatContainer.appendChild(_chatItem)
    })
}
