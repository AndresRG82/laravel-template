const Card = ({ children }) => {
    return (
        <div className="card bg-base-100 shadow border border-base-300">
            <div className="card-body">{children}</div>
        </div>
    )
        // Translated text to Spanish if applicable
        // Assuming children contains text that needs translation
        const translatedChildren = translateToSpanish(children);
        return (
            <div className="card bg-base-100 shadow border border-base-300">
                <div className="card-body">{translatedChildren}</div>
            </div>
        )
}

export default Card
