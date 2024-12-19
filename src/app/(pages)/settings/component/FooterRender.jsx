export function renderFooter(footerData) {
    const {
        text,
        color,
        backgroundColor,
        font,
        size,
        height,
        width,
        textAlign,
        bold,
        italic,
        underline,
        paddingLeft,
        paddingRight,
        location,
        email,
        phone,
        layout,
    } = footerData;

    const style = {
        color,
        backgroundColor,
        fontFamily: font,
        fontSize: size,
        height,
        width,
        textAlign,
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
        paddingLeft,
        paddingRight,
        display: 'flex',
        flexDirection: layout === 'row' ? 'row' : 'column',
        justifyContent: layout === 'row' ? 'space-between' : 'center',
        alignItems: textAlign,
    };

    return (
        <div style={style} className="flex justify-center items-center">
            <div>{text || ''}</div>
            <div>{location || ''}</div>
            <div>
                <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {email || ''}
                </a>
            </div>
            <div>
                <a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {phone || ''}
                </a>
            </div>
        </div>
    );
}
