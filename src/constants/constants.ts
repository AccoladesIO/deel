export function generateRandomString (length: number) {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function formatFileSize(sizeInBytes: number) {
    if (sizeInBytes < 1024) {
        return sizeInBytes + "B";
    } else if (sizeInBytes < 1024 * 1024) {
        return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    }
}
