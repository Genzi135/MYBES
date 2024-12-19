'use client';

export default function BodyRender({ bodyData }) {
    return (
        <div className="space-y-4">
            {bodyData.map((component) => (
                <div key={component.id} className="p-4 border rounded mb-2 bg-gray-100" style={{ textAlign: component.alignment }}>
                    {component.type === 'title' && (
                        <h1
                            className="text-xl"
                            style={{
                                fontWeight: component.fontStyle.bold ? 'bold' : 'normal',
                                fontStyle: component.fontStyle.italic ? 'italic' : 'normal',
                                textDecoration: component.fontStyle.underline ? 'underline' : 'none',
                                fontSize: component.fontSize,
                            }}
                        >
                            {component.content}
                        </h1>
                    )}

                    {component.type === 'paragraph' && (
                        <p
                            style={{
                                fontWeight: component.fontStyle.bold ? 'bold' : 'normal',
                                fontStyle: component.fontStyle.italic ? 'italic' : 'normal',
                                textDecoration: component.fontStyle.underline ? 'underline' : 'none',
                            }}
                        >
                            {component.content}
                        </p>
                    )}

                    {component.type === 'image' && (
                        <img
                            src={component.content}
                            alt="Image"
                            style={{
                                width: `${component.imageWidth}px`,
                                height: `${component.imageHeight}px`,
                            }}
                            className="mx-auto"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
