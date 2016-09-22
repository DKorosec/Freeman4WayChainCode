class Freeman4WayChainCode
{
	constructor(binary2dMatrix /*2D array boolean array where "True" value means black pixel*/) 
	{
		this.CC = { //ChainCode enum
			RIGHT : 0,
			DOWN : 1,
			LEFT : 2,
			UP : 3
		};
		this.mat = binary2dMatrix;
		this.W = this.mat[0].length; //width of matrix
		this.H = this.mat.length; //height of matrix
	}
	
	static ChainCodeToVector(code)
	{
		function vec2(x,y){ return {x,y}; }
		return [vec2(1,0),vec2(0,1),vec2(-1,0),vec2(0,-1)][code];
	}
		
	pixAt(x,y)
	{
		if(y >= this.mat.length || x >= this.mat[0].length || x < 0 || y < 0)
			return false;
		return this.mat[y][x];
	}
	
	_scanForStart() //scans for the the most upper left existing corner of the image, else null
	{
		for(var y=0;y<this.H;y++)
		{
			for(var x=0;x<this.W;x++)
			{
				if(this.pixAt(x,y))
					return {x,y};
			}
		}
		return null;
	}
	_nextMove(prevDir,pos) //based on previous direction and current position, find the next direction.
	{
		
		var CC = this.CC;
		switch(prevDir)
		{
			case CC.RIGHT:
				if(this.pixAt(pos.x+1,pos.y-1))
				{
					pos.y--;
					pos.x++;
					return CC.UP;
				}
				if(this.pixAt(pos.x+1,pos.y))
				{
					pos.x++;
					return  CC.RIGHT;
				}
				return CC.DOWN; //we stay on the same pixel!
			case CC.DOWN:
				if(this.pixAt(pos.x+1,pos.y+1))
				{
					pos.y++;
					pos.x++;
					return CC.RIGHT;
				}
				if(this.pixAt(pos.x,pos.y+1))
				{
					pos.y++;
					return  CC.DOWN;
				}
				return CC.LEFT; //we stay on the same pixel!
			case CC.LEFT:
				if(this.pixAt(pos.x-1,pos.y+1))
				{
					pos.y++;
					pos.x--;
					return CC.DOWN;
				}
				if(this.pixAt(pos.x-1,pos.y))
				{
					pos.x--;
					return CC.LEFT;
				}
				return CC.UP; //we stay on the same pixel!
			case CC.UP:
				if(this.pixAt(pos.x-1,pos.y-1))
				{
					pos.y--;
					pos.x--;
					return CC.LEFT;
				}
				if(this.pixAt(pos.x,pos.y-1))
				{
					pos.y--;
					return  CC.UP;
				}
				return CC.RIGHT; //we stay on the same pixel!
		}
	}
	getChain() //the execution method which returns 
	{
		var vecEq = (v1,v2) => v1.x == v2.x && v1.y == v2.y;
		var CC = this.CC;
		var chain = [];
		chain.last = function(){ return this[this.length-1]; }
		chain.first = function() { return this[0];}
		var start = this._scanForStart();
		if(start == null)
			throw "Blank or invalid image!";
		var pos = {x: start.x, y:start.y};
		
		chain.push(CC.RIGHT);
		while(true)
		{
			var newDir = this._nextMove(chain.last(),pos); 
			if(vecEq(pos,start) && newDir == chain.first())
				break; //
			chain.push(newDir);
		}
		return {start, chain};
	}
}