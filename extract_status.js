const isURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

    return !!pattern.test(str)
}

const isValidActivity = activity => ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING'].includes(activity) || isURL(activity)

module.exports = () => Object.keys(process.env)
    .filter(status => status.startsWith('STATUS'))
    .map(status => process.env[status])
    .filter(status => isValidActivity(status.split(',')[0]))
    .map((status) => {
        const activity = { options: {} }
        const parsedStatus = status.split(',')
        const activityType = parsedStatus.shift()
        if (isURL(activityType)) activity.options.url = activityType
        else activity.options.type = activityType
        activity.name = parsedStatus.join(',')

        return activity
    })
