var errorMessages = {};

function loadErrorMessages( formErrorMessages ) {
	
	errorMessages = formErrorMessages;
	
} 

function form( formID ) {
	
	this.formID = formID;
	this.fields = [];
	this.validateForm = function() {
		
		var returnValue = true;
		
		//validate every field
		for ( var j= (this.fields.length - 1 ); j>=0; j-- ) {
			
			this.fields[j].validate();
			
			if ( this.fields[j].status === "valid" && returnValue ) {
			
				returnValue = true;
			
			} else {
			
				returnValue = false;
			
			}
			
		}
		
		return returnValue;

	};
	this.resetForm = function() {
		
		for ( k=0; k<window[formID].fields.length; k++ ) {
		
			window[formID].fields[k].applyNeutralStyle();
			$('#'+window[formID].fields[k].id).val("");
			window[formID].fields[k].errors = [];
			window[formID].fields[k].refreshErrorMessages();
			
		}
				
	};
	this.getFieldObject = function ( fieldID ) {
	
		for ( var k=0; k<this.fields.length; k++ ) {
			
			if ( this.fields[k].id === fieldID ) {
			
				return this.fields[k];
			
			}
			
		}
		
		return false; //if the field doesn't exist then return false
			
	};
	this.loadInput = function( inputs ) {
		
		window[this.formID] = this; //save the parent object context for future reference
		
		$( inputs ).each(function( counter ) {
			
			//create an object for each field
			fieldObj = {
					
				id: inputs[counter].id,
				status: "untested",
				errors: [],
				validate: inputs[counter].validate,
				setStatus: function( newStatus ) {
					
					this.status = newStatus;
					
				},
				addError: function ( errorCode ) {
					
					index = $.inArray( errorCode, this.errors );
					
					if ( ! (index > -1) ) {
					
						this.errors.push( errorCode );
					
					}
					this.refreshErrorMessages();
					
				},
				removeError: function ( errorCode ) {
					
					index = $.inArray( errorCode, this.errors );
					
					if ( index > -1 ) {
						this.errors.splice(index, 1);
						this.refreshErrorMessages();
					}
					
				},
				refreshErrorMessages: function () {
					
					$("#" + this.id + "-error-container").remove();
					
					if ( this.errors.length > 0 ) {
						
						if ( this.id !== "recaptcha_response_field" ) {
									
							$("#" + this.id ).before( getFieldErrorContainerHTML( this.id ) );
							
						} else {
																
							$("#" + this.id ).siblings("label").append( getFieldErrorContainerHTML( this.id ) );
						
						}
						
						for ( i=0; i<this.errors.length; i++ ) {
								
							$("#" + this.id + "-error-container").append('<li class="red">' + errorMessages[this.errors[i]] +'</li>');
							
						}
					}
				},
				applyErrorStyle: function() {
					$("#"+this.id).parent().removeClass( "has-success has-warning" );
					$("#"+this.id).parent().addClass( "has-error" );
					$("#"+this.id).siblings("label").children("span.glyphicon").remove();
					$("#"+this.id).siblings("label").prepend( '<span class="glyphicon glyphicon-asterisk error-icon"></span> ' );
				},
				applySuccessStyle: function() {
					$("#"+this.id).parent().removeClass( "has-error has-warning" );
					$("#"+this.id).parent().addClass( "has-success" );
					$("#"+this.id).siblings("label").children("span.glyphicon").remove();
					$("#"+this.id).siblings("label").prepend( '<span class="glyphicon glyphicon-ok success-icon"></span> ' );
				},
				applyNeutralStyle: function() {
					$("#"+this.id).parent().removeClass( "has-error has-warning has-success" );
					$("#"+this.id).siblings("label").children("span.glyphicon").remove();
				}				
			}
			
			//add the field object to the form object's field array
			window[formID].fields.push(fieldObj);
			
			//create field-level validation trigger
			$( '#' + inputs[counter].id ).change(function( event, systemInvoked ){
				
				//systemInvoked is used to prevent infinite loops when a change in one field necessitates validating another field (ie, the password fields and email address fields)
				if ( systemInvoked === "systemInvoked" ) {
				
					window[formID].fields[counter].validate("systemInvoked");
								
				} else {
				
					window[formID].fields[counter].validate();
				}
			
			});
		
		});
		
	};
}


function getFieldErrorContainerHTML( fieldID ){
		
	var containerHTML = '<ul id="' + fieldID + '-error-container"></ul>';
	
	return containerHTML;

};

function adjustUI ( caller, neutralFlag ) {

	var htmlID = caller.id;

	if ( caller.status === "invalid" ) {
				
		caller.applyErrorStyle();
		//setTimeout is needed so focus() works properly in Firefox
		setTimeout(function() {
			$("#"+htmlID).focus();
		}, 0);
		$("#"+htmlID).select();
		
	} else {
	
		caller.setStatus( "valid" );
		
		if ( neutralFlag ) {
		 
			caller.applyNeutralStyle();
		 
		} else {
		 
			caller.applySuccessStyle();
		
		}
		
	}

};