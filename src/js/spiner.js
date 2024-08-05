export default class SpinerServise {
    constructor(spinerEl){
        this.spinerEl = spinerEl;
    }

    hide(){
        this.spinerEl.style.display = 'none';
    }

    show(){
        this.spinerEl.style.display = 'block';
    }
}