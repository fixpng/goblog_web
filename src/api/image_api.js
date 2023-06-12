import {Service} from "@/services/service";

export function imageRenameApi(data) {
    return Service.put("/api/images", data)
}

export function imageNameListApi() {
    /*
    [{
            "id": 1,
            "path": "/uploads/file/checken_logo.png",
            "name": "checken_logo.png"
        }]
    */
    return Service.get("/api/image_names")
}


export function uploadImageApi(file) {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('image', file);
        Service.post("/api/image", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => resolve(res))
            .catch((error) => reject(error));
    })
}