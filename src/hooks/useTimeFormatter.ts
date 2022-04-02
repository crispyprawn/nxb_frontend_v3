import dayjs from "dayjs"
export default function (
    unixTimeStamp: number,
    usage:
        | "cauldron_front_post"
        | "cauldron_detail_post"
        | "cauldron_detail_reply"
        | "message_front_dialog"
        | "message_detail_paragraph"
        | "old_nxb"
): string {
    const now = dayjs()
    const past = dayjs.unix(unixTimeStamp)
    const timeDifference = now.diff(past, "second")
    const todayStart = now.startOf("day")
    switch (usage) {
        case "cauldron_front_post": {
            if (timeDifference < 0) {
                return "something wrong here"
            } else if (timeDifference < 60) {
                return `${timeDifference}秒前`
            } else if (timeDifference < 3600) {
                return `${now.diff(past, "minute")}分钟前`
            } else if (timeDifference < 86400) {
                return `${now.diff(past, "hour")}小时前`
            } else if (todayStart.diff(past, "day") < 1) {
                return past.format("[昨天]")
            } else if (todayStart.diff(past, "day") < 2) {
                return past.format("[前天]")
            } else if (past.year() === now.year()) {
                return past.format("M-D")
            } else {
                return past.format("YYYY-M-D")
            }
        }
        case "cauldron_detail_post": {
            return past.format("YYYY-MM-DD HH:mm")
        }
        case "cauldron_detail_reply": {
            if (timeDifference < 0) {
                return "something wrong here"
            } else if (timeDifference < 60) {
                return `${timeDifference}秒前`
            } else if (timeDifference < 3600) {
                return `${now.diff(past, "minute")}分钟前`
            } else if (past.date() === now.date()) {
                return past.format("[今天] HH:mm")
            } else if (todayStart.diff(past, "day") < 1) {
                return past.format("[昨天] HH:mm")
            } else if (todayStart.diff(past, "day") < 2) {
                return past.format("[前天] HH:mm")
            } else if (past.year() === now.year()) {
                return past.format("M-D HH:mm")
            } else {
                return past.format("YYYY-M-D HH:mm")
            }
        }
        case "old_nxb": {
            if (timeDifference < -86400) {
                return past.format("YYYY-MM-DD HH:mm")
            } else if (timeDifference < -3600) {
                return `${now.diff(past, "hour")}小时后`
            } else if (timeDifference < -60) {
                return `${now.diff(past, "minute")}分钟后`
            } else if (timeDifference < 0) {
                return `${timeDifference}秒后`
            } else if (timeDifference < 60) {
                return `${timeDifference}秒前`
            } else if (timeDifference < 3600) {
                return `${now.diff(past, "minute")}分钟前`
            } else if (past.date() === now.date()) {
                if (past.hour() < 2) {
                    return past.format("[深夜] HH:mm")
                } else if (past.hour() < 6) {
                    return past.format("[凌晨] HH:mm")
                } else if (past.hour() < 12) {
                    return past.format("[上午] HH:mm")
                } else if (past.hour() < 14) {
                    return past.format("[中午] HH:mm")
                } else if (past.hour() < 19) {
                    return past.format("[下午] HH:mm")
                } else if (past.hour() < 23) {
                    return past.format("[晚上] HH:mm")
                } else {
                    return past.format("[深夜] HH:mm")
                }
            } else if (todayStart.diff(past, "day") < 1) {
                return past.format("[昨天] HH:mm")
            } else if (todayStart.diff(past, "day") < 2) {
                return past.format("[前天] HH:mm")
            } else if (todayStart.diff(past, "day") < 31) {
                return past.format(`${todayStart.diff(past, "day")}天前`)
            } else if (todayStart.diff(past, "day") < 365) {
                return past.format(`${todayStart.diff(past, "month")}个月前`)
            } else {
                return past.format(`${todayStart.diff(past, "year")}年前`)
            }
        }
        default: {
            return past.format("YYYY-MM-DD HH:mm")
        }
    }
}
