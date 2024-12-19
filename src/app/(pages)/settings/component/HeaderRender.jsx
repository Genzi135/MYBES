export const renderHeader = (headerData, userData) => {
    const {
        title,
        color,
        backgroundColor,
        font,
        size,
        height,
        textAlign,
        bold,
        italic,
        underline,
        verticalPosition,
        shadow,
        paddingLeft,
        paddingRight,
    } = headerData;

    const fontWeight = bold ? 'bold' : 'normal';
    const fontStyle = italic ? 'italic' : 'normal';
    const textDecoration = underline ? 'underline' : 'none';
    const textShadow = shadow ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : 'none';

    return (
        <div
            style={{
                backgroundColor,
                color,
                fontFamily: font,
                fontSize: size,
                height,
                fontWeight,
                fontStyle,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent:
                    textAlign === 'left'
                        ? 'flex-start'
                        : textAlign === 'right'
                            ? 'flex-end'
                            : 'center',
                position: 'relative',
                paddingLeft,
                paddingRight,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: verticalPosition,
                    transform: 'translateY(-50%)',
                    width: '100%',
                    textDecoration,
                    textAlign,
                    textShadow,
                }}
            >
                {title || userData?.name}
            </div>
        </div>
    );
};