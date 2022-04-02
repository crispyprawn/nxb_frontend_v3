import dayjs from "dayjs"
export default function (): void {
    const before = dayjs("2022-2-21")
    const after = dayjs("2022-2-21").second(5)
    const beforeAfter = before.diff(after, "seconds")
    const afterBefore = after.diff(before, "seconds")
    console.log(beforeAfter)
    console.log(afterBefore)
}
