export default function (genderCode: number): string {
    switch (genderCode) {
        case 1:
            return "男"
        case 2:
            return "女"
        case 3:
            return "男(跨性别)"
        case 4:
            return "女(跨性别)"
        case 5:
            return "保密"
        default:
            return "未知"
    }
}
