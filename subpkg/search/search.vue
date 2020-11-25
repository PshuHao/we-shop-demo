<template>
	<view>
    <!-- 搜索栏 -->
		<view class="search-box">
      <uni-search-bar  @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议模块 -->
    <view class="suggest-list" v-if="searchResults.length!==0">
      <view class="suggest-item" v-for=" (v,i) in searchResults " :key="v.goods_id" @click="goDetail(v)">
          <view class="product_name">{{v.goods_name}}</view>
          <uni-icons type="arrowright"></uni-icons>
      </view>      
    </view>
    <!-- 搜索历史模块 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click='cleanHistory'></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="v" v-for=" (v,i) in historyRev" :key="i" @click="toProductList(v)"></uni-tag>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 延时器
				delayTime:null,
        keyWord:'',
        searchResults:[],
        historyList:['a','two','c']
			};
		},
    computed:{
      historyRev(){
        return [...this.historyList].reverse()
      }
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('searchHistory') || '[]' )
    },
    methods:{
      input(e){
        // console.log(e.value)
        // 清除延时器
        clearTimeout(this.delayTime)
        // 触发延时器
        this.delayTime=setTimeout(()=>{
          this.keyWord=e.value
          this.getSearchResults()
        },500)
      },
      // 搜索建议请求接口方法
      async getSearchResults(){
        if(this.keyWord.trim()===''){
          return  this.searchResults=[]
        }
        const {data:res} = await uni.$http.get('/goods/qsearch',{query:this.keyWord})
        console.log(res)
        if(res.meta.status !== 200) return uni.$showTips()
        this.searchResults=res.message
        this.saveHistoryData()
      },
      goDetail(item){
        uni.navigateTo({
          url:'/subpkg/products_detail/products_detail?goods_id=' + item.goods_id
        })
      },
      saveHistoryData(){
        // this.historyList.push(this.keyWord)
        const set=new Set(this.historyList)
        set.delete(this.keyWord)
        set.add(this.keyWord)
        this.historyList=Array.from(set)
        // 持久化数据
        uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
      },
      cleanHistory(){
        this.historyList=[]
        uni.setStorageSync('searchHistory','[]')
      },
      toProductList(item){
        uni.navigateTo({
          url:'/subpkg/products_list/products_list?query=' + item
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
  .suggest-list{
    padding: 0 5px;
    .suggest-item{
        font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        justify-content: space-between;
      .product_name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
   }
   .history-box {
     padding: 0 5px;
   
     .history-title {
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 40px;
       font-size: 13px;
       border-bottom: 1px solid #efefef;
     }
   
     .history-list {
       display: flex;
       flex-wrap: wrap;
   
       .uni-tag {
         margin-top: 5px;
         margin-right: 5px;
       }
     }
   }
</style>
