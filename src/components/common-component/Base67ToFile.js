export const base64ToImage = (base64String, fileName) => {
    // Split the base64 string to get mime type and the data
    const parts = base64String.split(';base64,');
    const mimeType = parts[0].split(':')[1];
    const imageData = parts[1];

    // Convert base64 to binary data
    const byteCharacters = atob(imageData);
    console.log('byteCharacters',byteCharacters);
    const byteNumbers = new Array(byteCharacters.length);
    console.log('byteNumbers',byteNumbers);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create Blob object from binary data
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a File object from Blob
    const imageFile = new File([blob], fileName, { type: mimeType });

    return imageFile;
}