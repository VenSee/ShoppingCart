new Vue({
	el:"#app",
	data:{
		productList:[],
		totalMoney:0,
		checkedAll:false,
		delFlag:false,
		curProduct:"",		
	},
	mounted:function(){
		this.$nextTick(
			function(){
				this.cartView();
			}
		)
	},
	filters:{
		filterMoney:function(value){
			return "￥"+ value.toFixed(2);
		}
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get("data/cartData.json").then(function(res){
				_this.productList = res.data.result.list
			});
		},
		changeMoney:function(item,price){
			if(price<0){
				item.productQuantity--;
				if(item.productQuantity<2){
					item.productQuantity = 1;
				};
			}else{
				item.productQuantity++
			}
		},
		calcTotalMoney:function(){
			var _this = this;
			_this.totalMoney = 0;
			this.productList.forEach(
				function(item,index){
					if(item.checked){
						_this.totalMoney +=item.productQuantity*item.productPrice;
					}
				}
			)
		},
		selectedProduct:function(item){
			if(typeof item.checked == "undefined"){
				item.checked = true;
			}else{
				item.checked = !item.checked;
			};
			this.calcTotalMoney();
		},
		chackAll:function(flag){
			this.checkedAll = flag;
			var _this = this;
			this.productList.forEach(function(item){
				if(typeof item.checked=="undefined"){
					item.checked = flag
				}else{
					item.checked = flag
				}
			});
			this.calcTotalMoney();	
		},
		delConfirm:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		}
	}
})