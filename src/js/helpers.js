export const root = document.getElementById('root');

export function sortInDescendingOrder(data, field = 'id') {
    return data.sort((a, b) =>  b[field] - a[field]);
}

export function formIsvalid(form) {
    const result = [...form.querySelectorAll('input, select, textarea')].some(input => input.value === '');

    return !result;
}

export function getAllInputValues(form) {
    const inputs = [...form.querySelectorAll('input, select, textarea')];

    const inputValues = inputs.reduce((values, currentInput) => {
        values[currentInput.name] = currentInput.value;
        return values;
    }, {});

    return inputValues;
}

export function excerpt(text) {
    if (text.length > 150) {
        return `${text.slice(0, 150)}...`;
    }

    return text;
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}