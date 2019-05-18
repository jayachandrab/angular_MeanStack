export class GlobalApp {

    constructor() {}
    
    public localStorageItem(session: any): any {
            console.log('calling global class');
        let temp:any=localStorage.getItem(session);
        let temp2=JSON.parse(temp);

        return temp2;
    }
}