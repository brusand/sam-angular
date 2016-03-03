
/// <reference path="sam.state.ts"/>;
export interface ISamModel {
    present(data:any):any;
};
    
export class SamModel implements ISamModel{
    model: any;
    constructor(public state) {
        this.model = this;
    }
    present(data) {
        this.model = data;
        return this.state.render(this.model)
    }
}    
