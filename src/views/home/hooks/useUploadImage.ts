export default function (btn, to_input) {
    if (!NineImage[to_input]) {
        NineImage[to_input] = [];
    }
    if (NineImage[to_input].length < 8) {
        let new_image = document.createElement("div");
        upload_once(new_image, "", (data) => {
            $(btn).before(new_image);
            NineImage[to_input].push(data);
            $("#" + to_input).val(JSON.stringify(NineImage[to_input])).change();
        });
    } else {
        upload_once(btn, "", (data) => {
            NineImage[to_input].pop();
            NineImage[to_input].push(data);
            $("#" + to_input).val(JSON.stringify(NineImage[to_input])).change();
        });
    }
}