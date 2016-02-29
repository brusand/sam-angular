const COUNTER_MAX = 10 ;

var model = {};

model.present = function(data) {		
	state.render(model) ;
}


////////////////////////////////////////////////////////////////////////////////
// View
//
var view = {} ;

// Initial State
view.init = function(model) {
	return view.ready(model) ;
}

// State representation of the ready state
view.ready = function(model) {
	return (
			""
		) ;

}



//display the state representation
view.display = function(representation) {
	var stateRepresentation = document.getElementById("representation");
	stateRepresentation.innerHTML = representation;
}

// Display initial state
view.display(view.init(model)) ;



////////////////////////////////////////////////////////////////////////////////
// State
//
var state =  { view: view} ;

model.state = state ;

// Derive the state representation as a function of the systen
// control state
state.representation = function(model) {
	var representation = 'oops... something went wrong, the system is in an invalid state' ;
	state.view.display(representation) ;
}

// Derive the current state of the system
state.ready = function(model) {
	return ((model.counter === COUNTER_MAX) && !model.started && !model.launched && !model.aborted) ;
}

// Next action predicate, derives whether
// the system is in a (control) state where
// an action needs to be invoked

state.nextAction = function (model) {
}

state.render = function(model) {
	state.representation(model)
	state.nextAction(model) ;
}


////////////////////////////////////////////////////////////////////////////////
// Actions
//

var actions = {} ;

actions.init = function(data, present) {
	present = present || model.present ;
	data.started = true ;
	present(data) ;
	return false ;
}

