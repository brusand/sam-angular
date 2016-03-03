/// <reference path="sam.view.ts"/>;

export class SamState {
    constructor(public view) {

    }

    representation(model) {
        var representation = 'oops... something went wrong, the system is in an invalid state' ;

        return this.view.display(representation) ;
    } ;
    
    nextAction(model) {} ;
    
    render(model) {
        this.representation(model)
        this.nextAction(model) ;
    }
}
