function truncate(fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) + 
           separator + 
           fullStr.substr(fullStr.length - backChars);
}



const originalFetch = window.fetch;
window.fetch = async (...args) => {
    console.log('HTTP Request:', args);
    const response = await originalFetch(...args);
    const clone = response.clone();

    let body;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        body = await clone.json();
    } else if (contentType && contentType.includes("text")) {
        body = await clone.text();
    } else if (contentType && (contentType.includes("image") || contentType.includes("audio") || contentType.includes("video") || contentType.includes("application/octet-stream"))) {
        body = await clone.blob();
    } else {
        body = 'Unable to parse body content';
    }

    console.log('HTTP Response:', response, 'Body:', body);
    return response;
};
