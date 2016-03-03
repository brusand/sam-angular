/// <reference path="sam.model.ts"/>;

    export class SamAction {
        constructor(public model) {
        }
        
        public init(data, present) {
            present = present || this.model.present ;
            return present(data);
        }
    }

