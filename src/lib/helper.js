export function parseTimestamp(data) {
    // Extract seconds and nanoseconds from data
    // Extract seconds and nanoseconds from data
    const seconds = data._seconds;
    const nanoseconds = data._nanoseconds;

    // Convert to milliseconds and create a Date object
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);

    // Format date as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function tiptapJSONToText(json) {
    let text = '';

    function traverse(node) {
        // If it's a text node, add the text content
        if (node.type === 'text') {
            text += node.text;
        } else if (node.content) {
            // If the node has children, traverse each child node
            node.content.forEach(child => traverse(child));
        }

        // Add spacing for block elements if necessary (e.g., paragraph, heading)
        if (node.type === 'paragraph' || node.type === 'heading') {
            text += '\n';
        }
    }

    traverse(json);
    return text.trim(); // Trim trailing spaces and newlines
}
