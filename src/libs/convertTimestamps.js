const convertDate = (timestamp) => {
    const dateFormat = new Date(timestamp);
    return {
        date: dateFormat.toDateString(),
        time: dateFormat.toTimeString()
    }
}

console.log(convertDate(1589472546))

module.exports = convertDate