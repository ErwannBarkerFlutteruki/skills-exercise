
const parser = (rawData: string) => JSON.parse(rawData)

const stringify = (obj: unknown) => JSON.stringify(obj)

const convertTime = (timeStamp: string) => {
    const time = new Date(timeStamp)
    const hours = time.getHours()
    const mins = time.getMinutes()

    return {
        hours,
        mins
    }
}

export {
    parser,
    stringify,
    convertTime
}