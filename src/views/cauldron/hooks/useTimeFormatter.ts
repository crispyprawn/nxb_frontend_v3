import dayjs from "dayjs"
export default function (
    unixTimeStamp: number,
    formatMode: "absolute" | "front_relative" | "reply_relative"
): string {
    const now = dayjs()
    const past = dayjs.unix(unixTimeStamp)
    if (formatMode === "absolute") {
        return past.format("YYYY-MM-DD HH:mm")
    } else if (formatMode === "front_relative") {
        const timeDifference = now.diff(past, "second")
        if (timeDifference < 0) {
            return "something wrong here"
        } else if (timeDifference < 60) {
            return `${timeDifference}秒前`
        } else if (timeDifference < 3600) {
            return `${now.diff(past, "minute")}分钟前`
        } else if (timeDifference < 86400) {
            return `${now.diff(past, "hour")}小时前`
        } else if (now.startOf("day").diff(past, "second") < 86400) {
            return past.format("[昨天]")
        } else if (now.startOf("day").diff(past, "second") < 172800) {
            return past.format("[前天]")
        } else if (past.year() === now.year()) {
            return past.format("M-D")
        } else {
            return past.format("YYYY-M-D")
        }
    } else {
        const timeDifference = now.diff(past, "second")
        if (timeDifference < 0) {
            return "something wrong here"
        } else if (timeDifference < 60) {
            return `${timeDifference}秒前`
        } else if (timeDifference < 3600) {
            return `${now.diff(past, "minute")}分钟前`
        } else if (past.date() === now.date()) {
            return past.format("[今天] HH:mm")
        } else if (now.startOf("day").diff(past, "second") < 86400) {
            return past.format("[昨天] HH:mm")
        } else if (now.startOf("day").diff(past, "second") < 172800) {
            return past.format("[前天] HH:mm")
        } else if (past.year() === now.year()) {
            return past.format("M-D HH:mm")
        } else {
            return past.format("YYYY-M-D HH:mm")
        }
    }
}
