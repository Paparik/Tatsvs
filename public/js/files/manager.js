class FilesManager {
    files;
    extensions;
    constructor(extensions) {
        this.extensions = extensions;
        this.files = [];
    }

    selectFiles() { 
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            if(this.extensions){
                input.multiple = false;
                input.accept="image/*";
            }
            else input.multiple = true;
            input.onchange = () => {
                if (input.files.length > 20) {
                    $.notify("Ошибка. Вы не можете загрузить более 20-ти файлов", { type:"toast" });
                    input.value = '';
                    return;
                }
                Array.from(input.files).forEach(file => {
                    if (file.size > (20 * 1024 * 1024)) {
                        $.notify(`Размер файла ${file.name} превышает 20-ти мегабайт`, { type:"toast" });
                        input.value = '';
                    }
                });
                this.files = Array.from(input.files);
                resolve(this.files);
            };
            input.click();
        });
    }
}