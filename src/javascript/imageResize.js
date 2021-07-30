function imageResize(e, w, recipeImgs, linksArr, patchArr){
    if(e.target.files.length === 0){
        return
    }
    let width = w;
    if(patchArr){
        if(e.target.files.length > 1){
            for(let i = 0; i < e.target.files.length; i++){
                let fileName = e.target.files[i].name;
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i]);
                reader.onload = event => {
                    let img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        let elem = document.createElement('canvas');
                        elem.width = width;
                        let scaleFactor = width / img.width;
                        elem.height = img.height * scaleFactor;
                        let ctx = elem.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                        ctx.canvas.toBlob((blob) => {
                            let file = new File([blob], fileName, {
                                type: 'image/',
                                lastModified: Date.now()
                            });
                            if(e.target.files[i].size < file.size){
                                recipeImgs.push({
                                    imgId: 'none',
                                    file: e.target.files[i],
                                    imgLink: URL.createObjectURL(e.target.files[i])
                                })
                                patchArr.push({
                                    id: 'none',
                                    file: e.target.files[i]
                                })
                            }else{
                                recipeImgs.push({
                                    imgId: 'none',
                                    file: file,
                                    imgLink: URL.createObjectURL(file)
                                })
                                patchArr.push({
                                    id: 'none',
                                    file: file
                                })
                            }
                        }, 'image/jpeg', 1);
                    },
                    reader.onerror = error => console.log(error);
                }
            }
            return
        }
        let fileName = e.target.files[0].name;
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = event => {
                let img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let elem = document.createElement('canvas');
                    elem.width = width;
                    let scaleFactor = width / img.width;
                    elem.height = img.height * scaleFactor;
                    let ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                    ctx.canvas.toBlob((blob) => {
                        let file = new File([blob], fileName, {
                            type: 'image/',
                            lastModified: Date.now()
                        });
                        if(e.target.files[0].size < file.size){
                            recipeImgs.push({
                                imgId: 'none',
                                file: e.target.files[0],
                                imgLink: URL.createObjectURL(e.target.files[0])
                            })
                            patchArr.push({
                                id: 'none',
                                file: e.target.files[0]
                            })
                        }else{
                            recipeImgs.push({
                                imgId: 'none',
                                file: file,
                                imgLink: URL.createObjectURL(file)
                            })
                            patchArr.push({
                                id: 'none',
                                file: file
                            })
                        }
                    }, 'image/jpeg', 1);
                },
            reader.onerror = error => console.log(error);
        }
        return
    }
    if(e.target.files.length > 1){
        for(let i = 0; i < e.target.files.length; i++){
            let fileName = e.target.files[i].name;
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = event => {
                let img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let elem = document.createElement('canvas');
                    elem.width = width;
                    let scaleFactor = width / img.width;
                    elem.height = img.height * scaleFactor;
                    let ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                    ctx.canvas.toBlob((blob) => {
                        let file = new File([blob], fileName, {
                            type: 'image/',
                            lastModified: Date.now()
                        });
                        if(e.target.files[i].size < file.size){
                            recipeImgs.push(e.target.files[i]) 
                        }else{
                            recipeImgs.push(file)
                        }
                        linksArr.push(URL.createObjectURL(file))
                    }, 'image/jpeg', 1);
                },
                reader.onerror = error => console.log(error);
            }
        }
        return
    }
    let fileName = e.target.files[0].name;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = event => {
        let img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            let elem = document.createElement('canvas');
            elem.width = width;
            let scaleFactor = width / img.width;
            elem.height = img.height * scaleFactor;
            let ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
            ctx.canvas.toBlob((blob) => {
                let file = new File([blob], fileName, {
                    type: 'image/',
                    lastModified: Date.now()
                });
                if(e.target.files[0].size < file.size){
                    recipeImgs = e.target.files[0]
                }else{
                    recipeImgs = file
                }
                linksArr = URL.createObjectURL(file)
            }, 'image/jpeg', 1);
        },
        reader.onerror = error => console.log(error);
    }
}

export { imageResize }