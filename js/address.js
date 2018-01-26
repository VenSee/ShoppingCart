new Vue({
	el:".container",
	data:{
		addressList:[],
		checked: 0,
		limit:3,
		more:true,
		single:true,	
		heigh:false,
		deFlag:false,
		add:"",//用来保存获取到的item,需要的时候可以用
		addnew:false,
		newAddress:{
			userName:"",
			streetName:"",
			tel:"",
		},
		haha:true
	},
	mounted:function(){
		this.$nextTick(
			function(){
				this.getaddressList()
			}
		)
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limit)
		}
	},
	methods:{
		//获取后台数据
		getaddressList:function(){
			var _this = this ;
			this.$http.get('data/address.json').then(function(res){
				_this.addressList = res.data.result
			})
		},
		//设置默认时需要遍历所有
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId == addressId){
					address.isDefault = true
				}else{
					address.isDefault = false
				}
			})
		},
		//more按钮显示更多的地址
		loadMore:function(more){
			if(this.more == true){
				this.limit = this.addressList.length;
				this.more = false
			}else{
				this.limit = 3;
				this.more =true
			}
			
		},
		//配送方式
		peisong:function(way){
			if(way == this.single){
				this.single = true;
				this.heigh = false
			}else{
				this.heigh = true;
				this.single = false;
			}
		},
		//删除时的确认弹出遮罩
		delConfirm:function(item){
			this.add = item;
			this.deFlag = true
		},
		//删除
		delAddress:function(){
			var _this = this;
			var index = this.addressList.indexOf(this.add);
			_this.addressList.splice(index,1);
			this.deFlag = false;
		},
		//添加新地址触发
		addNew:function(){
			var _this = this;
			this.addnew = true;
			this.haha = true;
			//初始化input的Value为空;
			_this.newAddress.userName = " ";
			_this.newAddress.streetName = " ";
			_this.newAddress.tel= " ";
		},
		//保存
		addNewress:function(){
			var _this = this;
			//添加
			if(this.haha == true){
			this.addnew = false;
			var addres = {}; 
			addres.userName = this.newAddress.userName;
			addres.streetName = this.newAddress.streetName;
			addres.tel = this.newAddress.tel;
			addres.isDefault =false;
			addres.addressId = this.addressList.length - 1; 
			_this.addressList.push(addres);
			this.limit = this.addressList.length;
			this.addressList.splice(this.limit)//更改数组长度时，使用splice来检测新的数组
			}else{
			//编辑
			var indexe = this.addressList.indexOf(this.add);
			var addres = {};
			addres.userName = this.newAddress.userName;
			addres.streetName = this.newAddress.streetName;
			addres.tel = this.newAddress.tel;
			addres.id = this.add.addressId;
			addres.isDefault =false;
			_this.addressList.splice(indexe,1,addres);
			this.addnew = false;
			}
		},
		//编辑按钮
		changeAddress:function(item){
			var _this = this;
			this.add = item;	
			this.addnew = true;
			this.newAddress.userName = item.userName;
			this.newAddress.streetName = item.streetName;
			this.newAddress.tel = item.tel;
			this.haha = false;
		},
		
		
		
		
		
		
		
		
		
		}
})