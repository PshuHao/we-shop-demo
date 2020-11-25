<template>
	<view v-if="product_info.goods_name" class="product-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item, i) in product_info.pics" :key="i">
		    <image :src="item.pics_big" @click="preview(i)"></image>
		  </swiper-item>
		</swiper>
    
    <!-- 商品信息区域 -->
    <view class="product-info-box">
      <!-- 价格 -->
      <view class="price">￥{{product_info.goods_price}}</view>
      <view class="product-info-body">
        <!-- 商品名称 -->
        <view class="product-name">{{product_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    
    <!-- 商品详情 -->
    <rich-text :nodes="product_info.goods_introduce"></rich-text>
    
    <!-- 商品导航组件 -->
    <view class="product_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product_info:{},
        // 左侧按钮配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
			};
		},
    onLoad(options) {
      this.getProductDetail(options.goods_id)
    },
    methods:{
      async getProductDetail(goods_id){
        const {data:res} = await uni.$http.get('/goods/detail',{ goods_id })
        console.log(res)
        if(res.meta.status !== 200) return uni.$showTips()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.product_info=res.message
      },
      preview(i){
        uni.previewImage({
          current:i,
          urls:this.product_info.pics.map(x => x.pics_big)
        })
      },
      onClick(e){
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      }
    }
	}
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

// 商品信息区域
.product-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .product-info-body {
    display: flex;
    justify-content: space-between;

    .product-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}

.product-detail-container {
  padding-bottom: 50px;
}

.product_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
