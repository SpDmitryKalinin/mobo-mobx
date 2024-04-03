const Message: React.FC = () => {
    return (
        <div className='message'>
            <h1 className='message__title'>кликните на мебель, чтобы изменить её</h1>
            <svg width="226" height="225" viewBox="0 0 226 225" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.886 0C224.886 32.2168 237.322 218 2 218" stroke="#767676" strokeDasharray="10 10"/>
                <path d="M7 224L1 217.5L7 211" stroke="#767676"/>
            </svg>
        </div>
    )
}

export default Message;