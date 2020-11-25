<template>
	<view>
    <!-- 搜索模块 -->
    <view class="search-box">
        <i-search @click="toSearch"></i-search>
    </view>
    <!-- 首页轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
     <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/products_detail/products_detail?goods_id=' + item.goods_id" >
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
     </swiper-item>
		</swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
       <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navChecked(item)">
         <image :src="item.image_src" class="nav-img"></image>
       </view>
    </view>

    <!-- 楼层展示 -->
    <view class="floor-list">
      <view class="floor-item"  v-for="(item,i) in floorList" :key="i" >
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        
        <!-- 楼层图片模块 -->
        <view class="floor-imgArea">
          <navigator class="floor-img-left" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx' }" mode="widthFix">
            </image>
          </navigator>
          <view class="floor-img-right" >
            <navigator class="img-right-item" v-for="(v,i) in item.product_list" :key="i" v-if="i!==0" :url="v.url">
              <image :src="v.image_src" mode="widthFix" :style="{width: v.image_width + 'rpx'}" ></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
    

  
	</view>
  

</template>

<script>
	export default {  
		data() {
			return {  
        swiperList:[],
        navList:[],
        floorList:[]
			};
		},
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      //轮播图获取方法
     async getSwiperList(){
        const {data:res}=await uni.$http.get('/home/swiperdata')
        // const { data: res } = await uni.$http.get('/home/swiperdata')
        console.log(res)  
        if(res.meta.status!==200) return uni.$showTips()
        this.swiperList=res.message
        console.log(this.swiperList)
      },
     async getNavList(){
        const{data:res}=await uni.$http.get('/home/catitems')
        if(res.meta.status!==200) return uni.$showTips()
        this.navList=res.message
        console.log(this.navList)
      },
      navChecked(item){
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        const { data:res } = await uni.$http.get('/home/floordata')
        if(res.meta.status!==200) return uni.$showTips()
        console.log(res)
        res.message.forEach(item=>{
          item.product_list.forEach(item=>{
            item.url='/subpkg/products_list/products_list?' +　item.navigator_url.split('?')[1]
          })
        })
        this.floorList=res.message
        console.log(this.floorList)
      },
      toSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
	}
</script>

<style lang="scss">
  .search-box{
    position: sticky;
    top: 0;
    z-index: 888;
  }
  swiper {
   height: 330rpx;
  
   .swiper-item,
   image {
     width: 100%;
     height: 100%;
   }
  }
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  .floor-list{
    .floor-item{
      .floor-title{
        height: 60rpx;
        width: 100%;
        display: flex;
      }
      .floor-imgArea{
        display: flex; 
        padding-left: 15rpx;
        .floor-img-right{
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-around;
          .img-right-item{
            margin-left: 15rpx;
          }
        }
      }
    }

  }

</style>
