class File {
    constructor(name, loaded, text) {
        this.name = name;
        this.loaded = loaded;
        this.text = text;
    }
}


class FileManager {
    constructor(){
        this.files = [];
    }
    AddFile(name,loaded,text){
        this.files.push(new File(name,loaded,text));
    }
    GetFiles(){
        return this.cards;
    }
    ReturnFileText(name){
        var data = {}
        this.files.forEach(file => {
            if (file.name == name){
                data = file
            }
        })
        return data
    }
}

export default FileManager;

