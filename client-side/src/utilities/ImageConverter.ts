export const encodeImageFileAsURL = (e: React.FormEvent<HTMLInputElement>) : string => {
    let filesSelected = e.currentTarget.files;
    if(filesSelected === null) return "";
    if (filesSelected.length > 0) {
        const fileToLoad : File = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent : ProgressEvent<FileReader>) {
            if(fileLoadedEvent.currentTarget === null)return "";       
            return fileLoadedEvent.target?.result;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
    return "";//мы доходим до конца только в неблагоприятном случае
}