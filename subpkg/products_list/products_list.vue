<template>
	<view>
		 <view class="product-list">
       <view v-for="(v,i) in productsList" :key="i" @click="goDetail(v)">
         <my-product :product="v"></my-product>
<!--         <view class="product-item">
           <view class="product-item-left">
             <image :src="v.goods_small_logo || defaultPic" class="product-img" mode=""></image>
           </view>
           <view class="product-item-right">
             <view class="product-name">{{v.goods_name}}</view>
             <view class="product-info-box">
               <view class="product-price">￥{{v.goods_price}}</view>
             </view>
           </view>
         </view> -->
       </view>
     </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        isloading:false,
				productsList:[],
        total:0,
        queryData:{
          query:'',
          cid:0,
          pagenum:1,
          pagesize:10
        },
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
    onLoad(options) {
      console.log(options)
      this.queryData.query=options.query || ''
      this.queryData.cid=options.cid || ''
      console.log(this.queryData)
      this.getProductsList()
    },
    methods:{
      async getProductsList(cb){
        this.isloading=true
        const {data:res} =  await uni.$http.get('/goods/search',this.queryData)
        console.log(res)
        cb && cb()
        if(res.meta.status !== 200) return uni.$showTips()
        this.productsList=[...this.productsList,...res.message.goods]
        this.total=res.message.total
        this.isloading=false
      },
      goDetail(item){
        uni.navigateTo({
          url:'/subpkg/products_detail/products_detail?goods_id=' + item.goods_id
        })
      }
    },
    onReachBottom(){
      // 判断是否是最后一页数据
      if(this.queryData.pagenum * this.queryData.pagesize >= this.total) return uni.$showTips('数据加载完毕！')
      // 节流阀
      if(this.isloading) return
      this.queryData.pagenum+=1
      this.getProductsList()
    },
    onPullDownRefresh(){
      this.queryData.pagenum=1,
      this.total=0,
      this.isloading=false,
      this.productsList=[]
      
      this.getProductsList(()=> uni.stopPullDownRefresh())
    }
	}
</script>

<style lang="scss">
.product-list{
  .product-item{
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #f0f0f0;
    .product-item-left{
        margin-right: 5px;
      .product-img{
            width: 100px;
            height: 100px;
            display: block;
      }
    }
    .product-item-right{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
      .product-name{
             font-size: 13px;
      }
      .product-info-box{
        .product-price{
                font-size: 16px;
                color: #c00000;
        }
      }
    }
  }
}
</style>
