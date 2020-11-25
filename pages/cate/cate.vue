<template>
	<view>
    <i-search :bgcolor="'#d11200'" :radius="20" @click="toSearch" ></i-search>
		<view class="scroll-view-container">
      <!-- 左侧视图区域 -->
      <scroll-view class="left-scrollView" scroll-y="true" :style="{height: winHeight + 'px'} ">
         <block v-for=" (v,i) in cateList" :key="i">
            <view :class=" i === active ? 'left-scrollView-item active' : 'left-scrollView-item' " @click="leftActiveCheck(i)">{{v.cat_name}}</view>
         </block>
      </scroll-view>
      <!-- 右侧视图区域 -->
      <scroll-view class="right-scrollView" scroll-y="true" :style="{height: winHeight + 'px'} " :scroll-top="scrollVal">
        <!-- 二级分类列表 -->
        <view class="cate2" v-for=" (v2,i2) in cateList2 " :key="i2">
          <view class="cate2-title" >/ {{v2.cat_name}} /</view>
          <!-- 三级分类列表 -->
          <view class="cate3">
            <view class="cate3-item" v-for=" (v3,i3) in v2.children " :key="i3" @click="toProductList(v3)">
              <image class="cate3-img" :src="v3.cat_icon" mode=""></image>
              <text>{{v3.cat_name}}</text>
            </view>
          </view>
        </view>

      </scroll-view>
    </view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				winHeight:0,
        cateList:[],
        cateList2:[],
        active:0,
        scrollVal:0
			};
		},
    onLoad(){
      this.winHeight=uni.getSystemInfoSync().windowHeight-50
      this.getCateList()
    },
    methods:{
      // 调用分类数据列表接口
      async getCateList(){
        const {data:res}= await uni.$http.get('/categories')
        if(res.meta.status !== 200) return uni.$showTips()
        this.cateList=res.message
        console.log(res)
        this.cateList2=res.message[0].children
      },
      //点击左侧分类选项触发方法
      leftActiveCheck(i){
         this.active=i
         this.cateList2=this.cateList[i].children
         console.log(this.cateList2)
         
         // 一级分类被点击的时候将二级页面的距顶距离置为0
         this.scrollVal=0        
      },
      toProductList(item){
        uni.navigateTo({
          url:'/subpkg/products_list/products_list?cid=' + item.cat_id
        })
      },
      toSearch(){
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      }
    }
	}
</script>

<style lang="scss">
  .scroll-view-container{
    display: flex;
    .left-scrollView{
      width: 120px;
      .left-scrollView-item{
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;
        &.active{
          position: relative;
          background-color: #FFFFFF;
          &::after{
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            display: block;
            width: 3px;
            height: 30px;
            background-color: orangered;
          }
        }
      }
    }
    .right-scrollView{
      .cate2{
        .cate2-title{
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            padding: 15px 0;
        }
        .cate3{
          display: flex;
          flex-wrap: wrap;
          .cate3-item{
              width: 33.33%;
              margin-bottom: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
            .cate3-img{
              width: 60px;
              height: 60px;
            }
            text{
              font-size: 12px;
            }
          }
        }
      }
    
    }
  }
</style>
