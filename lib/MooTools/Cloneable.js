var Clonable = new Class({
	clone: function(deep, recursion)
	{
		if(!recursion) Clonable.$clonedObjects = [this];
	
		var clone = this.$clone = {};
		
		for(var key in this)
		{
			if(key == '$clone' || key == 'caller' || key == '_current') continue;
			
			var value = this[key];

			if(value)
			{
				if(value.$clone)
				{
					value = value.$clone; //use available clone
				}
				else if(typeof value == 'object' && deep)
				{
					Clonable.$clonedObjects.push(value);
					value = this.clone.run([deep, true], value);
				}
			}
			
			clone[key] = value;
		}

		if(!recursion)
		{
			Clonable.$clonedObjects.each(function(obj) {
				if(typeof obj.$clone.cloneInitialize == 'function') obj.$clone.cloneInitialize(obj, deep);
				delete obj.$clone; //get rid of the clones' references in the original objects
			});
			delete Clonable.$clonedObjects;
		}
		
		return clone;
	}
});

module.exports = Clonable;