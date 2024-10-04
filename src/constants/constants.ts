export function generateRandomString(length: number) {
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


// utils/fileHelpers.ts

export const isImageFile = (url: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const extension = url?.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(extension as string);
};

export const isPDFFile = (url: string) => {
    const extension = url?.split('.').pop()?.toLowerCase();
    return extension === 'pdf';
};


export function convertTimestamp(createdAt: { seconds: any; nanoseconds: any; }) {
    const { seconds, nanoseconds } = createdAt;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date.toLocaleString(); // Returns the date in the local format
}

