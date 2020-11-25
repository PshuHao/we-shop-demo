<template>
   <view class="product-item">
     <view class="product-item-left">
       <image :src="product.goods_small_logo || defaultPic" class="product-img" mode=""></image>
     </view>
     <view class="product-item-right">
       <view class="product-name">{{product.goods_name}}</view>
       <view class="product-info-box">
         <!-- 商品价格 -->
         <view class="product-price">￥{{product.goods_price | tofixed}}</view>
       </view>
     </view>
   </view>
</template>

<script>
	export default {
    props: {
      product: {
        type: Object,
        defaul: {},
        }
      },
		data() {
			return {
				 defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
    onLoad() {
      // console.log(product)
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
	}
</script>

<style lang="scss">
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
</style>
