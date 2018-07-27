class Http {

    static GET(url) {
        const fetchedData = fetch(url)
                                .then(response => response.json())
                                .catch(error => alert(error));
        return fetchedData;
    }

    static POST(url, formData) {
        const fetchedData = fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .catch(error => alert(error));

        return fetchedData;
    }
}

export default Http;