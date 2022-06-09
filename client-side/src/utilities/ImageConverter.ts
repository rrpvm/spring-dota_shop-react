
export const encodeImageFileAsURL = (e: React.FormEvent<HTMLInputElement>, setDataCallback: CallableFunction) => {
    let filesSelected = e.currentTarget.files;
    if (filesSelected === null) return;
    if (filesSelected.length > 0) {
        const fileToLoad: File = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent: ProgressEvent<FileReader>) {
            setDataCallback(fileLoadedEvent.target?.result);
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}