'use client'
import { useState } from 'react';
import './style.css'

export default function UIDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [bodyComponents, setBodyComponents] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);

    // Define available components
    const componentOptions = [
        {
            id: 'blog-card',
            name: 'Blog Card',
            data: {
                title: 'Blog Title',
                description: 'Short blog description...',
                buttonText: 'Read More',
                width: '300px',
                height: 'auto',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
            },
        },
        {
            id: 'banner',
            name: 'Banner',
            data: {
                title: 'Welcome to My Site!',
                description: 'Explore amazing content here.',
                bgColor: '#1E40AF',
                textColor: '#FFFFFF',
                width: '100%',
                height: '200px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
            },
        },
        {
            id: 'text-block',
            name: 'Text Block',
            data: {
                content: 'This is a customizable text block. Add your content here.',
                width: '100%',
                height: 'auto',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
            },
        },
    ];

    // Add selected component to body
    const addComponentToBody = () => {
        if (selectedComponent) {
            setBodyComponents([...bodyComponents, selectedComponent]);
            setSelectedComponent(null); // Clear selected component
            setDrawerOpen(false); // Close drawer
        }
    };

    // Render selected component with updated data
    const renderComponent = (component) => {
        const { width, height, fontFamily, fontSize } = component.data;
        switch (component.id) {
            case 'blog-card':
                return (
                    `<div class="card" style="width: ${width}; height: ${height}; font-family: ${fontFamily}; font-size: ${fontSize};">
                        <h2>${component.data.title}</h2>
                        <p>${component.data.description}</p>
                        <button>${component.data.buttonText}</button>
                    </div>`
                );
            case 'banner':
                return (
                    `<div class="banner" style="background-color: ${component.data.bgColor}; color: ${component.data.textColor}; width: ${width}; height: ${height}; font-family: ${fontFamily}; font-size: ${fontSize};">
                        <h1>${component.data.title}</h1>
                        <p>${component.data.description}</p>
                    </div>`
                );
            case 'text-block':
                return (
                    `<div class="text-block" style="width: ${width}; height: ${height}; font-family: ${fontFamily}; font-size: ${fontSize};">
                        <p>${component.data.content}</p>
                    </div>`
                );
            default:
                return '';
        }
    };

    // Export HTML
    const exportHTML = () => {
        const exportContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Layout</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .card h2 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .card p {
      color: #666;
      margin-bottom: 12px;
    }
    .card button {
      background-color: #007bff;
      color: #fff;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .card button:hover {
      background-color: #0056b3;
    }
    .banner {
      padding: 24px;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .banner h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .banner p {
      font-size: 1rem;
    }
    .text-block {
      padding: 16px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .text-block p {
      color: #333;
    }
  </style>
</head>
<body>
  <main>
    ${bodyComponents.map((component) => renderComponent(component)).join('\n')}
  </main>
</body>
</html>`;

        const blob = new Blob([exportContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'export.html';
        link.click();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Button to Open Drawer */}
            <button
                onClick={() => setDrawerOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Drawer
            </button>

            {/* Drawer */}
            {drawerOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end">
                    <div className="w-96 bg-white shadow-lg h-full p-4">
                        <h2 className="text-lg font-bold mb-4">Choose & Edit Component</h2>
                        <ul className="space-y-2">
                            {componentOptions.map((component) => (
                                <li key={component.id}>
                                    <button
                                        onClick={() => setSelectedComponent({ ...component })}
                                        className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                                    >
                                        {component.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Component Editor */}
            {selectedComponent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="w-96 bg-white shadow-lg p-6 rounded">
                        <h2 className="text-lg font-bold mb-4">Edit {selectedComponent.name}</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Width</label>
                            <input
                                type="text"
                                value={selectedComponent.data.width}
                                onChange={(e) =>
                                    setSelectedComponent({
                                        ...selectedComponent,
                                        data: { ...selectedComponent.data, width: e.target.value },
                                    })
                                }
                                placeholder="Width (e.g. 300px)"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Height</label>
                            <input
                                type="text"
                                value={selectedComponent.data.height}
                                onChange={(e) =>
                                    setSelectedComponent({
                                        ...selectedComponent,
                                        data: { ...selectedComponent.data, height: e.target.value },
                                    })
                                }
                                placeholder="Height (e.g. auto)"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Font Family</label>
                            <input
                                type="text"
                                value={selectedComponent.data.fontFamily}
                                onChange={(e) =>
                                    setSelectedComponent({
                                        ...selectedComponent,
                                        data: { ...selectedComponent.data, fontFamily: e.target.value },
                                    })
                                }
                                placeholder="Font Family"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Font Size</label>
                            <input
                                type="text"
                                value={selectedComponent.data.fontSize}
                                onChange={(e) =>
                                    setSelectedComponent({
                                        ...selectedComponent,
                                        data: { ...selectedComponent.data, fontSize: e.target.value },
                                    })
                                }
                                placeholder="Font Size (e.g. 16px)"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={addComponentToBody}
                            className="w-full px-4 py-2 bg-green-500 text-white rounded mb-4"
                        >
                            Add Component
                        </button>
                        <button
                            onClick={() => setSelectedComponent(null)}
                            className="w-full px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Display Components */}
            <div className="space-y-6">
                {bodyComponents.map((component, index) => (
                    <div
                        key={index}
                        className="border rounded p-4 bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: renderComponent(component) }}
                    />
                ))}
            </div>

            {/* Export Button */}
            <button
                onClick={exportHTML}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Export HTML
            </button>
        </div>
    );
}
