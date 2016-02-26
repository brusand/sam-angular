    class SamAction {
        constructor(public model) {
        }
        
        public init(data, present) {
            present = present || model.present ;
            return present(data);
        }
    }
    interface ISamModel {
          ready:boolean;  
          present(data:any):any;
    };
        
    class SamModel implements ISamModel{
        ready: boolean;
        model: any = this;
        constructor(public state) {
            this.model = this;
            this.model.ready = false;
        }
        public present(data) {
            if (!(typeof data.ready === 'undefined') ) model.ready = data.ready;
            return state.render(model)
        }
    } 
    class SamState {
        constructor(public view) {

        }
        
        compute(model) {
            if (this.ready(model)) return view.ready(model);
        }
        
        
        representation(model) {
            var representation = 'oops... something went wrong, the system is in an invalid state' ;

            if (this.ready(model)) {
                representation = view.ready(model) ;
            } 
            
            return representation ;
        } ;
        
        nextAction(model) {
            
        } ;
        
        public render(model) {
            return state.representation(model)
            //state.nextAction(model) ;
        }

        
        public ready(model) {
            return model.ready;
        }
        
    }
    class SamView {
        constructor() {          
        }
        
        // State representation of the ready state 
        ready(model) {
            return (
                    "<div>Sam ready " + model.ready + "</div>"
                );
        };
    }           
       

var view  = new SamView();
var state  = new SamState(view);
var model = new SamModel(state);
var actions  = new SamAction(model);

document.body.innerHTML =  actions.init({ready: true}, null);


