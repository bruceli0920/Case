var game={
	data:[[0,0,0,0],
		  [0,0,0,0],
		  [0,0,0,0],
		  [0,0,0,0]
	],
	score:0,/*保存分数*/
	RUNNING:1,//运行状态
	GAME_OVER:0,//游戏结束
	state:1, //保存当前游戏状态
	isFull:function(){
		var str=this.data.toString();
		return str.indexOf("0")!=-1?false:true;
	},
	/*在数组任意空白位置中随机生成一个2或4*/
	randomNum:function(){
		if(!this.isFull()){//只有不满，才生成随机数
		while(true){
			//Step1: var row=随机生成行下标: 0-3随机
			var row=Math.floor(Math.random()*4);
			//Step2：var col=随机生成列下标: 0-3随机
			var col=Math.floor(Math.random()*4);
			//Step3：如果this.data[row][col]==0
			if(this.data[row][col]==0){
				//才放入一个随机数：2或4
				this.data[row][col]=Math.random()<0.5?2:4;
				//放入后，退出循环
				break;
			}
			//Step4：否则重新循环执行Step1
		}
		}
	},
	/*将data数组中的数字，更新到界面的单元格中*/
	updateView:function(){
		/*遍历二维数组中每个元素*/
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				//Step1:找到页面中和当前元素对应的div
				var id="c"+row+col;
				var div=document.getElementById(id);
				var n=this.data[row][col];
				//Step2:如果元素值!=0，
				if(n!=0){
					div.innerHTML=n;//才将元素值放入div中
				    //Step3:在单元格的class属性后追加nXX
					div.className="cell n"+n;
			//等效于html class属性
				}else{//Step4:如果元素值==0
					div.innerHTML=""; //清空div的内容
					//还原div的class属性为cell
					div.className="cell";
				}
			}
		}
		/*将分数更新到页面span元素中*/
		var span=document.getElementById("score");
		span.innerHTML=this.score;

		this.gameOver();//判断游戏结束
		//如果游戏结束，弹出game over
		if(this.state==this.GAME_OVER){
			var score=document.getElementById("finalScore");
			score.innerHTML=this.score;
			var div=document.getElementById("gameOver");
			div.style.display="block";
		}else{
			var div=document.getElementById("gameOver");
			div.style.display="none";
		}
	},
	/*游戏启动方法*/
	start:function(){
		//Step1: 初始化data数组
		this.data=[[0,0,0,0],
		  [0,0,0,0],
		  [0,0,0,0],
		  [0,0,0,0]
				  ];
		this.score=0;//分数归零
		//每次游戏启动都要重新设置回RUNNING
		this.state=this.RUNNING; 
		//Step2: 调用2次随机数方法
		this.randomNum();
		this.randomNum();
		//Step3: 更新页面数据
		this.updateView();
	},
	
	/*左移*/
	moveLeft:function(){
		if(this.canLeft()){
			//循环this.data的每一行
			for(var row=0;row<this.data.length;row++){
			//    每行调用一次moveLeftInRow方法
			//    调用时，传入行下标作为参数
				this.moveLeftInRow(row);
			}
			this.randomNum();
			//刷新页面
			this.updateView();
		}
	},
	/*左移1行
	  row: 要移动的行下标*/
	moveLeftInRow:function(row){
		//从0开始，遍历第row行的每个元素
		for(var col=0;col<this.data[row].length-1;col++){
		//      获得当前位置后，下一个不为0的数的位置    
			var nextCol=this.getNextRight(row,col);
		    if(nextCol==-1){//如果nextCol为-1，则退出循环
				break;
			}else{//否则：如果当前位置值为0:
				if(this.data[row][col]==0){
		//			用nextCol位置的值，替换当前位置
	this.data[row][col]=this.data[row][nextCol];
		//          将nextCol位置的值，换为0
					this.data[row][nextCol]=0;
					col--;//让col留在原地
				}else{//否则，
		//              如果当前位置值==nextCol位置的值
					if(this.data[row][col]==
						this.data[row][nextCol]){
		//              将当前位置的值*2
						this.data[row][col]*=2;
					//累加后的单元格数值为累加的分数
						this.score+=this.data[row][col];
		//              将nextCol位置的值换为0
						this.data[row][nextCol]=0;
					}
				}
			}
		}
	},
	/*从col位置开始，找右侧下一个不为0的数*/
	getNextRight:function(row,col){
		//Step1: 从row行的col位置之后开始，
		//       遍历row行剩余元素
		for(var i=col+1;i<this.data[row].length;i++){
		      //如果发现任意位置的值!=0
			  if(this.data[row][i]!=0){
				return i//返回i
			  }
		}
		//Step2: 返回-1
		return -1;
	},
	/*检查所有元素是否可以左移*/
	canLeft:function(){
		for(var row=0;row<this.data.length;row++){
			/*排除第一列的元素*/
			for(var col=1;col<this.data[row].length;col++){
				var n=this.data[row][col];//当前元素
				var prev=this.data[row][col-1];//左侧元素
				/*如果当前元素!=0，才有必要检查*/
				if(n!=0){
					/*左侧元素==0，或左侧元素==当前元素*/
					if(prev==0||n==prev){
						return true;
					}
				}
			}
		}
		return false;
	},
	/*遍历并右移所有行*/
	moveRight:function(){
		if(this.canRight()){
		//循环遍历所有行
		for(var row=0;row<this.data.length;row++){
		//     调用moveRightInRow方法，传入行下标作为参数
			this.moveRightInRow(row);
		}
		//随机生成一个数
		this.randomNum();
		//更新页面
		this.updateView();
		}
	},
	moveRightInRow:function(row){
		//从row行最右侧元素开始，*向左*遍历每个元素
		for(var col=this.data[row].length-1;col>0;col--){
		//                        排除最左侧元素
		//     从当前元素向左获得第一个!=0的数的nextCol
			   var nextCol=this.getNextLeft(row,col);
		//     如果nextCol==-1,退出循环
				if(nextCol==-1){
					break;
				}else{//否则,如果当前数==0
					if(this.data[row][col]==0){
		//			用nextCol的数，替换当前位置
		this.data[row][col]=this.data[row][nextCol];
		//			将nextCol的数，换为0
						this.data[row][nextCol]=0;
		//			当前col位置保持不变
						col++;
					}else if(this.data[row][col]==
								this.data[row][nextCol]){
		//		否则，如果nextCol的数和当前数相等
		//		       将当前数*=2
						this.data[row][col]*=2;
						//累加后的单元格数值为累加的分数
						this.score+=this.data[row][col];
		//             将nextCol换为0
						this.data[row][nextCol]=0;
					}
				}
		}
	},
	/*从当前位置左侧开始，找下一个!=0的数*/
	getNextLeft:function(row,col){
		//从当前位置左侧开始，向左遍历剩余元素
		for(var i=col-1;i>=0;i--){
		//      如果遍历到的元素!=0
			if(this.data[row][i]!=0){
				return i
			}
		}
		//退出循环，
		return -1;
	},
	/*检查是否可以向右移动*/
	canRight:function(){
		//遍历二维数组，排除最右侧一列
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length-1;col++){
				//获得当前元素右侧相邻元素
				var n=this.data[row][col];
				//如果当前元素!=0
				if(n!=0){
					var next=this.data[row][col+1];
				//如果相邻元素==0，或相邻元素==当前元素
					if(next==0||next==n){
						return true
					}
				}
			}
		}
		return false;
	},
	/*将每一列上移*/
	moveUp:function(){
		if(this.canUp()){
			//遍历每一列: 遍历第一行的元素个数
			for(var col=0;col<this.data[0].length;col++){
				this.moveUpInCol(col);
			}
			this.randomNum();
			this.updateView();
		}
	},
	moveUpInCol:function(col){
		//遍历一列中的每一行，排除最后一行
		for(var row=0;row<this.data.length-1;row++){
			//查找当前位置下方第一个!=0的数的行下标
			var nextRow=this.getNextDown(row,col);
			if(nextRow==-1){
				break;
			}else{//如果当前值==0
				if(this.data[row][col]==0){
		//用下边行的值，替换当前行的值
		this.data[row][col]=this.data[nextRow][col];
		            //将下边行的值换为0
					this.data[nextRow][col]=0;
					row--;//保持行下标位置不变
				}else{//如果下边行的值==当前值
					if(this.data[nextRow][col]==
									this.data[row][col]){
						//当前值*=2;
						this.data[row][col]*=2;
						//累加后的单元格数值为累加的分数
						this.score+=this.data[row][col];
						//下边行的值，换为0
						this.data[nextRow][col]=0;
					}
				}
			}
		}
	},
	//从当前位置向下，找第一个!=0的数的行下标
	getNextDown:function(row,col){
		//从当前行下方开始，遍历当前列的剩余行
		for(var i=row+1;i<this.data.length;i++){
			if(this.data[i][col]!=0){
				return i;
			}
		}
		return -1;
	},
	/*检查是否可以上移*/
	canUp:function(){
		/*排除第一行*/
		for(var row=1;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				//获得当前元素
				var n=this.data[row][col];
				//获得上方相邻元素
				var up=this.data[row-1][col];
				//如果当前元素!=0
				if(n!=0){
				//	如果上方元素==0||当前元素==上方元素
					if(up==0||up==n){
						return true;
					}
				}
			}
		}
		return false;
	},
	/*向下移动所有列*/
	moveDown:function(){
		if(this.canDown()){
		//遍历第一行的每一列
		for(var col=0;col<this.data[0].length;col++){
		//    调用moveDownInCol(col)
			this.moveDownInCol(col);
		}
		this.randomNum();//生成随机数
		this.updateView();//更新页面
		}
	},
	/*向下移动某一列*/
	moveDownInCol:function(col){
		//遍历col列中的每一行，排除第一行
		//从最后一行开始，向上找
		for(var row=this.data.length-1;row>0;row--){
		//    获得当前位置上方，第一个!=0的数的位置
			var nextRow=this.getNextUp(row,col);
		//    如果上方数的位置==-1，退出循环
			if(nextRow==-1){
				break;
			}else if(this.data[row][col]==0){
				//否则,如果当前数==0
		//              用上方数，替换当前数
			this.data[row][col]=this.data[nextRow][col];
		//              将上方数换为0
				this.data[nextRow][col]=0;
		//              保持当前行下标不变
			    row++;
			}else if(this.data[row][col]==
								this.data[nextRow][col]){
		//    否则，如果当前数==上方数
		//				当前数*=2;
				this.data[row][col]*=2;
				//累加后的单元格数值为累加的分数
				this.score+=this.data[row][col];
		//              将上方数换为0
				this.data[nextRow][col]=0;
			}
		}
	},
	//获得当前位置上方，第一个!=0的数的位置
	getNextUp:function(row,col){
		//从当前行的上一行，向上找
		for(var i=row-1;i>=0;i--){
		//    如果发现!=0的数
			if(this.data[i][col]!=0){
		//        返回行下标
				return i;
			}
		}
		//退出循环，返回-1
		return -1;
	},
	/*检查是否可以下移*/
	canDown:function(){
		//遍历二维数组,排除最后一行
		for(var row=0;row<this.data.length-1;row++){
			for(var col=0;col<this.data[row].length;col++){
		//    获得当前数
				var n=this.data[row][col];
		//    如果当前数!=0
				if(n!=0){
		//        获得下方数值
					var down=this.data[row+1][col];
		//        如果下方数值==0||下方数值==当前数
					if(down==0||down==n){
			            return true;
					}
				}
			}
		}
		//退出循环，
		return false;
	},
	/*判断，并修改游戏状态为GAME_OVER*/
	gameOver:function(){
		//任意数值出现8192，就结束
		if(this.has8192()){
			this.state=this.GAME_OVER;
		}
		//四个方向都不能移动，就结束
		if(!this.canLeft()&&
		   !this.canRight()&&
		   !this.canUp()&&
		   !this.canDown()){
			this.state=this.GAME_OVER;
		}
	},
	/*查找是否包含8192*/
	has8192:function(){
		var str=this.data.toString();
		return str.indexOf("8192")!=-1?true:false;
	}
}
