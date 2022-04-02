export default function (sexualOrientationCode: number): string {
    switch (sexualOrientationCode) {
        case 1:
            return "男"
        case 2:
            return "女"
        case 3:
            return "保密"
        default:
            return "未知"
    }
}
